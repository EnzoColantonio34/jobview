import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.API_BACKEND_URL as string;
if (!BACKEND_URL) throw new Error("Missing env variable: API_BACKEND_URL");

// Extract base URL without /api/v1 suffix
const getBackendBase = () => {
  const url = new URL(BACKEND_URL);
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
