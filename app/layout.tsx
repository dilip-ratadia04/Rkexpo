import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "rkexpo.example";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;
  return {
    metadataBase: new URL(baseUrl),
    title: "RKExpo | Dehydrated Ingredients from India",
    description: "Indian dehydrated onion, garlic, and selected vegetable powders prepared for international buyers.",
    openGraph: {
      title: "Indian ingredients. Ready for the world.",
      description: "Export-ready dehydrated onion, garlic, and vegetable powders from India.",
      type: "website",
      images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: "RKExpo — Quality from origin to export" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Indian ingredients. Ready for the world.",
      description: "Export-ready dehydrated onion, garlic, and vegetable powders from India.",
      images: [`${baseUrl}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
