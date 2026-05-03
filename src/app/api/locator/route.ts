import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const zipcode = searchParams.get('zipcode');

  if (!zipcode) {
    return NextResponse.json({ error: "Zipcode is required" }, { status: 400 });
  }

  // Simulate database query delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would query a database like PostgreSQL or a third-party API (e.g. Google Civic Information API)
  const results = [
    {
      id: 1,
      name: `Govt. Primary School, Ward ${zipcode}`,
      address: `Main Road, Locality ${zipcode}`,
      distance: "0.8 km away",
      hours: "7:00 AM - 6:00 PM",
      wait: "15 min"
    },
    {
      id: 2,
      name: `Community Hall Booth (${zipcode})`,
      address: `Near Post Office, Locality ${zipcode}`,
      distance: "1.2 km away",
      hours: "7:00 AM - 6:00 PM",
      wait: "5 min"
    }
  ];

  return NextResponse.json({ results });
}
