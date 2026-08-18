"use client";
import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { ProductVisual } from "./ProductVisual";

export function ProductGrid({ products, allLabel, countSuffix, cardButton }: { products: Product[]; allLabel: string; countSuffix: string; cardButton: string }) {
  const categories = [allLabel, ...Array.from(new Set(products.map((p) => p.category)))];
  const [active, setActive] = useState(allLabel);
  const visible = active === allLabel ? products : products.filter((p) => p.category === active);
  return <><div className="catalog-toolbar" aria-label="Filter products by category">{categories.map((category) => <button type="button" className={active === category ? "active" : ""} onClick={() => setActive(category)} key={category}>{category}</button>)}<span>{visible.length.toString().padStart(2, "0")} {countSuffix}</span></div><div className="catalog-grid">{visible.map((product, index) => <article className="catalog-card" key={product.slug}><Link href={`/products/${product.slug}`}><ProductVisual className={product.visualClass} label={product.name} image={product.image} /><div className="catalog-card-topline"><span>{product.category}</span><span>{String(index + 1).padStart(2, "0")}</span></div><h2>{product.shortName}</h2><p>{product.formats.join(" · ")}</p><span className="catalog-link">{cardButton} <b>↗</b></span></Link></article>)}</div></>;
}
