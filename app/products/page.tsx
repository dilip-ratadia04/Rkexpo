import type { Metadata } from "next";
import { ProductGrid } from "../components/ProductGrid";
import { PageHero, SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Export Grain Catalogue | Saarth Grains",
  description: "Browse export-ready rice, pulses, millets, and cereals sourced from India.",
};

export default function ProductsPage() {
  return (
    <SiteShell>
      <PageHero
        number="02"
        kicker="Product catalogue"
        title={<>Indian staples.<br /><em>Prepared to specification.</em></>}
        intro="Explore our core export range. Grades, crop year, packing, and testing can be aligned to the requirements of your destination market."
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
