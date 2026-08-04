import type { Metadata } from "next";
import { products } from "@/lib/products";
import { PageHero, SiteShell } from "../components/SiteShell";
import { QuoteForm } from "../components/QuoteForm";

export const metadata: Metadata = {
  title: "Request an Export Quote | Saarth Grains",
  description: "Send your product, packing, quantity, and destination requirements to Saarth's India export desk.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const query = await searchParams;
  const initialProduct = products.find((product) => product.slug === query.product)?.name ?? "";
  return (
    <SiteShell>
      <PageHero
        number="05"
        kicker="Export enquiry"
        title={<>Let’s talk product,<br /><em>packing, and port.</em></>}
        intro="Share what you are sourcing. The more detail you provide, the more useful our first response can be."
      />
      <section className="contact-grid page-shell">
        <div className="contact-aside">
          <div><p className="contact-label">Email</p><a href="mailto:exports@saarthgrains.com">exports@saarthgrains.com</a></div>
          <div><p className="contact-label">Call / WhatsApp</p><a href="tel:+919876543210">+91 98765 43210</a></div>
          <div><p className="contact-label">Export desk</p><p>Rajkot, Gujarat<br />India 360001</p></div>
          <div className="response-card"><strong>&lt; 1 day</strong><span>Typical response time</span></div>
        </div>
        <QuoteForm initialProduct={initialProduct} />
      </section>
      <section className="before-enquiry page-shell">
        <p className="eyebrow">Helpful details</p>
        <h2>For a faster quotation, include:</h2>
        <div>{["Product & grade", "Required quantity", "Packing format", "Destination port", "Target timeline", "Inspection needs"].map((item, i) => <span key={item}><b>0{i + 1}</b>{item}</span>)}</div>
      </section>
    </SiteShell>
  );
}
