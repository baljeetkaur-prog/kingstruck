"use client";

import Link from "next/link";
import "./AboutPage.css";
import Image from "next/image";
import { FiTruck, FiTool } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutPage() {
  const sliderRef = useRef(null);

useEffect(() => {

  const slides = gsap.utils.toArray<HTMLElement>(
    ".aboutpg-testimonial-slide"
  );

  gsap.set(slides, {
    opacity: 0,
    y: 40,
    position: "absolute",
  });

  if (slides.length > 0) {

    gsap.set(slides[0], {
      opacity: 1,
      y: 0,
    });

  }

  let current = 0;

  const interval = setInterval(() => {

    const prev = current;

    current = (current + 1) % slides.length;

    gsap.to(slides[prev], {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.fromTo(
      slides[current],
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }
    );

  }, 5000);

  return () => clearInterval(interval);

}, []);
  
  return (
    <>
      {/* BANNER */}
      <section className="aboutpg-banner">

        <div className="aboutpg-banner-overlay"></div>

        <div className="aboutpg-banner-content">

          <h1>About Us</h1>

          <div className="aboutpg-breadcrumb">

            <Link href="/">Home</Link>

            <span>/</span>

            <p>About Us</p>

          </div>

        </div>

      </section>

      {/* ABOUT CONTENT */}
      <section className="aboutpg-main">

        <div className="aboutpg-container">

          {/* LEFT */}
          <div className="aboutpg-left">

            <p className="aboutpg-smallheading">
              ABOUT US
            </p>

            <h2 className="aboutpg-heading">
              Trusted Truck Repair &
              Maintenance Experts
            </h2>

            <p className="aboutpg-para">
              Kings Truck Repair has been delivering dependable
              truck maintenance and repair solutions with a strong
              commitment to quality workmanship, safety, and
              customer satisfaction. Our experienced mechanics
              provide complete servicing for commercial trucks
              with precision and care.
            </p>

            {/* FEATURES */}
            <div className="aboutpg-features">

              <div className="aboutpg-feature">

                <div className="aboutpg-feature-icon">
                  <FiTruck />
                </div>

    <div className="aboutpg-feature-content">

  <h4>
    Heavy-Duty Truck Repair Services
  </h4>

  <p>
    Professional truck diagnostics, repair, and preventive
    maintenance solutions for commercial trucks, diesel
    engines, brakes, suspension systems, and fleet vehicles.
  </p>

</div>

</div>

<div className="aboutpg-feature">

  <div className="aboutpg-feature-icon">
    <FiTool />
  </div>

  <div className="aboutpg-feature-content">

    <h4>
      Certified & Experienced Truck Mechanics
    </h4>

    <p>
      Our skilled truck repair technicians deliver reliable
      workmanship focused on vehicle safety, performance,
      fuel efficiency, and minimizing costly downtime for
      heavy-duty trucks.
    </p>

  </div>

</div>

</div>

<Link
  href="/request-service"
  className="aboutpg-btn"
>
  Request Truck Service
</Link>

          </div>

          {/* RIGHT */}
          <div className="aboutpg-right">

            <Image
              src="/images/about_imgpg.jpg"
              alt="About"
              width={600}
              height={700}
              className="aboutpg-mainimg"
            />
            {/* ROTATING CIRCLE */}
<div className="aboutpg-rotatingbadge">

  <div className="aboutpg-textcircle">
    <svg viewBox="0 0 200 200">

      <defs>
        <path
          id="aboutpg-circlePath"
          d="
            M 100,100
            m -72,0
            a 72,72 0 1,1 144,0
            a 72,72 0 1,1 -144,0
          "
        />
      </defs>

      <text>
        <textPath href="#aboutpg-circlePath">
          • KINGS TRUCK • SINCE 2006 • KINGS TRUCK •
        </textPath>
      </text>

    </svg>
  </div>

  <div className="aboutpg-badgecenter">

    <Image
      src="/images/nav-logo.png"
      alt="Logo"
      width={70}
      height={70}
      className="aboutpg-badgelogo"
    />

  </div>

</div>

          </div>

        </div>

      </section>
            {/* FEATURES BANNER */}
   <section className="aboutpg-featurebanner">

  <div className="aboutpg-featurebanner-overlay"></div>

  <div className="aboutpg-featurebanner-container">

    {/* ITEM 1 */}
    <div className="aboutpg-featureitem">

      <div className="aboutpg-feature-circle">
        <FiTruck />
      </div>

      <h3>
        Professional Truck Repair
      </h3>

      <p>
        Kings Truck Center provides reliable heavy-duty
        truck repair and maintenance services using
        advanced diagnostic equipment and industry-standard
        repair techniques.
      </p>

    </div>

    {/* ITEM 2 */}
    <div className="aboutpg-featureitem">

      <div className="aboutpg-feature-circle">
        <FiTool />
      </div>

      <h3>
        Experienced Diesel Mechanics
      </h3>

      <p>
        Our certified truck mechanics specialize in diesel
        engine repair, brake servicing, suspension work,
        transmission repair, and fleet maintenance solutions.
      </p>

    </div>

    {/* ITEM 3 */}
    <div className="aboutpg-featureitem">

      <div className="aboutpg-feature-circle">
        <FiTruck />
      </div>

      <h3>
        Reliable & Safe Solutions
      </h3>

      <p>
        Every truck repair service is completed with a
        strong focus on safety, reliability, performance,
        and long-term vehicle durability for commercial fleets.
      </p>

    </div>

    {/* ITEM 4 */}
    <div className="aboutpg-featureitem">

      <div className="aboutpg-feature-circle">
        <FiTool />
      </div>

      <h3>
        Fast & Efficient Service
      </h3>

      <p>
        We deliver quick turnaround times and efficient
        truck repair services to reduce downtime and
        keep your trucks operating smoothly on the road.
      </p>

    </div>

  </div>

</section>
      {/* MISSION VISION VALUES */}
<section className="aboutpg-mvv">

  <div className="aboutpg-mvv-container">

    {/* CARD 1 */}
    <div className="aboutpg-mvv-card">

      <p className="aboutpg-mvv-small">
        OUR MISSION
      </p>

      <h3>
        Providing Reliable
        Heavy-Duty Truck Repair
      </h3>

      <p>
        At Kings Truck Center, our mission is to deliver
        dependable truck repair, diesel engine diagnostics,
        preventive maintenance, and commercial vehicle
        servicing solutions that help businesses reduce
        downtime, improve fleet performance, and keep
        trucks operating safely and efficiently on the road.
      </p>

    </div>

    {/* CARD 2 */}
    <div className="aboutpg-mvv-card active">

      <p className="aboutpg-mvv-small">
        OUR VISION
      </p>

      <h3>
        Becoming A Trusted
        Leader In Truck Repair
      </h3>

      <p>
        Our vision is to become a leading name in the
        heavy-duty truck repair industry by providing
        advanced repair solutions, experienced diesel
        mechanics, outstanding customer service, and
        long-term reliability for commercial truck owners
        and fleet operators.
      </p>

    </div>

    {/* CARD 3 */}
    <div className="aboutpg-mvv-card">

      <p className="aboutpg-mvv-small">
        OUR VALUES
      </p>

      <h3>
        Quality, Safety &
        Customer Satisfaction
      </h3>

      <p>
        We are committed to honesty, quality workmanship,
        safety, professionalism, and customer satisfaction.
        Every truck repair and maintenance service we provide
        is focused on delivering reliable results, transparent
        communication, and long-lasting vehicle performance.
      </p>

    </div>

  </div>

</section>
<section className="aboutpg-testimonial">

  <div className="aboutpg-testimonial-container">

    <p className="aboutpg-testimonial-small">
      CLIENT TESTIMONIALS
    </p>

    <div className="aboutpg-testimonial-slider">

      {/* SLIDE 1 */}
      <div className="aboutpg-testimonial-slide">

        <div className="aboutpg-testimonial-quotebg">
          <FaQuoteLeft />
        </div>

        <div className="aboutpg-testimonial-content">

          <p className="aboutpg-testimonial-text">
            Kings Truck Center delivered exceptional
            truck repair services for our commercial fleet.
            Their diesel mechanics quickly diagnosed the
            issue and completed the repairs with excellent
            professionalism and attention to detail.
          </p>

          <div className="aboutpg-testimonial-divider"></div>

          <h4 className="aboutpg-testimonial-name">
            Michael Anderson
          </h4>

        </div>

      </div>

      {/* SLIDE 2 */}
      <div className="aboutpg-testimonial-slide">

        <div className="aboutpg-testimonial-quotebg">
          <FaQuoteLeft />
        </div>

        <div className="aboutpg-testimonial-content">

          <p className="aboutpg-testimonial-text">
            Reliable, honest, and highly experienced.
            Kings Truck Center handled our brake repair
            and truck maintenance efficiently while keeping
            us informed throughout the entire process.
          </p>

          <div className="aboutpg-testimonial-divider"></div>

          <h4 className="aboutpg-testimonial-name">
            David Wilson
          </h4>

        </div>

      </div>

      {/* SLIDE 3 */}
      <div className="aboutpg-testimonial-slide">

        <div className="aboutpg-testimonial-quotebg">
          <FaQuoteLeft />
        </div>

        <div className="aboutpg-testimonial-content">

          <p className="aboutpg-testimonial-text">
            We trust Kings Truck Center for all our
            heavy-duty truck maintenance needs.
            Their technicians are skilled, responsive,
            and consistently provide high-quality
            repair solutions for our fleet vehicles.
          </p>

          <div className="aboutpg-testimonial-divider"></div>

          <h4 className="aboutpg-testimonial-name">
            Robert Miller
          </h4>

        </div>

      </div>

      {/* SLIDE 4 */}
      <div className="aboutpg-testimonial-slide">

        <div className="aboutpg-testimonial-quotebg">
          <FaQuoteLeft />
        </div>

        <div className="aboutpg-testimonial-content">

          <p className="aboutpg-testimonial-text">
            Excellent customer support and fast turnaround
            times. Their truck diagnostics and repair services
            helped us minimize downtime and keep our trucks
            safely operating on the road.
          </p>

          <div className="aboutpg-testimonial-divider"></div>

          <h4 className="aboutpg-testimonial-name">
            James Carter
          </h4>

        </div>

      </div>

    </div>

  </div>

</section>
{/* WHY CHOOSE US */}
<section className="aboutpg-whychoose">

  <div className="aboutpg-whychoose-container">

    {/* TOP HEADER ROW */}
    <div className="aboutpg-whychoose-top">

      <div className="aboutpg-whychoose-headingwrap">

        <p className="aboutpg-whychoose-small">
          WHY CHOOSE KINGS TRUCK CENTER
        </p>

        <h2 className="aboutpg-whychoose-heading">
          Trusted Truck
          Repair & Maintenance Services
        </h2>

      </div>

     <Link
          href="/request-service"
          className="aboutpg-cta-btn"
        >
          Request Service
        </Link>

    </div>

    {/* MAIN GRID */}
    <div className="aboutpg-whychoose-grid">

      {/* LEFT 2x2 GRID */}
      <div className="aboutpg-whychoose-leftgrid">

        {/* BOX 1 - TEXT */}
        <div className="whychoose-box whychoose-textbox">

          <h3>
            Certified Truck Mechanics
          </h3>

          <p>
            Our experienced diesel technicians provide
            accurate diagnostics, reliable truck repairs,
            and long-lasting maintenance solutions for
            commercial and heavy-duty vehicles.
          </p>

        </div>

        {/* BOX 2 - IMAGE */}
        <div className="whychoose-box whychoose-imgbox">
          <Image
            src="/images/aboutimg1.jpg"
            alt="Truck Service"
            width={500}
            height={400}
          />
        </div>

        {/* BOX 3 - IMAGE */}
        <div className="whychoose-box whychoose-imgbox">
          <Image
            src="/images/aboutimg2.jpeg"
            alt="Workshop"
            width={500}
            height={400}
          />
        </div>

        {/* BOX 4 - RED TEXT BOX */}
        <div className="whychoose-box whychoose-redbox">

          <h3>
            Fast & Reliable Truck Repairs
          </h3>

          <p>
            We help reduce downtime with efficient
            repair services, preventive maintenance,
            and quick turnaround times to keep your
            trucks safely operating on the road.
          </p>

        </div>

      </div>

      {/* RIGHT BIG IMAGE */}
      <div className="aboutpg-whychoose-right">

        <Image
          src="/images/aboutimg3.jpg"
          alt="Truck Repair"
          width={800}
          height={900}
          className="whychoose-mainimg"
        />

        {/* OVERLAY CARD */}
        <div className="whychoose-overlaycard">

          <h4>
            Trusted Truck Repair Experts
          </h4>

          <p>
            Kings Truck Center delivers dependable
            heavy-duty truck repair and maintenance
            services focused on safety, quality,
            reliability, and customer satisfaction.
          </p>

        </div>

      </div>

    </div>

  </div>

</section>
{/* CTA SECTION */}
<section className="aboutpg-cta">

  <div className="aboutpg-cta-container">

    <div className="aboutpg-cta-box">

      {/* LEFT IMAGE */}
      <div className="aboutpg-cta-left">
        <Image
          src="/images/about_ctaimg.png"
          alt="CTA Truck"
          width={600}
          height={500}
          className="aboutpg-cta-img"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="aboutpg-cta-right">

        <h2 className="aboutpg-cta-heading">
          Need Professional Heavy-Duty
          Truck Repair Services?
        </h2>

        <p className="aboutpg-cta-para">
          Kings Truck Center provides reliable truck repair,
          diesel engine diagnostics, brake repairs, suspension
          services, transmission maintenance, and preventive
          fleet solutions designed to keep your commercial
          vehicles safe, efficient, and road-ready.
        </p>

        <Link
          href="/request-service"
          className="aboutpg-cta-btn"
        >
          Request Truck Service
        </Link>

      </div>

    </div>

  </div>

</section>
      
    </>
  );
}