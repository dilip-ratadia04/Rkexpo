import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { ProductVisual, SiteShell } from "@/app/components/SiteShell";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product
    ? { title: `${product.name} Exporter | RKExpo`, description: product.description }
    : {};
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <SiteShell>
      <section className="product-detail page-shell">
        <div className="product-breadcrumb"><Link href="/products">Catalogue</Link><span>/</span><span>{product.category}</span></div>
        <div className="product-detail-grid">
          <div className="product-detail-visual"><ProductVisual className={product.visualClass} label={product.name} /><span>Indian origin</span></div>
          <div className="product-detail-copy">
            <p className="eyebrow">{product.category} · {product.origin}</p>
            <h1>{product.name}</h1>
            <p className="product-lede">{product.description}</p>
            <div className="spec-grid">
              {product.specs.map((spec) => <div key={spec.label}><span>{spec.label}</span><strong>{spec.value}</strong></div>)}
            </div>
            <div className="product-list-row"><span>Available packing</span><p>{product.packSizes.join(" · ")}</p></div>
            <div className="product-list-row"><span>Best suited for</span><p>{product.uses.join(" · ")}</p></div>
            <div className="detail-actions">
              <Link className="button button-dark" href={`/contact?product=${product.slug}`}>Request this product <span>↗</span></Link>
              <Link className="text-link" href="/quality">View quality process <span>→</span></Link>
            </div>
            <p className="spec-note">Indicative specifications. Final parameters are confirmed against contract and pre-shipment sample.</p>
          </div>
        </div>
      </section>
      <section className="related-products page-shell">
        <div className="section-heading"><div><p className="eyebrow">Continue browsing</p><h2>More from the<br /><em>catalogue.</em></h2></div></div>
        <div className="related-grid">
          {related.map((item) => (
            <Link href={`/products/${item.slug}`} key={item.slug}>
              <ProductVisual className={item.visualClass} label={item.name} />
              <span>{item.category}</span><h3>{item.shortName}</h3><b>↗</b>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
