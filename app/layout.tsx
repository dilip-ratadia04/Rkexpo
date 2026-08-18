import type { Metadata } from "next";
import { headers } from "next/headers";
import { getSiteContent } from "@/lib/cms";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const [requestHeaders, content] = await Promise.all([headers(), getSiteContent()]);
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "rkexpo.example";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`; const s = content.settings;
  return { metadataBase: new URL(baseUrl), title: s.seoTitle, description: s.seoDescription, openGraph: { title: s.socialTitle, description: s.socialDescription, type: "website", images: [{ url: `${baseUrl}${s.socialImage}`, width: 1200, height: 630, alt: `${s.brandName} social preview` }] }, twitter: { card: "summary_large_image", title: s.socialTitle, description: s.socialDescription, images: [`${baseUrl}${s.socialImage}`] } };
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
