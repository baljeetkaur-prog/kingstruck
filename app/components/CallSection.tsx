"use client";

import "./CallSection.css";
import Image from "next/image";
import Link from "next/link";

export default function CallSection() {
  return (
    <section className="call-section">
      <div className="call-overlay"></div>

      <div className="call-container">
        {/* Left Image */}
        <div className="call-image left-image">
          <Image
            src="/images/number_cta1.png"
            alt="Truck"
            width={300}
            height={300}
          />
        </div>

        {/* Center Content */}
        <div className="call-content">
          <h4>Call Us Now</h4>

          <h2>+1 (916)-382-4306</h2>

          <Link href="/contact-us" className="call-btn">
            Contact Us
          </Link>
        </div>

        {/* Right Image */}
        <div className="call-image right-image">
          <Image
            src="/images/numbercta2.png"
            alt="Truck"
            width={300}
            height={300}
          />
        </div>
      </div>
    </section>
  );
}