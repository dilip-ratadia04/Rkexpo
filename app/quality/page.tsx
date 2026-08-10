import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Quality & Export Process | RKExpo",
  description: "See how RKExpo sources, tests, packs, documents, and ships Indian grains.",
};

export default function QualityPage() {
  const steps = [
    ["01", "Specification mapping", "We align product grade, tolerances, packaging, destination rules, and commercial terms before sourcing."],
    ["02", "Origin & lot selection", "Lots are shortlisted by crop region, season, processing capability, and the buyer’s end use."],
    ["03", "Cleaning & grading", "The crop moves through sieving, destoning, magnetic separation, grading, and Sortex where required."],
    ["04", "Testing & sample approval", "Representative samples are checked against agreed physical, chemical, and safety parameters."],
    ["05", "Packing & container care", "Food-grade packs, labels, palletisation, liners, and container checks are coordinated to contract."],
    ["06", "Documents & dispatch", "Commercial, origin, phytosanitary, fumigation, inspection, and shipping documents are compiled as applicable."],
  ];
  return (
    <SiteShell>
      <PageHero
        number="04"
        kicker="Quality assurance"
        title={<>Measured at origin.<br /><em>Verified for arrival.</em></>}
        intro="Quality is managed as a chain of decisions—from selecting the right lot to protecting it inside the container."
      />
      <section className="quality-hero-image" role="img" aria-label="Quality grain selected for export"><div><strong>12+</strong><span>checkpoints across sourcing, processing, packing, and dispatch</span></div></section>
      <section className="quality-process page-shell">
        <div className="quality-title"><p className="eyebrow">The shipment journey</p><h2>A disciplined process,<br /><em>made visible.</em></h2></div>
        <div className="quality-steps">
          {steps.map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
        </div>
      </section>
      <section className="documents-band">
        <div className="page-shell">
          <div><p className="eyebrow light">Document support</p><h2>Paperwork that keeps the cargo moving.</h2></div>
          <div className="document-list">
            {[
              "Certificate of origin", "Phytosanitary certificate", "Fumigation certificate", "Packing list & invoice", "Bill of lading", "Third-party inspection report"
            ].map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
          </div>
        </div>
      </section>
      <section className="quality-close page-shell"><h2>Have a market-specific standard?</h2><p>Share your specification sheet or an approved sample. We’ll map the feasible grade, processing route, and inspection plan.</p><Link href="/contact" className="button button-dark">Discuss your requirement <span>↗</span></Link></section>
    </SiteShell>
  );
}
