import Link from "next/link";
import "./Carousel.css";
import {
  FiTruck,
  FiGlobe,
  FiPackage,
  FiShield,
} from "react-icons/fi";

export default function Carousel() {
  return (
    <section className="carousel">
      <video className="carousel-video" autoPlay loop muted playsInline>
  <source src="/images/kings.mp4" type="video/mp4" />
</video>
      <div className="carousel-overlay" />

    <div className="carousel-container">

  <div className="carousel-content">

    {/* Small Heading */}
<p className="small-heading">
  Trusted Truck Repair & Fleet Maintenance Services
</p>

    {/* Big Heading */}
<h1 className="big-heading">
 Reliable<span className="premium-word">Truck Repair</span> <br />
  & Maintenance Solutions
</h1>

    {/* CTA Button */}
<Link href="/request-service" className="cta-btn">
  Schedule Your Service
</Link>

  </div>

  {/* Services Row */}
  {/* Services Row */}
<div className="services-row">

  <div className="service-item">
    <FiTruck className="service-icon" />

    <div>
      <h4>Engine Repair</h4>
      <p>Complete truck engine diagnostics</p>
    </div>
  </div>

  <div className="service-divider"></div>

  <div className="service-item">
    <FiGlobe className="service-icon" />

    <div>
      <h4>24/7 Road Assistance</h4>
      <p>Emergency roadside truck support</p>
    </div>
  </div>

  <div className="service-divider"></div>

  <div className="service-item">
    <FiPackage className="service-icon" />

    <div>
      <h4>Spare Parts</h4>
      <p>Quality truck parts replacement</p>
    </div>
  </div>

  <div className="service-divider"></div>

  <div className="service-item">
    <FiShield className="service-icon" />

    <div>
      <h4>Brake Inspection</h4>
      <p>Safe and secure brake servicing</p>
    </div>
  </div>

</div>

</div>
    </section>
  );
}