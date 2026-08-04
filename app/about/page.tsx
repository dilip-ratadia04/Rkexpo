import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Our Story | Saarth Grains",
  description: "A practical, origin-led Indian grain export partner for international buyers.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        number="03"
        kicker="Our story"
        title={<>Trade should feel<br /><em>closer to the source.</em></>}
        intro="Saarth was shaped around a simple idea: international buyers deserve clearer origin, steadier communication, and fewer hand-offs."
      />
      <section className="about-mosaic page-shell">
        <div className="about-photo about-photo-field" role="img" aria-label="Golden grain field" />
        <div className="about-pullquote"><span>“</span><p>Good export relationships are built on what arrives—not only what was promised.</p></div>
        <div className="about-photo about-photo-grain" role="img" aria-label="Close-up of selected grains" />
      </section>
      <section className="story-copy page-shell">
        <p className="eyebrow">From western India</p>
        <div>
          <h2>A hands-on trade desk for the entire journey.</h2>
          <p>Based in Gujarat, within reach of India’s major agricultural belts and western ports, we coordinate growers, processors, laboratories, packers, and freight partners around one confirmed specification.</p>
          <p>Our role is practical: ask the right questions early, keep product and paperwork aligned, and make every shipment easier to follow from crop region to destination port.</p>
        </div>
      </section>
      <section className="values page-shell">
        {[
          ["01", "Clarity over claims", "We define measurable specifications and confirm them before shipment."],
          ["02", "Origin matters", "We select crop regions for their fit with each product and season."],
          ["03", "Built for repeat trade", "Consistency, communication, and practical problem-solving come first."],
        ].map(([n, title, copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}
      </section>
      <section className="about-cta page-shell"><p>Looking for a dependable India sourcing partner?</p><Link href="/contact" className="button button-dark">Meet the export desk <span>↗</span></Link></section>
    </SiteShell>
  );
}
