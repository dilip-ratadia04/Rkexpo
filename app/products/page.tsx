import { getCmsProducts, getSiteContent } from "@/lib/cms";
import { ProductGrid } from "../components/ProductGrid";
import { PageHero, SiteShell } from "../components/SiteShell";
export const dynamic = "force-dynamic";
export default async function ProductsPage() { const [content, products] = await Promise.all([getSiteContent(), getCmsProducts()]); const c = content.productsPage; return <SiteShell><PageHero number={c.heroNumber} kicker={c.heroKicker} title={c.heroTitle} accent={c.heroAccent} intro={c.heroIntro} /><section className="catalog-section page-shell"><ProductGrid products={products} allLabel={c.allFilterLabel} countSuffix={c.productCountSuffix} cardButton={c.cardButton} /></section><section className="catalog-note page-shell"><p>{c.noteKicker}</p><h2>{c.noteTitle}</h2><a className="button button-dark" href="/contact">{c.noteButton} <span>↗</span></a></section></SiteShell>; }
