import { env } from "cloudflare:workers";
import { defaultSiteContent, type SiteContent } from "@/lib/default-content";
import { products as defaultProducts, type Product } from "@/lib/products";

type CmsEnv = { DB?: D1Database; MEDIA?: R2Bucket };
const runtime = env as unknown as CmsEnv;
let ready: Promise<void> | null = null;

async function ensureSchema() {
  if (!runtime.DB) throw new Error("CMS database is not available.");
  ready ??= runtime.DB.batch([
    runtime.DB.prepare("CREATE TABLE IF NOT EXISTS cms_documents (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL, updated_at INTEGER NOT NULL)"),
    runtime.DB.prepare("CREATE TABLE IF NOT EXISTS cms_products (id TEXT PRIMARY KEY NOT NULL, slug TEXT NOT NULL UNIQUE, value TEXT NOT NULL, sort_order INTEGER NOT NULL, updated_at INTEGER NOT NULL)"),
    runtime.DB.prepare("CREATE TABLE IF NOT EXISTS cms_media (id TEXT PRIMARY KEY NOT NULL, object_key TEXT NOT NULL UNIQUE, filename TEXT NOT NULL, mime_type TEXT NOT NULL, size INTEGER NOT NULL, created_at INTEGER NOT NULL)"),
  ]).then(() => undefined).catch((error) => { ready = null; throw error; });
  return ready;
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    await ensureSchema();
    const row = await runtime.DB!.prepare("SELECT value FROM cms_documents WHERE key = ?").bind("site-content").first<{ value: string }>();
    if (row) return JSON.parse(row.value) as SiteContent;
    await saveSiteContent(defaultSiteContent);
  } catch (error) { console.warn("Using bundled CMS content:", error); }
  return structuredClone(defaultSiteContent);
}

export async function saveSiteContent(content: SiteContent) {
  await ensureSchema();
  await runtime.DB!.prepare("INSERT INTO cms_documents (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at")
    .bind("site-content", JSON.stringify(content), Date.now()).run();
}

export async function getCmsProducts(): Promise<Product[]> {
  try {
    await ensureSchema();
    const result = await runtime.DB!.prepare("SELECT value FROM cms_products ORDER BY sort_order ASC").all<{ value: string }>();
    if (result.results.length) return result.results.map((row) => JSON.parse(row.value) as Product);
    await saveCmsProducts(defaultProducts);
  } catch (error) { console.warn("Using bundled products:", error); }
  return structuredClone(defaultProducts);
}

export async function saveCmsProducts(products: Product[]) {
  await ensureSchema();
  const slugs = products.map((product) => product.slug.trim());
  if (new Set(slugs).size !== slugs.length || slugs.some((slug) => !slug)) throw new Error("Every product needs a unique slug.");
  const statements = [runtime.DB!.prepare("DELETE FROM cms_products")];
  products.forEach((product, index) => statements.push(runtime.DB!.prepare("INSERT INTO cms_products (id, slug, value, sort_order, updated_at) VALUES (?, ?, ?, ?, ?)")
    .bind(product.slug, product.slug, JSON.stringify(product), index, Date.now())));
  await runtime.DB!.batch(statements);
}

export function getMediaBucket() { if (!runtime.MEDIA) throw new Error("CMS media storage is not available."); return runtime.MEDIA; }
export function getCmsDatabase() { if (!runtime.DB) throw new Error("CMS database is not available."); return runtime.DB; }
