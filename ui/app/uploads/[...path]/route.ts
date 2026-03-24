import { NextRequest, NextResponse } from "next/server";

// Extract base URL without /api/v1 suffix
const getBackendBase = () => {
  const backendUrl = process.env.API_BACKEND_URL;
  if (!backendUrl) throw new Error("Missing env variable: API_BACKEND_URL");
  const url = new URL(backendUrl);
  return `${url.protocol}//${url.host}`;
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const suffix = path.join("/");
  const base = getBackendBase();
  const url = `${base}/uploads/${suffix}`;

  const headers = new Headers(req.headers);
  headers.delete("host");

  try {
    const upstream = await fetch(url, {
      method: "GET",
      headers,
    });

    const resHeaders = new Headers(upstream.headers);
    resHeaders.delete("transfer-encoding");

    return new NextResponse(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: resHeaders,
    });
  } catch {
    return NextResponse.json(
      { message: "Backend unreachable" },
      { status: 502 }
    );
  }
}
