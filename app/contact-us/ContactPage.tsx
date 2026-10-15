"use client";

import Link from "next/link";
import Image from "next/image";
import "./ContactPage.css";

import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";

export default function ContactPage() {
  const captchaRef = useRef<ReCAPTCHA | null>(null);

  const [loading, setLoading] = useState(false);

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {

  e.preventDefault();

  const captchaValue =
    captchaRef.current?.getValue();

  if (!captchaValue) {
    toast.error("Please verify the captcha");
    return;
  }

  setLoading(true);

  try {

    const form = e.currentTarget;

    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    /* =========================
       SAVE TO DATABASE
    ========================= */

    const dbResponse = await fetch(
      "/api/contact",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const dbData =
      await dbResponse.json();

    if (!dbData.success) {
      toast.error(
        "Failed to save message"
      );
      return;
    }

    /* =========================
       SEND TO FORMSPREE
    ========================= */

    const formspreeData =
      new FormData();

    formspreeData.append(
      "name",
      String(payload.name)
    );

    formspreeData.append(
      "email",
      String(payload.email)
    );

    formspreeData.append(
      "subject",
      String(payload.subject || "")
    );

    formspreeData.append(
      "phone",
      String(payload.phone)
    );

    formspreeData.append(
      "message",
      String(payload.message)
    );

    const response = await fetch(
      "https://formspree.io/f/mojrgboe",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formspreeData,
      }
    );

    if (response.ok) {

      toast.success(
        "Message sent successfully!"
      );

      form.reset();

      captchaRef.current?.reset();

    } else {

      toast.error(
        "Failed to send message"
      );

    }

  } catch (error) {

    console.log(error);

    toast.error(
      "Something went wrong"
    );

  } finally {

    setLoading(false);

  }

};

  return (
    <>


      {/* BANNER */}
      <section className="contactpg-banner">
        <div className="contactpg-banner-overlay"></div>

        <div className="contactpg-banner-content">
          <h1>Contact Us</h1>

          <div className="contactpg-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <p>Contact Us</p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contactpg-section">
        <div className="contactpg-container">

          {/* LEFT FORM */}
          <div className="contactpg-formbox">
            <p className="contactpg-small">GET IN TOUCH</p>

            <h2 className="contactpg-heading">
              We’re Here To Help You Anytime
            </h2>

            <form
              className="contactpg-form"
              onSubmit={handleSubmit}
            >
              <div className="contactpg-row">
                <div className="contactpg-field">
                  <label className="contactpg-label">
                    Your Name{" "}
                    <span className="contactpg-required">*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="contactpg-field">
                  <label className="contactpg-label">
                    Your Email{" "}
                    <span className="contactpg-required">*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="contactpg-row">
                <div className="contactpg-field">
                  <label className="contactpg-label">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    placeholder="Enter subject"
                  />
                </div>

                <div className="contactpg-field">
                  <label className="contactpg-label">
                    Phone Number{" "}
                    <span className="contactpg-required">*</span>
                  </label>

                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              <div className="contactpg-field">
                <label className="contactpg-label">
                  Your Message{" "}
                  <span className="contactpg-required">*</span>
                </label>

                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  required
                />
              </div>

              <div className="contactpg-captcha">
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey="6LegCO0sAAAAAHh9HRJTlqswykGs89XcaJrL9vIv"
                />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* RIGHT IMAGE + INFO */}
          <div className="contactpg-right">

            <div className="contactpg-imagewrap">
              <Image
                src="/images/aboutimgpg.jpg"
                alt="Contact"
                width={700}
                height={900}
              />

              <div className="contactpg-overlay">
                <h3>Contact Details</h3>

                <p>
                  Need any consultations contact with us
                </p>

                {/* INFO LIST */}
                <div className="contactpg-info">

                  <div className="contactpg-infoitem">
                    <FiPhone />

                    <div>
                      <h4>Phone Number</h4>
                      <p>+1 (916)-382-4306</p>
                    </div>
                  </div>

                  <div className="contactpg-divider"></div>

                  <div className="contactpg-infoitem">
                    <FiMail />

                    <div>
                      <h4>Email</h4>
                      <p>info@kingstruckcenter.com</p>
                    </div>
                  </div>

                  <div className="contactpg-divider"></div>

                  <div className="contactpg-infoitem">
                    <FiMapPin />

                    <div>
                      <h4>Location</h4>
                      <p>
                     7849 Stockton Blvd Sacramento, California
                      </p>
                    </div>
                  </div>

                </div>

                {/* SOCIAL */}
                <div className="contactpg-social">
                  <a
    href="https://www.facebook.com/kingstruckcenter"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <FaFacebookF />
  </a>
                <a
    href="https://www.instagram.com/kings_truckcenter/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <FaInstagram />
  </a>
                
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* MAP */}
        <div className="contactpg-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3123.649127356175!2d-121.4223482157818!3d38.472660999152076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac5399b4d7211%3A0xdc0a6ba24ee7b699!2sKings%20Truck%20Center!5e0!3m2!1sen!2sin!4v1778839351317!5m2!1sen!2sin"
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </>
  );
}
