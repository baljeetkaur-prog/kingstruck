"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./FloatingButtons.css";

export default function FloatingButtons() {

  const [scrollPercent, setScrollPercent] = useState(0);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {

    const handleScroll = () => {

      const scrollTop = window.scrollY;

      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const percent = Math.round((scrollTop / docHeight) * 100);

      setScrollPercent(percent);

      // SHOW BUTTON AFTER SCROLL
      setShowScrollBtn(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>

      {/* WHATSAPP */}
   <a
  href="https://wa.me/19163824306"
  target="_blank"
  rel="noopener noreferrer"
  className={`floating-whatsapp ${
    showScrollBtn ? "floating-whatsapp-up" : ""
  }`}
>
  <FaWhatsapp />
</a>

      {/* SCROLL TO TOP */}
      {showScrollBtn && (
        <button
          className="floating-scrolltop"
          onClick={scrollToTop}
          style={{
            background: `conic-gradient(
              #fc0202 ${scrollPercent * 3.6}deg,
              #111 ${scrollPercent * 3.6}deg
            )`,
          }}
        >
          <div className="floating-scroll-inner">
            <span>{scrollPercent}%</span>
          </div>
        </button>
      )}

    </>
  );
}