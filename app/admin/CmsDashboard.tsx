"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/default-content";
import type { Product } from "@/lib/products";

type JsonValue = string | number | boolean | JsonValue[] | { [key: string]: JsonValue };
const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));
const labelize = (key: string) => key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").replace(/^./, (c) => c.toUpperCase());
const isImageKey = (key: string) => /image$/i.test(key) || /photo$/i.test(key);

async function uploadImage(file: File) {
  const body = new FormData(); body.append("file", file);
  const response = await fetch("/api/cms/media", { method: "POST", body });
  const result = await response.json() as { url?: string; error?: string };
  if (!response.ok || !result.url) throw new Error(result.error || "Upload failed");
  return result.url;
}

function FieldEditor({ name, value, onChange }: { name: string; value: JsonValue; onChange: (value: JsonValue) => void }) {
  const [uploading, setUploading] = useState(false);
  if (typeof value === "string") {
    const long = value.length > 80 || /description|intro|copy|note|paragraph|message|quote/i.test(name);
    return <label className="cms-field"><span>{labelize(name)}</span>{long ? <textarea value={value} rows={4} onChange={(e) => onChange(e.target.value)} /> : <input value={value} onChange={(e) => onChange(e.target.value)} />}
      {isImageKey(name) && <div className="cms-image-tools">{value && <img src={value} alt="Current" />}<label className="cms-upload">{uploading ? "Uploading…" : "Upload image"}<input type="file" accept="image/*" disabled={uploading} onChange={async (e) => { const file = e.target.files?.[0]; if (!file) return; setUploading(true); try { onChange(await uploadImage(file)); } catch (error) { alert(error instanceof Error ? error.message : "Upload failed"); } finally { setUploading(false); } }} /></label></div>}
    </label>;
  }
  if (typeof value === "number") return <label className="cms-field"><span>{labelize(name)}</span><input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} /></label>;
  if (typeof value === "boolean") return <label className="cms-check"><input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} /> {labelize(name)}</label>;
  if (Array.isArray(value)) return <fieldset className="cms-group"><legend>{labelize(name)}</legend>{value.map((item, index) => <div className="cms-array-item" key={index}><FieldEditor name={`${name} ${index + 1}`} value={item} onChange={(next) => { const copy = clone(value); copy[index] = next; onChange(copy); }} /><button type="button" className="cms-icon-button danger" onClick={() => onChange(value.filter((_, i) => i !== index))}>Remove</button></div>)}<button type="button" className="cms-add" onClick={() => onChange([...value, value.length ? clone(value[value.length - 1]) : "New item"])}>+ Add item</button></fieldset>;
  return <fieldset className="cms-group"><legend>{labelize(name)}</legend><div className="cms-fields">{Object.entries(value).map(([key, child]) => <FieldEditor key={key} name={key} value={child} onChange={(next) => onChange({ ...value, [key]: next })} />)}</div></fieldset>;
}

const blankProduct: Product = { slug: "new-product", name: "New Product", shortName: "New Product", category: "Vegetable Powders", origin: "Indian origin", description: "Add the product description.", accent: "#8a9a72", visualClass: "potato", image: "", formats: ["Powder"], specs: [{ label: "Origin", value: "India" }], packSizes: ["25 kg"], uses: ["Food processing"] };

export function CmsDashboard({ initialContent, initialProducts, userName, signOutPath }: { initialContent: SiteContent; initialProducts: Product[]; userName: string; signOutPath: string }) {
  const [content, setContent] = useState(initialContent);
  const [products, setProducts] = useState(initialProducts);
  const [tab, setTab] = useState<"content" | "products">("content");
  const [section, setSection] = useState(Object.keys(initialContent)[0]);
  const [productIndex, setProductIndex] = useState(0);
  const [status, setStatus] = useState("All changes saved");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true); setStatus("Saving…");
    try {
      const [a, b] = await Promise.all([fetch("/api/cms/content", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(content) }), fetch("/api/cms/products", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(products) })]);
      if (!a.ok || !b.ok) { const issue = !a.ok ? await a.json() : await b.json(); throw new Error((issue as { error?: string }).error || "Save failed"); }
      setStatus("Published to the live site");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Save failed"); }
    finally { setSaving(false); }
  };

  return <main className="cms-app">
    <header className="cms-header"><div><a href="/" className="cms-brand">RKEXPO <span>CONTENT STUDIO</span></a><p>Welcome, {userName}</p></div><div className="cms-header-actions"><a href="/" target="_blank">View website ↗</a><button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save & publish"}</button><a href={signOutPath}>Sign out</a></div></header>
    <div className="cms-tabs"><button className={tab === "content" ? "active" : ""} onClick={() => setTab("content")}>Page content</button><button className={tab === "products" ? "active" : ""} onClick={() => setTab("products")}>Products <span>{products.length}</span></button><p>{status}</p></div>
    {tab === "content" ? <div className="cms-layout"><aside>{Object.keys(content).map((key) => <button key={key} className={section === key ? "active" : ""} onClick={() => setSection(key)}>{labelize(key)}</button>)}</aside><section className="cms-editor"><div className="cms-editor-title"><div><small>PAGE CONTENT</small><h1>{labelize(section)}</h1></div><p>Edit text, labels, lists and images below.</p></div><FieldEditor name={section} value={(content as unknown as Record<string, JsonValue>)[section]} onChange={(next) => { setContent({ ...content, [section]: next } as SiteContent); setStatus("Unsaved changes"); }} /></section></div>
    : <div className="cms-layout"><aside>{products.map((product, index) => <button key={`${product.slug}-${index}`} className={productIndex === index ? "active" : ""} onClick={() => setProductIndex(index)}>{product.shortName || product.name}</button>)}<button className="cms-add-product" onClick={() => { const next = [...products, { ...clone(blankProduct), slug: `new-product-${products.length + 1}` }]; setProducts(next); setProductIndex(next.length - 1); setStatus("Unsaved changes"); }}>+ New product</button></aside><section className="cms-editor">{products[productIndex] && <><div className="cms-editor-title"><div><small>PRODUCT {String(productIndex + 1).padStart(2, "0")}</small><h1>{products[productIndex].name}</h1></div><button className="cms-delete" onClick={() => { if (!confirm("Delete this product?")) return; setProducts(products.filter((_, i) => i !== productIndex)); setProductIndex(Math.max(0, productIndex - 1)); setStatus("Unsaved changes"); }}>Delete product</button></div><FieldEditor name="product" value={products[productIndex] as unknown as JsonValue} onChange={(next) => { const copy = [...products]; copy[productIndex] = next as unknown as Product; setProducts(copy); setStatus("Unsaved changes"); }} /></>}</section></div>}
  </main>;
}
