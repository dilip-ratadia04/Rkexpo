import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "Our story" },
  { href: "/quality", label: "Quality" },
  { href: "/contact", label: "Contact" },
];

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="RKExpo home">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span className="brand-type"><strong>RKEXPO</strong><small>DEHYDRATED EXPORTS</small></span>
    </Link>
  );
}

export function Header() {
  return (
    <>
      <div className="trade-strip"><span>Indian origin · Global standards</span><span className="trade-strip-right">Export documentation · FOB / CIF</span></div>
      <header className="site-header">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">{navItems.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav>
        <Link className="button button-small header-cta" href="/contact">Request a quote <span aria-hidden="true">↗</span></Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span /><span /></summary>
          <nav aria-label="Mobile navigation">{navItems.map((item, index) => <Link href={item.href} key={item.href}><span>0{index + 1}</span>{item.label}</Link>)}</nav>
        </details>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-lead page-shell">
        <p className="eyebrow light">Start a conversation</p>
        <h2>Let’s move good ingredients<br />across borders.</h2>
        <Link href="/contact" className="round-arrow" aria-label="Contact RKExpo">↗</Link>
      </div>
      <div className="footer-grid page-shell">
        <div><Brand /><p className="footer-copy">Indian dehydrated ingredients, prepared for modern international food supply chains.</p></div>
        <div><p className="footer-label">Explore</p>{navItems.slice(1).map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div>
        <div><p className="footer-label">Contact</p><a href="mailto:exports@rkexpo.com">exports@rkexpo.com</a><a href="tel:+919876543210">+91 98765 43210</a><span>Rajkot, Gujarat, India</span></div>
        <div><p className="footer-label">Trade desk</p><span>Mon–Sat · 09:00–18:00 IST</span><span>FOB Mundra / Nhava Sheva</span></div>
      </div>
      <div className="footer-bottom page-shell"><span>© 2026 RKExpo</span><span>Demo catalogue · Specifications subject to contract</span></div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return <><Header /><main>{children}</main><Footer /></>;
}

export function PageHero({ kicker, title, intro, number }: { kicker: string; title: ReactNode; intro: string; number: string }) {
  return (
    <section className="page-hero page-shell">
      <div className="page-number">{number}</div>
      <div><p className="eyebrow">{kicker}</p><h1>{title}</h1></div>
      <p className="page-intro">{intro}</p>
    </section>
  );
}

export function ProductVisual({ className, label }: { className: string; label: string }) {
  return (
    <div className={`product-visual ${className}`} role="img" aria-label={`${label} ingredient illustration`}>
      <span className="grain-shadow" />
      {Array.from({ length: 22 }).map((_, index) => <i key={index} />)}
    </div>
  );
}
