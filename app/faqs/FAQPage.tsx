"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import "./FAQPage.css";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import gsap from "gsap";

const faqData = [
  {
    question: "What truck repair and maintenance services do you offer?",
    answer:
      "We provide complete truck repair and preventive maintenance services including diesel engine diagnostics, brake repair, transmission service, suspension repair, electrical diagnostics, tire replacement, oil changes, cooling system repair, fleet maintenance, and roadside truck assistance for heavy-duty and commercial trucks.",
  },
  {
    question: "Do you provide 24/7 emergency roadside truck assistance?",
    answer:
      "Yes, we offer fast and reliable 24/7 roadside truck assistance for breakdowns, flat tires, dead batteries, overheating issues, fuel delivery, and emergency mechanical problems. Our goal is to minimize downtime and get your truck safely back on the road as quickly as possible.",
  },
  {
    question: "How often should a commercial truck be serviced?",
    answer:
      "Truck maintenance intervals depend on mileage, driving conditions, cargo load, and manufacturer recommendations. In general, commercial trucks should undergo regular inspections and preventive maintenance every few thousand miles to improve performance, fuel efficiency, and overall reliability.",
  },
  {
    question: "Can I book a truck repair appointment online?",
    answer:
      "Absolutely. You can easily schedule a truck repair or maintenance appointment online through our website or by contacting our service team directly. We offer flexible scheduling options for owner-operators, fleet managers, and commercial trucking businesses.",
  },
  {
    question: "Do you repair all major truck brands and diesel engines?",
    answer:
      "Yes, our experienced technicians work on most major truck brands and diesel engines using advanced diagnostic tools and professional repair equipment. We handle repairs for commercial trucks, semi-trucks, heavy-duty vehicles, and fleet trucks.",
  },
  {
    question: "Why is preventive truck maintenance important?",
    answer:
      "Preventive truck maintenance helps reduce unexpected breakdowns, costly repairs, and vehicle downtime. Regular inspections and servicing improve safety, engine performance, fuel economy, and the overall lifespan of your truck.",
  },
  {
    question: "How long does a truck repair usually take?",
    answer:
      "Repair times vary depending on the issue and parts availability. Minor maintenance services may be completed within a few hours, while major engine or transmission repairs can take longer. Our team always provides clear timelines and repair updates throughout the process.",
  },
  {
    question: "Do you offer fleet truck maintenance services?",
    answer:
      "Yes, we provide customized fleet maintenance and repair solutions for commercial trucking companies. Our fleet services help businesses reduce downtime, improve vehicle reliability, and maintain safe operating conditions for all trucks.",
  },
];

export default function FAQPage() {

  const [activeFAQ, setActiveFAQ] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

const toggleFAQ = (index: number) => {

  const current = contentRefs.current[index];

  // CLOSE CURRENT
  if (activeFAQ === index) {

    if (current) {
      gsap.to(current, {
        height: 0,
        opacity: 0,
        duration: 0.45,
        ease: "power3.inOut",
      });
    }

    setActiveFAQ(-1);

    return;
  }

  // CLOSE PREVIOUS
  if (activeFAQ !== -1) {

    const prev = contentRefs.current[activeFAQ];

    if (prev) {
      gsap.to(prev, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }

  setActiveFAQ(index);

  // OPEN NEW
  requestAnimationFrame(() => {

    if (current) {

      gsap.fromTo(
        current,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power3.inOut",
        }
      );
    }
  });
};

  return (
    <>

      {/* BANNER */}
      <section className="faqpg-banner">

        <div className="faqpg-banner-overlay"></div>

        <div className="faqpg-banner-content">

          <h1>FAQs</h1>

          <div className="faqpg-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <p>FAQs</p>
          </div>

        </div>

      </section>

      {/* FAQ SECTION */}
      <section className="faqpg-section">

        <div className="faqpg-container">

          {/* LEFT */}
          <div className="faqpg-left">

            <p className="faqpg-small">
              FREQUENTLY ASKED QUESTIONS
            </p>

         <h2 className="faqpg-heading">
  Trusted Truck Repair & Maintenance FAQs For Commercial Vehicles
</h2>

<p className="faqpg-para">
  Explore answers to frequently asked questions about truck repair,
  diesel engine diagnostics, preventive maintenance, roadside
  assistance, fleet servicing, and commercial vehicle repairs. Our
  experienced technicians are committed to delivering reliable,
  efficient, and professional truck repair solutions that help keep
  your business moving safely and efficiently.
</p>

          </div>

          {/* RIGHT */}
          <div className="faqpg-right">

            {faqData.map((faq, index) => (

              <div
                className={`faqpg-item ${
                  activeFAQ === index ? "active" : ""
                }`}
                key={index}
              >

                <button
                  className="faqpg-question"
                  onClick={() => toggleFAQ(index)}
                >

                  <span>{faq.question}</span>

              {activeFAQ === index ? (
  <FiChevronUp />
) : (
  <FiChevronDown />
)}

                </button>

          <div
  ref={(el) => {
    contentRefs.current[index] = el;
  }}
  className="faqpg-answer-wrapper"
  style={{
    height: activeFAQ === index ? "auto" : 0,
    opacity: activeFAQ === index ? 1 : 0,
  }}
>

                  <div className="faqpg-answer">
                    <p>{faq.answer}</p>
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </>
  );
}