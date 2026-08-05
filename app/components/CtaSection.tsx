"use client";

import "./CtaSection.css";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <p className="cta-subtitle">Kings Truck Center</p>

          <h2 className="cta-title">
            Get Your Vehicle Back on the Road Faster
          </h2>

          <Link href="/request-service" className="cta-button">
            Book Service Now
          </Link>
        </div>
      </div>
    </section>
  );
}