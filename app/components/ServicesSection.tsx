"use client";

import "./ServicesSection.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

import { FiTool, FiTruck, FiDroplet, FiArrowRight, FiSettings, FiDisc, FiCpu, FiRefreshCw, FiFilter, FiTarget, FiCrosshair } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const services = [
    {
    icon: FiTarget,
    title: "Wheel Alignment",
    desc: "Professional truck wheel alignment services designed to improve steering control, reduce tire wear, enhance fuel efficiency, and ensure a smoother, safer driving experience.",
    img: "/images/wheel_alignment.jpeg",
  },
  {
    icon: FiCrosshair,
    title: "Hunter Alignment",
    desc: "State-of-the-art Hunter Alignment services using advanced computerized laser technology to improve steering accuracy, extend tire life, enhance fuel efficiency, and ensure optimal performance.",
    img: "/images/hunter-alignment-service.png",
  },
 {
  icon: FiFilter,
  title: "DPF Cleaning",
  desc: "Professional DPF cleaning services designed to remove soot buildup, improve fuel efficiency, reduce emissions, and restore optimal diesel engine performance.",
  img: "/images/serviceeight.jpeg",
},
  {
    icon: FiDroplet,
    title: "Oil Change",
    desc: "Professional truck oil change services using premium lubricants and filters to improve engine performance, reduce wear, and extend the lifespan of heavy-duty vehicles.",
    img: "/images/serviceone.jpeg",
  },
  {
    icon: FiTruck,
    title: "New & Used Tires",
    desc: "Reliable new and used truck tires for commercial and heavy-duty vehicles, providing excellent traction, durability, road safety, and long-lasting performance.",
    img: "/images/servicetwo.jpeg",
  },
  {
    icon: FiSettings,
    title: "Suspension",
    desc: "Complete truck suspension repair and maintenance solutions designed to improve vehicle stability, ride comfort, load handling, and overall driving safety.",
    img: "/images/service3.jpg",
  },
  {
    icon: FiDisc,
    title: "Brakes",
    desc: "Comprehensive brake inspection and repair services including brake pads, rotors, and hydraulic systems to ensure safe and dependable stopping power.",
    img: "/images/servicefour.jpg",
  },
  {
    icon: FiCpu,
    title: "Computer Diagnostic",
    desc: "Advanced truck computer diagnostics to quickly identify engine faults, electrical problems, sensor failures, and performance issues for accurate repairs.",
    img: "/images/servicefive.webp",
  },
  {
    icon: FiTool,
    title: "Engine Repair",
    desc: "Expert diesel engine repair and rebuilding services focused on restoring engine reliability, improving efficiency, and reducing costly truck downtime.",
    img: "/images/servicesix.jpg",
  },
  {
    icon: FiRefreshCw,
    title: "Transmission",
    desc: "Professional truck transmission repair and maintenance services to ensure smoother gear shifting, better performance, and long-term drivetrain reliability.",
    img: "/images/serviceseven.jpeg",
  },
];
export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const indexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPaused = useRef(false);

  const [index, setIndex] = useState(0);

  const loopedServices = [...services, ...services];

  // -----------------------------
  // AUTO SLIDER
  // -----------------------------
  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (isPaused.current) return;

      moveSlide("next");
    }, 2500);
  };

  useEffect(() => {
    startAutoSlide();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // -----------------------------
  // SLIDE FUNCTION
  // -----------------------------
  const moveSlide = (dir: "next" | "prev") => {
    const cardWidth = cardRef.current?.offsetWidth || 0;
    const gap = 30;

    let newIndex = dir === "next" ? indexRef.current + 1 : indexRef.current - 1;

    // loop logic
    if (newIndex >= services.length) newIndex = 0;
    if (newIndex < 0) newIndex = services.length - 1;

    indexRef.current = newIndex;
    setIndex(newIndex);

    gsap.to(containerRef.current, {
      x: -(newIndex * (cardWidth + gap)),
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section className="servicessec">
      <div className="servicessec-container">
        {/* Header */}
        <p className="servicessec-small">OUR SERVICES</p>

        <h2 className="servicessec-heading">
          Professional Truck Repair Solutions
        </h2>

        <p className="servicessec-para">
          We provide reliable and expert truck repair services designed to keep
          your vehicles safe, efficient, and road-ready at all times.
        </p>

        {/* SLIDER */}
        <div
          className="services-slider-wrapper"
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
        >
          <div className="services-slider" ref={containerRef}>
            {loopedServices.map((item, i) => {
              const Icon = item.icon;

              return (
             <Link
  href="/request-service"
  className="servicecard"
  key={i}
  ref={cardRef as any}
>
                  <div className="servicecard-content">
                    <div className="servicecard-icon">
                      <Icon />
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>

              
                  </div>

                  <div className="servicecard-img">
                    <Image src={item.img} alt={item.title} fill />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ARROWS */}
          <div className="slider-arrows">
            <button onClick={() => moveSlide("prev")} className="slider-btn">
              <FaArrowLeft />
            </button>

            <button onClick={() => moveSlide("next")} className="slider-btn">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}