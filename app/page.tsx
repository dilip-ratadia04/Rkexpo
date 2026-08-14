import Link from "next/link";
import { products } from "@/lib/products";
import { ProductVisual, SiteShell } from "./components/SiteShell";

export default function Home() {
  return (
    <SiteShell>
      <section className="home-hero">
        <div className="hero-image" role="img" aria-label="Fresh Indian onions and garlic prepared for processing">
          <div className="hero-image-label"><span>21.17° N</span><span>72.83° E</span></div>
        </div>
        <div className="hero-content page-shell">
          <div className="hero-copy">
            <p className="eyebrow light">Dehydrated ingredients from India</p>
            <h1>Rooted in India.<br /><em>Ready for the world.</em></h1>
          </div>
          <div className="hero-aside">
            <p>We supply dehydrated onion, garlic, and selected vegetable powders to food manufacturers and ingredient buyers worldwide.</p>
            <div className="hero-actions">
              <Link className="button button-cream" href="/products">Explore products <span aria-hidden="true">↗</span></Link>
              <Link className="text-link light" href="/about">Discover our story <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
        <div className="hero-index">01</div>
      </section>

      <section className="trust-line page-shell" aria-label="Export capabilities">
        <p>From selected produce to export-ready ingredients</p>
        <div><span>Origin-led sourcing</span><span>Controlled dehydration</span><span>Flexible formats</span><span>Global shipping</span></div>
      </section>

      <section className="featured page-shell">
        <div className="section-heading">
          <div><p className="eyebrow">Our selection</p><h2>Ingredients with a clear<br /><em>point of origin.</em></h2></div>
          <div className="section-heading-note"><span>08 export-ready products</span><Link className="text-link" href="/products">View full catalogue <span>→</span></Link></div>
        </div>
        <div className="featured-grid">
          {products.slice(0, 3).map((product, index) => (
            <article className="featured-card" key={product.slug}>
              <Link href={`/products/${product.slug}`}>
                <ProductVisual className={product.visualClass} label={product.name} />
                <div className="featured-meta"><span>0{index + 1}</span><span>{product.category}</span></div>
                <h3>{product.shortName}</h3><p>{product.description}</p>
                <span className="text-link">Explore product <b>↗</b></span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="origin-story">
        <div className="origin-photo" role="img" aria-label="Indian onion harvest ready for processing" />
        <div className="origin-copy">
          <p className="eyebrow light">Why RKExpo</p><h2>Closer to origin.<br /><em>Stronger at destination.</em></h2>
          <p>We coordinate produce sourcing, dehydration, grading, packing, testing, and export documentation through one accountable trade desk.</p>
          <div className="stat-row"><div><strong>03</strong><span>Product families</span></div><div><strong>08</strong><span>Catalogue products</span></div><div><strong>20/40</strong><span>Ft container options</span></div></div>
          <Link className="button button-outline-light" href="/quality">See our process <span>↗</span></Link>
        </div>
      </section>

      <section className="process page-shell">
        <div className="section-heading"><div><p className="eyebrow">How we work</p><h2>One chain.<br /><em>Every detail covered.</em></h2></div><p className="process-intro">Clear milestones from your required ingredient format to final shipping documents.</p></div>
        <div className="process-grid">
          {[["01", "Source", "Produce-region selection and supplier verification."], ["02", "Dehydrate", "Controlled processing to the required ingredient form."], ["03", "Grade", "Cut-size grading, testing, and export packing."], ["04", "Ship", "Documentation and freight coordination to port."]].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="trade-banner">
        <div className="trade-photo" role="img" aria-label="Container port prepared for international shipping" />
        <div className="trade-card">
          <p className="eyebrow light">Trade-ready support</p><h2>Built for the practical side of global buying.</h2>
          <ul><li><span>01</span>Pre-shipment samples</li><li><span>02</span>Third-party inspection support</li><li><span>03</span>Phytosanitary &amp; origin documents</li><li><span>04</span>Private-label packaging</li></ul>
          <Link className="text-link light" href="/contact">Talk to the export desk <span>→</span></Link>
        </div>
      </section>
    </SiteShell>
  );
}
