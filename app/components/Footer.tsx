"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FiChevronRight,
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Column 1 */}
        <div className="footer-col footer-about">

          <Link href="/" className="footer-logo">
            <Image
              src="/images/nav-logo.png"
              alt="Kings Truck"
              width={220}
              height={70}
              className="footer-logo-img"
            />
          </Link>

          <p className="footer-desc">
            Kings Truck provides professional truck
            repair, maintenance, diagnostics, suspension,
            engine, transmission, and tire services with
            trusted workmanship and fast turnaround
            times for commercial vehicles.
          </p>

        </div>

        {/* Column 2 */}
        <div className="footer-col">

          <h3 className="footer-heading">
            Quick Links
          </h3>

          <div className="footer-links">

            <Link href="/" className="footer-link">
              <FiChevronRight />
              Home
            </Link>

            <Link href="/about-us" className="footer-link">
              <FiChevronRight />
              About Us
            </Link>

            <Link href="/our-services" className="footer-link">
              <FiChevronRight />
              Our Services
            </Link>

            <Link href="/blogs" className="footer-link">
              <FiChevronRight />
              Blogs
            </Link>

            <Link href="/faqs" className="footer-link">
              <FiChevronRight />
              FAQs
            </Link>

            <Link href="/contact-us" className="footer-link">
              <FiChevronRight />
              Contact Us
            </Link>

          </div>

        </div>

        {/* Column 3 */}
        <div className="footer-col">

          <h3 className="footer-heading">
            Our Services
          </h3>

          <div className="footer-links">
               <Link href="/our-services" className="footer-link">
              <FiChevronRight />
              Wheel Alignment
            </Link>
                <Link href="/our-services" className="footer-link">
              <FiChevronRight />
              Hunter Alignment
            </Link>
              <Link href="/our-services" className="footer-link">
              <FiChevronRight />
              DPF Cleaning
            </Link>

            <Link href="/our-services" className="footer-link">
              <FiChevronRight />
              Oil Change
            </Link>

            <Link href="/our-services" className="footer-link">
              <FiChevronRight />
              New & Used Tires
            </Link>

            <Link href="/our-services" className="footer-link">
              <FiChevronRight />
              Suspension
            </Link>

            <Link href="/our-services" className="footer-link">
              <FiChevronRight />
              Brakes
            </Link>

            <Link href="/our-services" className="footer-link">
              <FiChevronRight />
              Computer Diagnostic
            </Link>

            <Link href="/our-services" className="footer-link">
              <FiChevronRight />
              Engine
            </Link>

            <Link href="/our-services" className="footer-link">
              <FiChevronRight />
              Transmission
            </Link>

          

          </div>

        </div>

        {/* Column 4 */}
        <div className="footer-col">

          <h3 className="footer-heading">
            Contact Us
          </h3>

       <div className="footer-contact">

  {/* ADDRESS */}
  <div className="footer-contact-item">

    <FiMapPin className="footer-contact-icon" />

    <a
      href="https://www.google.com/maps/place/Kings+Truck+Center/@38.4726611,-121.4200522,17z"
      target="_blank"
      rel="noopener noreferrer"
    >
      7849 Stockton Blvd Sacramento,
      California
    </a>

  </div>

  {/* PHONE */}
  <div className="footer-contact-item">

    <FiPhone className="footer-contact-icon" />

    <a href="tel:+19163824306">
      +1 (916)-382-4306
    </a>

  </div>

  {/* EMAIL */}
  <div className="footer-contact-item">

    <FiMail className="footer-contact-icon" />

    <a href="mailto:kingstruckcenter15@gmail.com">
      kingstruckcenter15@gmail.com
    </a>

  </div>

</div>

        </div>

        {/* Column 5 */}
        <div className="footer-col">

          <h3 className="footer-heading">
            Follow Us
          </h3>

          <div className="footer-socials">

             <a
      href="https://www.facebook.com/kingstruckcenter"
      target="_blank"
      rel="noopener noreferrer"
      className="footer-social"
      aria-label="Facebook"
    >
      <FaFacebookF />
    </a>

             <a
      href="https://www.instagram.com/kings_truckcenter/"
      target="_blank"
      rel="noopener noreferrer"
      className="footer-social"
      aria-label="Instagram"
    >
      <FaInstagram />
    </a>

          </div>

        </div>

      </div>
            {/* Bottom Bar */}
      <div className="footer-bottom">

        <div className="footer-bottom-container">

          <p className="footer-credit">
            © 2026 Kings Truck. Designed & Developed by{" "}

            <a
              href="https://socialsimba.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-credit-link"
            >
              Social Simba
            </a>

          </p>

        </div>

      </div>

    </footer>
  );
}