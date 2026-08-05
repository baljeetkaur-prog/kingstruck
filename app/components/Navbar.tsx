"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  FiPhoneCall,
  FiMenu,
  FiX,
} from "react-icons/fi";

import "./Navbar.css";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSticky, setMobileSticky] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();

useEffect(() => {
  const mq = window.matchMedia("(max-width: 768px)");

  const getScroll = () =>
    window.scrollY || document.documentElement.scrollTop || 0;

  const update = () => {
    const scrolled = getScroll();
    const isMobile = mq.matches;

    if (isMobile) {
      setSticky(false);
      setMobileSticky(scrolled > 10);
      
    } else {
      setSticky(scrolled > 10);
      setMobileSticky(false);
    }
  };

  // listen properly
  window.addEventListener("scroll", update, { passive: true });
  mq.addEventListener("change", update);

  // initial run (IMPORTANT for mobile load)
  update();

  return () => {
    window.removeEventListener("scroll", update);
    mq.removeEventListener("change", update);
  };
}, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };

  }, [menuOpen]);


  return (
    <>
      {mobileSticky && (
  <header className="mobile-sticky-navbar">
    <div className="mobile-sticky-container">

      <Link href="/" className="logo">
        <Image
          src="/images/nav-logo.png"
          alt="Logo"
          width={140}
          height={50}
          className="logo-img"
        />
      </Link>

      <div className="mobile-sticky-right">
      <a href="tel:+19163824306">
  <FiPhoneCall className="mobile-phone-icon" />
</a>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(true)}
        >
          <FiMenu />
        </button>
      </div>

    </div>
  </header>
)}

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${menuOpen ? "active" : ""}`}>

        <div className="sidebar-top">

          <Image
            src="/images/nav-logo.png"
            alt="Logo"
            width={150}
            height={50}
            className="sidebar-logo"
          />

          <button
            className="close-btn"
            onClick={() => setMenuOpen(false)}
          >
            <FiX />
          </button>

        </div>

     <nav className="mobile-nav-links">

  <Link href="/" onClick={() => setMenuOpen(false)}>
    Home
  </Link>

  <Link href="/about-us" onClick={() => setMenuOpen(false)}>
    About Us
  </Link>

  <Link href="/our-services" onClick={() => setMenuOpen(false)}>
    Our Services
  </Link>

  <Link href="/blogs" onClick={() => setMenuOpen(false)}>
    Blog
  </Link>

  <Link href="/faqs" onClick={() => setMenuOpen(false)}>
    FAQs
  </Link>

  <Link href="/contact-us" onClick={() => setMenuOpen(false)}>
    Contact Us
  </Link>

  <Link
    href="/request-service"
    className="mobile-request-btn"
    onClick={() => setMenuOpen(false)}
  >
    Request Service
  </Link>

</nav>

      </div>

      {/* Navbar */}
     <header className={`navbar ${sticky ? "sticky-navbar" : ""} ${mobileSticky ? "hide-on-mobile" : ""}`}>

        <div className="navbar-container">

          {/* Left Side */}
          <div className="navbar-left">

            <Link href="/" className="logo">

              <Image
                src="/images/nav-logo.png"
                alt="Kings Truck Logo"
                width={170}
                height={60}
                priority
                className="logo-img"
              />

            </Link>

            {/* Desktop Nav */}
       <nav className="nav-links">

  <Link
    href="/"
    className={pathname === "/" ? "active-nav" : ""}
  >
    Home
  </Link>

  <Link
    href="/about-us"
    className={pathname === "/about-us" ? "active-nav" : ""}
  >
    About Us
  </Link>

  <Link
    href="/our-services"
    className={pathname === "/our-services" ? "active-nav" : ""}
  >
    Our Services
  </Link>

  <Link
    href="/blogs"
    className={pathname === "/blogs" ? "active-nav" : ""}
  >
    Blog
  </Link>

  <Link
    href="/faqs"
    className={pathname === "/faqs" ? "active-nav" : ""}
  >
    FAQs
  </Link>

  <Link
    href="/contact-us"
    className={pathname === "/contact-us" ? "active-nav" : ""}
  >
    Contact Us
  </Link>

</nav>

          </div>

          {/* Desktop Right */}
          <div className="navbar-right">

          <a
  href="tel:+19163824306"
  className="phone-box"
>

  <FiPhoneCall className="phone-icon" />

  <span>+1 (916)-382-4306</span>

</a>

            <Link href="/request-service" className="contact-btn">
              Request Service
            </Link>

          </div>

          {/* Mobile Right */}
          <div className="mobile-actions">

          <a href="tel:+19163824306">
  <FiPhoneCall className="mobile-phone-icon" />
</a>

            <button
              className="menu-btn"
              onClick={() => setMenuOpen(true)}
            >
              <FiMenu />
            </button>

          </div>

        </div>

      </header>

    </>
  );
}