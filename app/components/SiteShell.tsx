import Link from "next/link";
import type { ReactNode } from "react";
import { getSiteContent } from "@/lib/cms";
import type { SiteContent } from "@/lib/default-content";

const nav = (s: SiteContent["settings"]) => [
  { href: "/", label: s.navHome }, { href: "/products", label: s.navProducts }, { href: "/about", label: s.navAbout }, { href: "/quality", label: s.navQuality }, { href: "/contact", label: s.navContact },
];

export function Brand({ settings }: { settings: SiteContent["settings"] }) {
  return <Link href="/" className="brand" aria-label={`${settings.brandName} home`}><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span className="brand-type"><strong>{settings.brandName}</strong><small>{settings.brandSubtitle}</small></span></Link>;
}
function Header({ settings }: { settings: SiteContent["settings"] }) {
  const items = nav(settings);
  return <><div className="trade-strip"><span>{settings.tradeStripLeft}</span><span className="trade-strip-right">{settings.tradeStripRight}</span></div><header className="site-header"><Brand settings={settings} /><nav className="desktop-nav" aria-label="Main navigation">{items.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav><Link className="button button-small header-cta" href="/contact">{settings.headerCta} <span>↗</span></Link><details className="mobile-menu"><summary aria-label="Open navigation"><span /><span /></summary><nav>{items.map((item, i) => <Link href={item.href} key={item.href}><span>0{i + 1}</span>{item.label}</Link>)}</nav></details></header></>;
}
function Footer({ settings }: { settings: SiteContent["settings"] }) {
  const items = nav(settings);
  return <footer className="site-footer"><div className="footer-lead page-shell"><p className="eyebrow light">{settings.footerEyebrow}</p><h2>{settings.footerTitle}<br />{settings.footerTitleAccent}</h2><Link href="/contact" className="round-arrow">↗</Link></div><div className="footer-grid page-shell"><div><Brand settings={settings} /><p className="footer-copy">{settings.footerCopy}</p></div><div><p className="footer-label">{settings.footerExploreLabel}</p>{items.slice(1).map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div><div><p className="footer-label">{settings.footerContactLabel}</p><a href={`mailto:${settings.email}`}>{settings.email}</a><a href={`tel:${settings.phoneLink}`}>{settings.phone}</a><span>{settings.address}</span></div><div><p className="footer-label">{settings.footerTradeLabel}</p><span>{settings.hours}</span><span>{settings.ports}</span></div></div><div className="footer-bottom page-shell"><span>{settings.copyright}</span><span>{settings.footerNote}</span></div></footer>;
}
export async function SiteShell({ children }: { children: ReactNode }) { const { settings } = await getSiteContent(); return <><Header settings={settings} /><main>{children}</main><Footer settings={settings} /></>; }
export function PageHero({ kicker, title, accent, intro, number }: { kicker: string; title: string; accent: string; intro: string; number: string }) { return <section className="page-hero page-shell"><div className="page-number">{number}</div><div><p className="eyebrow">{kicker}</p><h1>{title}<br /><em>{accent}</em></h1></div><p className="page-intro">{intro}</p></section>; }
