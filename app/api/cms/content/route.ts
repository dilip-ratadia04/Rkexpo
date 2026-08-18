import { NextResponse } from "next/server";
import { defaultSiteContent, type SiteContent } from "@/lib/default-content";
import { getSiteContent, saveSiteContent } from "@/lib/cms";
import { isCmsUser } from "@/lib/cms-auth";

export const dynamic = "force-dynamic";
export async function GET() { if (!(await isCmsUser())) return NextResponse.json({ error: "Sign in required" }, { status: 401 }); return NextResponse.json(await getSiteContent()); }
export async function PUT(request: Request) {
  if (!(await isCmsUser())) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  try {
    const content = await request.json() as SiteContent;
    if (!content?.settings?.brandName || Object.keys(content).sort().join() !== Object.keys(defaultSiteContent).sort().join()) throw new Error("Invalid content document.");
    await saveSiteContent(content); return NextResponse.json({ ok: true });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not save content" }, { status: 400 }); }
}
