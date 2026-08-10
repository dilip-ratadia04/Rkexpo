import type { Metadata } from "next";
import { products } from "@/lib/products";
import { PageHero, SiteShell } from "../components/SiteShell";
import { QuoteForm } from "../components/QuoteForm";

export const metadata: Metadata = {
  title: "Request an Export Quote | RKExpo",
  description: "Send your product, packing, quantity, and destination requirements to RKExpo's India export desk.",
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
        <aside className="contact-aside">
          <div className="contact-aside-heading">
            <p className="eyebrow light">Direct trade desk</p>
            <h2>Speak with a person,<br /><em>not a ticket.</em></h2>
            <p>Our export team will review your product, packing, and destination details before replying.</p>
          </div>
          <div className="contact-detail-list">
            <div><span>01</span><p className="contact-label">Email</p><a href="mailto:exports@rkexpo.com">exports@rkexpo.com</a></div>
            <div><span>02</span><p className="contact-label">Call / WhatsApp</p><a href="tel:+919876543210">+91 98765 43210</a></div>
            <div><span>03</span><p className="contact-label">Export desk</p><p>Rajkot, Gujarat · India 360001</p></div>
          </div>
          <div className="response-card"><strong>&lt; 1 day</strong><span>Typical response time</span></div>
        </aside>
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
