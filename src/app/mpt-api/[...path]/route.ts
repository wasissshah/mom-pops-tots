import { NextRequest } from "next/server";

// Server-side proxy: the browser calls /mpt-api/..., this route calls the real API
// with the Bearer token (same as Postman). No CORS, and the token never reaches the browser.
const UPSTREAM = process.env.API_URL ?? "https://momspopstots.com/mpt-admin";
const TOKEN = process.env.API_TOKEN ?? "";

type Ctx = { params: Promise<{ path: string[] }> };

async function forward(req: NextRequest, ctx: Ctx, withBody: boolean) {
  const { path } = await ctx.params;
  const url = `${UPSTREAM}/${path.join("/")}${req.nextUrl.search}`;

  const headers: Record<string, string> = { Accept: "application/json", Authorization: `Bearer ${TOKEN}` };
  const contentType = req.headers.get("content-type");
  if (withBody && contentType) headers["Content-Type"] = contentType;

  const res = await fetch(url, {
    method: req.method,
    headers,
    body: withBody ? await req.text() : undefined,
    cache: "no-store",
  });

  // pass the status through as is (201 created, 422 validation errors, ...)
  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": res.headers.get("content-type") ?? "application/json" },
  });
}

export const GET = (req: NextRequest, ctx: Ctx) => forward(req, ctx, false);
export const POST = (req: NextRequest, ctx: Ctx) => forward(req, ctx, true);
