"use client";

import "./HunterAlignment.css";
import Image from "next/image";
import Link from "next/link";

export default function HunterAlignment() {
  return (
    <section className="hunter-alignment">
      <div className="hunter-alignment-container">

        <div className="hunter-alignment-content">

          {/* Left Content */}
          <div className="hunter-alignment-left">

            <p className="hunter-alignment-smallheading">
              HUNTER WHEEL ALIGNMENT
            </p>

            <h2 className="hunter-alignment-heading">
              Precision Hunter Alignment For Heavy-Duty Trucks
            </h2>

            <p className="hunter-alignment-para">
              At Kings Truck Center, we use advanced Hunter wheel alignment
              technology to accurately align truck wheels and axles for
              maximum performance. Proper alignment helps reduce tyre wear,
              improve fuel efficiency, enhance steering control, and extend
              the lifespan of critical suspension components. Our experienced
              technicians ensure your truck stays road-ready with precise,
              manufacturer-recommended alignment settings.
            </p>

            <Link
              href="/contact-us"
              className="hunter-alignment-btn"
            >
              Book Alignment Service
            </Link>

          </div>

          {/* Right Image */}
          <div className="hunter-alignment-right">

            <Image
              src="/images/hunter_alignment.webp"
              alt="Hunter Wheel Alignment"
              fill
              className="hunter-alignment-image"
              sizes="(max-width: 900px) 100vw, 50vw"
            />

          </div>

        </div>

      </div>
    </section>
  );
}