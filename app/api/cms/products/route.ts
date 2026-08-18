import { NextResponse } from "next/server";
import { getCmsProducts, saveCmsProducts } from "@/lib/cms";
import { isCmsUser } from "@/lib/cms-auth";
import type { Product } from "@/lib/products";

export const dynamic = "force-dynamic";
export async function GET() { if (!(await isCmsUser())) return NextResponse.json({ error: "Sign in required" }, { status: 401 }); return NextResponse.json(await getCmsProducts()); }
export async function PUT(request: Request) {
  if (!(await isCmsUser())) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  try { const products = await request.json() as Product[]; if (!Array.isArray(products)) throw new Error("Products must be a list."); await saveCmsProducts(products); return NextResponse.json({ ok: true }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not save products" }, { status: 400 }); }
}
