"use client";

import Image from "next/image";
import Link from "next/link";
import "./AboutSection.css";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {

const yearRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {

    const obj = { value: 1990 };

    gsap.to(obj, {
      value: 2006,

      duration: 4,

      ease: "power2.out",

      scrollTrigger: {
        trigger: ".aboutsec",
        start: "top 75%",
      },

      onUpdate: () => {
        if (yearRef.current) {
        yearRef.current.textContent =
  Math.floor(obj.value).toString();
        }
      },
    });

  }, []);

  return (
    <section className="aboutsec">
      <div className="aboutsec-container">

        {/* Left Images */}
        <div className="aboutsec-left">

          <div className="aboutsec-img1-wrapper">

            <Image
              src="/images/about-image1.jpg"
              alt="About Image"
              width={400}
              height={700}
              className="aboutsec-img1"
            />

            {/* Year Box */}
            <div className="aboutsec-yearbox">
              <h2 ref={yearRef}>2006</h2>
              <p>Started In</p>
            </div>

            {/* Overlay Image */}
            <div className="aboutsec-img2-wrapper">
              <Image
                src="/images/about-image2.jpg"
                alt="Truck"
                width={280}
                height={220}
                className="aboutsec-img2"
              />
            </div>

          </div>

        </div>

        {/* Right Content */}
        <div className="aboutsec-right">

         <p className="aboutsec-smallheading">
    ABOUT KINGS TRUCK REPAIR
  </p>


  <h2 className="aboutsec-heading">
    Trusted Truck Repair & Fleet Maintenance
    Services in California Since 2006
  </h2>

  <p className="aboutsec-para">
    Kings Truck Repair has proudly served drivers,
    fleet owners, and commercial trucking businesses
    across California since 2006. We specialize in
    professional truck repair, diesel engine diagnostics,
    preventive maintenance, brake services, transmission
    repairs, and complete heavy-duty truck servicing
    designed to maximize vehicle performance and safety.
  </p>

  <p className="aboutsec-para">
    With years of hands-on industry expertise, our
    certified technicians are committed to delivering
    reliable workmanship, fast turnaround times, and
    dependable roadside support for all major truck
    brands. At Kings Truck Repair, we focus on keeping
    your commercial vehicles running efficiently,
    reducing downtime, and ensuring your fleet stays
    road-ready throughout every journey across California
    and beyond.
  </p>

    
  <Link href="/about-us" className="aboutsec-btn">
    Discover More
  </Link>


        </div>

      </div>
    </section>
  );
}