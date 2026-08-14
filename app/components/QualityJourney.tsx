"use client";

import { useState } from "react";

export const qualityStages = [
  {
    phase: "Source",
    title: "Farm intake",
    summary: "Fresh onions and other produce are received from approved supply partners and assigned to an identifiable lot.",
    checks: ["Visual condition inspection", "TSS measurement where applicable", "Foreign-material screening"],
    outcome: "Accepted raw-material lot",
  },
  {
    phase: "Prepare",
    title: "Wash & sanitise",
    summary: "Raw material moves through controlled washing and, where specified, an ozone-based sanitation stage.",
    checks: ["Water and sanitation control", "PPM verification", "Post-wash visual check"],
    outcome: "Clean product ready for cutting",
  },
  {
    phase: "Prepare",
    title: "Slice & feed",
    summary: "Prepared produce is cut to the contracted format and transferred evenly onto the processing belt.",
    checks: ["Cut-size verification", "Vernier calliper thickness check", "Belt-feed inspection"],
    outcome: "Consistent product geometry",
  },
  {
    phase: "Dehydrate",
    title: "Primary dehydration",
    summary: "A controlled multi-stage hot-air process removes the majority of moisture while protecting product character.",
    checks: ["Time and temperature log", "Airflow monitoring", "In-process moisture measurement"],
    outcome: "Evenly dehydrated product",
  },
  {
    phase: "Dehydrate",
    title: "Secondary drying",
    summary: "A finishing stage conditions the product toward the agreed final moisture requirement.",
    checks: ["Moisture verification", "Drying uniformity review", "Batch parameter record"],
    outcome: "Stable finished moisture",
  },
  {
    phase: "Stabilise",
    title: "Controlled cooling",
    summary: "Product travels on a food-grade conveyor into a controlled room or cold dryer before further handling.",
    checks: ["Room temperature monitoring", "Relative humidity monitoring", "Protected product transfer"],
    outcome: "Conditioned product for grading",
  },
  {
    phase: "Refine",
    title: "Size separation",
    summary: "Roller separation and aspiration classify slices, flakes, kibbled pieces, and lighter material.",
    checks: ["Requested size-band check", "Aspirator performance review", "Visible impurity inspection"],
    outcome: "Uniform product fraction",
  },
  {
    phase: "Refine",
    title: "Optical sorting",
    summary: "High-definition image sensing identifies roots, off-colour pieces, and other visible defects for removal.",
    checks: ["Sorter calibration", "Foreign-colour check", "Reject-stream review"],
    outcome: "Cleaner visual specification",
  },
  {
    phase: "Verify",
    title: "X-ray & metal detection",
    summary: "Product passes through detection controls designed to identify metallic and other specified dense contaminants.",
    checks: ["Detector challenge verification", "Critical-control-point record", "Corrective-action check"],
    outcome: "Verified control-point release",
  },
  {
    phase: "Verify",
    title: "Manual final sorting",
    summary: "A final human inspection removes remaining visible foreign bodies before the product reaches packing.",
    checks: ["Foreign-body inspection", "Colour and appearance review", "Line-clearance check"],
    outcome: "Packing-ready finished product",
  },
  {
    phase: "Pack",
    title: "Inner packing",
    summary: "Finished product is filled into moisture-resistant, food-grade inner liners selected for the shipment.",
    checks: ["Packing-material inspection", "Net-weight verification", "Seal integrity check"],
    outcome: "Protected primary pack",
  },
  {
    phase: "Pack",
    title: "Export packing",
    summary: "Inner packs are placed in paper sacks or corrugated boxes and marked to the customer’s requirements.",
    checks: ["Outer-pack inspection", "Label and lot-code check", "Final sealing and dispatch review"],
    outcome: "Export-ready consignment",
  },
] as const;

export function QualityJourney() {
  const [active, setActive] = useState(0);
  const stage = qualityStages[active];

  const move = (direction: number) => {
    setActive((current) => (current + direction + qualityStages.length) % qualityStages.length);
  };

  return (
    <section className="journey-section">
      <div className="page-shell">
        <div className="journey-heading">
          <div>
            <p className="eyebrow">Interactive process map</p>
            <h2>Follow one lot from<br /><em>farm to final pack.</em></h2>
          </div>
          <p>Select any stage to see the operating focus, control checks, and expected release point.</p>
        </div>

        <div className="journey-stepper" role="tablist" aria-label="Dehydrated ingredient processing stages">
          {qualityStages.map((item, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls="quality-stage-panel"
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
              key={item.title}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{item.phase}</small>
            </button>
          ))}
        </div>

        <div className="journey-panel" id="quality-stage-panel" role="tabpanel" aria-live="polite">
          <div className="journey-stage-id">
            <span>Stage</span>
            <strong>{String(active + 1).padStart(2, "0")}</strong>
            <small>of {qualityStages.length}</small>
          </div>
          <div className="journey-stage-copy">
            <p>{stage.phase}</p>
            <h3>{stage.title}</h3>
            <p>{stage.summary}</p>
            <div className="journey-outcome"><span>Release point</span><strong>{stage.outcome}</strong></div>
          </div>
          <div className="journey-checks">
            <span>Control checks</span>
            <ul>{stage.checks.map((check, index) => <li key={check}><b>0{index + 1}</b>{check}</li>)}</ul>
          </div>
          <div className="journey-controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous process stage">←</button>
            <span>{active + 1} / {qualityStages.length}</span>
            <button type="button" onClick={() => move(1)} aria-label="Next process stage">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
