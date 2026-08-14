import type { Metadata } from "next";
import { ProductGrid } from "../components/ProductGrid";
import { PageHero, SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Dehydrated Ingredients Catalogue | RKExpo",
  description: "Browse Indian dehydrated onion, garlic, and selected vegetable powders for international supply.",
};

export default function ProductsPage() {
  return (
    <SiteShell>
      <PageHero
        number="02"
        kicker="Product catalogue"
        title={<>Indian ingredients.<br /><em>Prepared to specification.</em></>}
        intro="Explore our dehydrated onion, garlic, and powder range. Format, packing, testing, and documentation can be aligned to your destination market."
      />
      <section className="catalog-section page-shell"><ProductGrid /></section>
      <section className="catalog-note page-shell">
        <p>Need a product not listed?</p>
        <h2>Tell us the grade, quantity, and destination. Our sourcing desk will check availability.</h2>
        <a className="button button-dark" href="/contact">Send a requirement <span>↗</span></a>
      </section>
    </SiteShell>
  );
}
