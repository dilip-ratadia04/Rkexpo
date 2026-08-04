"use client";

import { FormEvent, useState } from "react";
import { products } from "@/lib/products";

export function QuoteForm({ initialProduct = "" }: { initialProduct?: string }) {
  const [prepared, setPrepared] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Export enquiry — ${String(form.get("product"))}`);
    const body = encodeURIComponent(
      `Name: ${form.get("name")}\nCompany: ${form.get("company")}\nCountry: ${form.get("country")}\nProduct: ${form.get("product")}\nQuantity: ${form.get("quantity")}\n\nMessage:\n${form.get("message")}`,
    );
    setPrepared(true);
    window.location.href = `mailto:exports@saarthgrains.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Your name *</span>
          <input name="name" required placeholder="Full name" />
        </label>
        <label>
          <span>Company *</span>
          <input name="company" required placeholder="Company name" />
        </label>
        <label>
          <span>Country / market *</span>
          <input name="country" required placeholder="e.g. UAE" />
        </label>
        <label>
          <span>Product *</span>
          <select name="product" required defaultValue={initialProduct}>
            <option value="" disabled>Select a product</option>
            {products.map((product) => <option key={product.slug}>{product.name}</option>)}
            <option>Mixed container</option>
          </select>
        </label>
        <label>
          <span>Estimated quantity</span>
          <input name="quantity" placeholder="e.g. 1 × 20 ft container" />
        </label>
        <label>
          <span>Preferred incoterm</span>
          <select name="incoterm" defaultValue="FOB">
            <option>FOB</option>
            <option>CIF</option>
            <option>CNF</option>
            <option>Not sure yet</option>
          </select>
        </label>
      </div>
      <label className="message-field">
        <span>Tell us what you need</span>
        <textarea name="message" rows={5} placeholder="Grade, packaging, destination port, timelines…" />
      </label>
      <div className="form-action">
        <button className="button button-dark" type="submit">Prepare email enquiry <span aria-hidden="true">↗</span></button>
        <p>{prepared ? "Your enquiry is ready in your email app." : "We usually reply within one business day."}</p>
      </div>
    </form>
  );
}
