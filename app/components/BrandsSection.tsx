"use client";

import "./BrandsSection.css";
import Image from "next/image";

const brands = [
  "/images/brand1.png",
  "/images/brand2.png",
  "/images/brand3.png",
  "/images/brand4.png",
  "/images/brand5.png",
  "/images/brand6.png",
  "/images/brand7.png", 
  "/images/brand8.png"
];

export default function BrandsSection() {
  return (
    <section className="brands">
      <div className="brands-container">

        {/* Top Content */}
     {/* Top Content */}
<div className="brands-top">

  <div className="brands-top-left">

    <p className="brands-smallheading">
      TRUSTED TRUCK TYRE BRANDS
    </p>

    <h2 className="brands-heading">
      Premium Commercial Truck Tyres
      Trusted By Kings Truck Center
    </h2>

  </div>

  <div className="brands-top-right">

    <p className="brands-para">
      Kings Truck Center works with leading truck tyre brands
      known for superior durability, traction, and long-lasting
      road performance. We provide professional tyre installation,
      maintenance, balancing, and repair services for heavy-duty
      trucks and commercial fleets to ensure maximum safety,
      fuel efficiency, and reliability on every journey.
    </p>

  </div>

</div>

        {/* Logos */}
        <div className="brands-logos">

          {brands.map((brand, index) => (
            <div className="brands-logo-card" key={index}>
              <Image
                src={brand}
                alt={`Brand ${index + 1}`}
                width={180}
                height={90}
                className="brands-logo"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}