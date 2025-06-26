// app/api/exoplanets/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hostname = searchParams.get("hostname");
  if (!hostname) {
    return NextResponse.json({ error: "Missing hostname" }, { status: 400 });
  }

  const query = `SELECT pl_name,hostname,ra,dec,pl_orbper,pl_rade,pl_bmasse,disc_facility
    FROM pscomppars WHERE hostname='${hostname}'`;
  const url = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync
    ?query=${encodeURIComponent(query)}&format=json`;

  const res = await fetch(url);
  if (!res.ok) {
    return NextResponse.json({ error: "NASA API error" }, { status: 502 });
  }
  const data = await res.json();
  return NextResponse.json(data);
}
