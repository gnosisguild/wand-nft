import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { geo, nextUrl: url } = req;

  // if geo is not available default to Berlin coords
  const lat = geo?.latitude || "52.5422";
  const long = geo?.longitude || "13.3495";

  url.searchParams.set("lat", lat);
  url.searchParams.set("long", long);
  return NextResponse.rewrite(url);
}
