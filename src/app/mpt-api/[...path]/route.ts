import { NextRequest } from "next/server";

// Server-side proxy: the browser calls /mpt-api/..., this route calls the real API
// with the Bearer token (same as Postman). No CORS, and the token never reaches the browser.
const UPSTREAM = process.env.API_URL ?? "https://momspopstots.com/mpt-admin";
const TOKEN = process.env.API_TOKEN ?? "";

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
    const { path } = await ctx.params;
    const url = `${UPSTREAM}/${path.join("/")}${req.nextUrl.search}`;

    const res = await fetch(url, {
        headers: { Accept: "application/json", Authorization: `Bearer ${TOKEN}` },
        cache: "no-store",
    });

    return new Response(await res.text(), {
        status: res.status,
        headers: { "Content-Type": res.headers.get("content-type") ?? "application/json" },
    });
}