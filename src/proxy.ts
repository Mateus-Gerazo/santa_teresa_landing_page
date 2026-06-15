import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Intercepta rotas que começam com /admin
  if (path.startsWith('/admin')) {
    // Exceção: A rota de login deve estar sempre acessível
    if (path === '/admin/login') {
      return NextResponse.next();
    }

    // Regra: Se não tiver o cookie admin_token, redireciona para o login
    const token = request.cookies.get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// Opcional: configurar o matcher para executar o proxy apenas nessas rotas
export const config = {
  matcher: ['/admin/:path*'],
};
