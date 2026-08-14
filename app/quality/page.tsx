import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SiteShell } from "../components/SiteShell";
import { QualityJourney } from "../components/QualityJourney";

export const metadata: Metadata = {
  title: "Quality, Processing & Compliance | RKExpo",
  description: "Explore RKExpo's interactive 12-stage process for sourcing, dehydrating, sorting, checking, and packing Indian food ingredients.",
};

const certifications = [
  { name: "FSSAI", type: "Food business registration", image: "/certifications/fssai.jpg" },
  { name: "APEDA", type: "Exporter registration", image: "/certifications/apeda.png" },
  { name: "HACCP", type: "Food safety system", image: "/certifications/haccp.png" },
  { name: "Spices Board India", type: "Exporter registration", image: "/certifications/spices-board.png" },
  { name: "Halal India", type: "Product certification", image: "/certifications/halal-india.png" },
  { name: "ISO 9001:2015", type: "Quality management", image: "/certifications/iso-9001.png" },
  { name: "Kosher", type: "Product certification", image: "/certifications/kosher.png" },
];

export default function QualityPage() {
  return (
    <SiteShell>
      <PageHero
        number="04"
        kicker="Quality assurance"
        title={<>Measured at origin.<br /><em>Verified at every gate.</em></>}
        intro="A visible control path connects raw-material intake, controlled dehydration, precision sorting, contaminant detection, and export packing."
      />

      <section className="quality-hero-image" role="img" aria-label="Onion and garlic selected for dehydration">
        <div><strong>12</strong><span>defined stages from farm intake to the finished export pack</span></div>
      </section>

      <section className="quality-principles page-shell">
        <div className="quality-principles-heading">
          <p className="eyebrow">Quality architecture</p>
          <h2>Three layers of control.<br /><em>One accountable lot.</em></h2>
        </div>
        <div className="quality-principle-grid">
          <article><span>01</span><h3>Process control</h3><p>Time, temperature, moisture, sanitation, and cut size are checked at the stages where they matter.</p></article>
          <article><span>02</span><h3>Product verification</h3><p>Optical sorting, detector challenges, and manual inspection create successive quality gates.</p></article>
          <article><span>03</span><h3>Lot evidence</h3><p>Batch identity, inspection records, packing checks, and shipment documents stay connected to the order.</p></article>
        </div>
      </section>

      <QualityJourney />

      <section className="documents-band">
        <div className="page-shell">
          <div><p className="eyebrow light">Document support</p><h2>Paperwork that keeps the cargo moving.</h2></div>
          <div className="document-list">
            {["Certificate of origin", "Phytosanitary certificate", "Fumigation certificate", "Packing list & invoice", "Bill of lading", "Third-party inspection report"].map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="certification-section" aria-labelledby="certification-title">
        <div className="certification-heading page-shell">
          <div><p className="eyebrow">Certification &amp; registration</p><h2 id="certification-title">Recognised frameworks.<br /><em>Buyer-ready evidence.</em></h2></div>
          <p>Registration and certification documents can be shared against the applicable product, facility, and shipment scope.</p>
        </div>
        <div className="certification-marquee" role="region" aria-label="Certification and registration logos" tabIndex={0}>
          <div className="certification-track">
            {[...certifications, ...certifications].map((item, index) => (
              <article className="certification-card" aria-hidden={index >= certifications.length} key={`${item.name}-${index}`}>
                <div><img src={item.image} alt={index < certifications.length ? `${item.name} logo` : ""} /></div>
                <span>{item.name}</span><small>{item.type}</small>
              </article>
            ))}
          </div>
        </div>
        <p className="certification-note page-shell">Demo compliance display: verify the certificate holder, product scope, registration number, and current validity before production publication.</p>
      </section>

      <section className="quality-close page-shell">
        <h2>Have a market-specific standard?</h2>
        <p>Share your specification sheet or approved sample. We’ll map the feasible product format, process controls, testing route, and inspection plan.</p>
        <Link href="/contact" className="button button-dark">Discuss your requirement <span>↗</span></Link>
      </section>
    </SiteShell>
  );
}
