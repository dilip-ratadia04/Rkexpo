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
      `Name: ${form.get("name")}\nCompany: ${form.get("company")}\nCountry: ${form.get("country")}\nProduct: ${form.get("product")}\nQuantity: ${form.get("quantity")}\nDestination port: ${form.get("destination")}\nIncoterm: ${form.get("incoterm")}\n\nMessage:\n${form.get("message")}`,
    );
    setPrepared(true);
    window.location.href = `mailto:exports@rkexpo.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div><span>01</span><div><p>Buyer details</p><h2>Tell us who you are.</h2></div></div>
        <small>* Required fields</small>
      </div>
      <div className="form-grid buyer-grid">
        <label>
          <span>Your name *</span>
          <input name="name" required placeholder="Full name" />
        </label>
        <label>
          <span>Company *</span>
          <input name="company" required placeholder="Company name" />
        </label>
        <label className="field-wide">
          <span>Country / market *</span>
          <input name="country" required placeholder="e.g. UAE" />
        </label>
      </div>
      <div className="form-heading form-heading-secondary">
        <div><span>02</span><div><p>Shipment requirement</p><h2>What should we quote?</h2></div></div>
      </div>
      <div className="form-grid shipment-grid">
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
          <span>Destination port</span>
          <input name="destination" placeholder="e.g. Jebel Ali, Dubai" />
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
      <label className="message-field field-wide">
        <span>Tell us what you need</span>
        <textarea name="message" rows={5} placeholder="Grade, packaging, destination port, timelines…" />
      </label>
      <div className="form-action">
        <div><span className="form-status-dot" /><p>{prepared ? "Your enquiry is ready in your email app." : "Your details stay private and are only used for this quotation."}</p></div>
        <button className="button button-dark" type="submit">Prepare email enquiry <span aria-hidden="true">↗</span></button>
      </div>
    </form>
  );
}
