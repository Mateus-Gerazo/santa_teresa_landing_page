"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getReservations, updateReservationStatus } from "@/actions/admin-reservation";
import { ReservationStatus } from "@prisma/client";
import { format } from "date-fns";
import { CheckCircle, XCircle, Clock, CheckCircle2, Search, Calendar as CalendarIcon, Filter } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type Reservation = {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string | null;
  status: ReservationStatus;
  createdAt: Date;
};

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservaSelecionada, setReservaSelecionada] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // Filters
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await getReservations({
        status: statusFilter,
        date: dateFilter,
        search: searchFilter
      });
      
      if (!res.success && res.error === "Unauthorized") {
        router.push("/admin/login");
        return;
      }
      
      const data = res.data || [];
      // Sort by date and time in JS as a fallback or if not fully sorted by DB
      const sorted = data.sort((a: any, b: any) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA.getTime() - dateB.getTime();
      });
      setReservations(sorted as any);
    } catch (error) {
      console.error("Failed to fetch reservations", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [statusFilter, dateFilter, searchFilter]);

  // Realtime subscription for new reservations
  useEffect(() => {
    // A simple, discrete "pop" sound for notification
    const notificationSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
    
    const channel = supabase
      .channel('reservations-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'Reservation' },
        (payload) => {
          const newReservation = payload.new as Reservation;
          
          // Update the state with the new reservation
          setReservations((prev) => {
            // Avoid adding duplicates just in case
            if (prev.some(r => r.id === newReservation.id)) return prev;
            
            const newReservations = [...prev, newReservation];
            return newReservations.sort((a, b) => {
              const dateA = new Date(`${a.date}T${a.time}`);
              const dateB = new Date(`${b.date}T${b.time}`);
              return dateA.getTime() - dateB.getTime();
            });
          });

          // Show visual notification
          toast.success(`Nova reserva de ${newReservation.name}`, {
            description: `Para dia ${format(new Date(`${newReservation.date}T00:00:00`), 'dd/MM/yyyy')} às ${newReservation.time}`,
            duration: 6000,
          });

          // Play sound (may be blocked by browser if user hasn't interacted with page yet)
          notificationSound.play().catch(e => console.log('Audio autoplay prevented by browser', e));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleStatusChange = async (id: string, status: ReservationStatus) => {
    const res = await updateReservationStatus(id, status);
    if (res.success) {
      setReservations(reservations.map(r => r.id === id ? { ...r, status } : r));
    } else {
      if (res.error === "Unauthorized") {
        router.push("/admin/login");
      } else {
        alert(res.error);
      }
    }
  };

  const today = format(new Date(), "yyyy-MM-dd");
  
  const stats = {
    pending: reservations.filter(r => r.status === "PENDING").length,
    confirmed: reservations.filter(r => r.status === "CONFIRMED").length,
    today: reservations.filter(r => r.date === today && r.status !== "CANCELLED").length,
    total: reservations.length
  };

  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
    COMPLETED: "bg-green-100 text-green-800 border-green-200",
    CANCELLED: "bg-red-100 text-red-800 border-red-200",
  };

  const statusLabels = {
    PENDING: "Pendente",
    CONFIRMED: "Confirmada",
    COMPLETED: "Concluída",
    CANCELLED: "Cancelada",
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif font-bold text-white">Reservas</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-neutral-900 p-6 rounded-xl shadow-sm border border-neutral-800 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-400 mb-1">Pendentes</p>
            <p className="text-3xl font-bold text-white">{stats.pending}</p>
          </div>
          <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500">
            <Clock size={24} />
          </div>
        </div>
        <div className="bg-neutral-900 p-6 rounded-xl shadow-sm border border-neutral-800 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-400 mb-1">Confirmadas</p>
            <p className="text-3xl font-bold text-white">{stats.confirmed}</p>
          </div>
          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
            <CheckCircle size={24} />
          </div>
        </div>
        <div className="bg-neutral-900 p-6 rounded-xl shadow-sm border border-neutral-800 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-400 mb-1">Hoje</p>
            <p className="text-3xl font-bold text-white">{stats.today}</p>
          </div>
          <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
            <CalendarIcon size={24} />
          </div>
        </div>
        <div className="bg-neutral-900 p-6 rounded-xl shadow-sm border border-neutral-800 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-400 mb-1">Total</p>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-400">
            <Filter size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-neutral-900 p-4 rounded-xl shadow-sm border border-neutral-800 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou telefone..." 
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="date" 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 [color-scheme:dark]"
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="ALL">Todos os Status</option>
            <option value="PENDING">Pendentes</option>
            <option value="CONFIRMED">Confirmadas</option>
            <option value="COMPLETED">Concluídas</option>
            <option value="CANCELLED">Canceladas</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-neutral-900 rounded-xl shadow-sm border border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-800/50 border-b border-neutral-800 text-neutral-400 text-sm">
                <th className="px-6 py-4 font-medium">Data/Hora</th>
                <th className="px-6 py-4 font-medium">Cliente</th>
                <th className="px-6 py-4 font-medium">Pessoas</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-400">
                    <div className="w-8 h-8 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
                    Carregando reservas...
                  </td>
                </tr>
              ) : reservations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-400">
                    Nenhuma reserva encontrada para os filtros selecionados.
                  </td>
                </tr>
              ) : (
                reservations.map((reservation) => (
                  <tr 
                    key={reservation.id} 
                    className="hover:bg-neutral-800 cursor-pointer transition-colors"
                    onClick={() => setReservaSelecionada(reservation)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">
                        {format(new Date(`${reservation.date}T00:00:00`), 'dd/MM/yyyy')}
                      </div>
                      <div className="text-sm text-neutral-400 flex items-center gap-1 mt-0.5">
                        <Clock size={12} />
                        {reservation.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{reservation.name}</div>
                      <div className="text-sm text-neutral-400">{reservation.phone}</div>
                      {reservation.notes && (
                        <div className="text-xs text-neutral-500 mt-1 max-w-xs truncate" title={reservation.notes}>
                          Obs: {reservation.notes}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center justify-center bg-neutral-800 text-neutral-300 w-8 h-8 rounded-full font-semibold text-sm">
                        {reservation.guests}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[reservation.status]}`}>
                        {statusLabels[reservation.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {reservation.status === 'PENDING' && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleStatusChange(reservation.id, 'CONFIRMED'); }}
                            className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                            title="Confirmar"
                          >
                            <CheckCircle size={20} />
                          </button>
                        )}
                        {['PENDING', 'CONFIRMED'].includes(reservation.status) && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleStatusChange(reservation.id, 'COMPLETED'); }}
                            className="p-1.5 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                            title="Marcar como Concluída"
                          >
                            <CheckCircle2 size={20} />
                          </button>
                        )}
                        {['PENDING', 'CONFIRMED'].includes(reservation.status) && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleStatusChange(reservation.id, 'CANCELLED'); }}
                            className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Cancelar"
                          >
                            <XCircle size={20} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalhes da Reserva */}
      {reservaSelecionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{reservaSelecionada.name}</h2>
                  <p className="text-amber-500 font-medium">{reservaSelecionada.guests} {reservaSelecionada.guests === 1 ? 'Pessoa' : 'Pessoas'}</p>
                </div>
                <button 
                  onClick={() => setReservaSelecionada(null)}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <XCircle size={24} />
                </button>
              </div>
              
              <div className="space-y-3 mb-6 text-sm text-neutral-300">
                <div className="flex items-center gap-2">
                  <CalendarIcon size={16} className="text-neutral-500" />
                  <span>{format(new Date(`${reservaSelecionada.date}T00:00:00`), 'dd/MM/yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-neutral-500" />
                  <span>{reservaSelecionada.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500 font-medium">Telefone:</span>
                  <span>{reservaSelecionada.phone}</span>
                </div>
              </div>

              <div className="mb-2">
                <p className="text-sm font-medium text-neutral-400 mb-2">Observações:</p>
                {reservaSelecionada.notes ? (
                  <div className="bg-neutral-800/50 p-4 rounded-lg max-h-40 overflow-y-auto whitespace-pre-wrap text-sm text-neutral-300">
                    {reservaSelecionada.notes}
                  </div>
                ) : (
                  <div className="text-sm text-neutral-500 italic">Nenhuma observação.</div>
                )}
              </div>
            </div>
            
            <div className="p-4 border-t border-neutral-800 bg-neutral-900/50">
              <a 
                href={`https://wa.me/55${reservaSelecionada.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition-colors"
              >
                Chamar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
