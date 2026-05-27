import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.PLACE_ID_SANTA_TERESA;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: 'Missing Google Places API credentials in environment variables.' },
      { status: 500 }
    );
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,current_opening_hours&language=pt-BR&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      return NextResponse.json(
        { error: data.error_message || 'Failed to fetch from Google Places API.' },
        { status: 500 }
      );
    }

    const isOpen = data.result?.current_opening_hours?.open_now ?? false;
    const reviews = data.result?.reviews || [];

    return NextResponse.json({ isOpen, reviews });
  } catch (error) {
    console.error('Error fetching Google Places:', error);
    return NextResponse.json(
      { error: 'Internal server error while fetching Places API.' },
      { status: 500 }
    );
  }
}
