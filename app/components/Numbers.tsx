"use client";

import "./Numbers.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const numbersData = [
  { from: 10, to: 98, suffix: "+", label: "Projects" },
  { from: 1, to: 20, suffix: "+", label: "Years Experience" },
  { from: 100, to: 1200, suffix: "+", label: "Trucks Serviced" },
  { from: 1, to: 35, suffix: "+", label: "Expert Technicians" },
  { from: 50, to: 100, suffix: "%", label: "Customer Satisfaction" },
];

export default function Numbers() {
  const refs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      refs.current.forEach((el, i) => {
        if (!el) return;

        const obj = { value: numbersData[i].from };

        gsap.to(obj, {
          value: numbersData[i].to,
          duration: 3,
          ease: "power2.out",

          scrollTrigger: {
            trigger: ".numbers",
            start: "top 80%",
          },

          onUpdate: () => {
            if (el) {
              el.textContent =
                Math.floor(obj.value) + (numbersData[i].suffix || "");
            }
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="numbers">
      <div className="numbers-container">
        {numbersData.map((item, i) => (
          <div className="number-card" key={i}>
            <h2
              className="number-bg"
              ref={(el) => {
                refs.current[i] = el;
              }}
            >
              {item.from}
            </h2>

            <div className="number-overlay">
              <h3>{item.label}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}