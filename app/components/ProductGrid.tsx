"use client";

import { useState } from "react";
import Link from "next/link";
import { categories, products } from "@/lib/products";
import { ProductVisual } from "./SiteShell";

export function ProductGrid() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const visible = active === "All" ? products : products.filter((product) => product.category === active);

  return (
    <>
      <div className="catalog-toolbar" aria-label="Filter products by category">
        {categories.map((category) => (
          <button
            type="button"
            className={active === category ? "active" : ""}
            aria-pressed={active === category}
            onClick={() => setActive(category)}
            key={category}
          >
            {category}
          </button>
        ))}
        <span>{visible.length.toString().padStart(2, "0")} products</span>
      </div>
      <div className="catalog-grid">
        {visible.map((product, index) => (
          <article className="catalog-card" key={product.slug}>
            <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
              <ProductVisual className={product.visualClass} label={product.name} />
              <div className="catalog-card-topline">
                <span>{product.category}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h2>{product.shortName}</h2>
              <p>{product.origin}</p>
              <span className="catalog-link">View specifications <b aria-hidden="true">↗</b></span>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
