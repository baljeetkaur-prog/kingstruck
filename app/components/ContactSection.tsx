"use client";

import "./ContactSection.css";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {

  const sectionRef = useRef<HTMLDivElement>(null);

  const captchaRef = useRef<ReCAPTCHA | null>(null);

  const [loading, setLoading] = useState(false);

 const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {

  e.preventDefault();

  const captchaValue =
    captchaRef.current?.getValue();

  if (!captchaValue) {

    toast.error(
      "Please verify the captcha"
    );

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

  // GSAP
  useEffect(() => {

    const bars = document.querySelectorAll(".progress-fill");

    const percents =
      document.querySelectorAll(".progress-percent");

    bars.forEach((bar, i) => {

      const target = parseInt(
        percents[i].textContent || "0"
      );

      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width: `${target}%`,
          duration: 1.5,
          ease: "power2.out",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    });

  }, []);

  return (
    <section className="contactsec" ref={sectionRef}>

      <div className="contactsec-container">

        {/* LEFT FORM */}
        <div className="contactsec-left">

          <h2 className="contactsec-heading">
            Book Truck Repair Service
          </h2>

          <form
            className="contactsec-form"
            onSubmit={handleSubmit}
          >

            {/* ROW 1 */}
            <div className="form-row">

              <div className="form-group">
                <label>
                  Your Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Your Email <span>*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

            </div>

            {/* ROW 2 */}
            <div className="form-row">

              <div className="form-group">
                <label>Subject</label>

                <input
                  type="text"
                  name="subject"
                  placeholder="Enter subject"
                />
              </div>

              <div className="form-group">
                <label>
                  Phone Number <span>*</span>
                </label>

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  required
                />
              </div>

            </div>

            {/* MESSAGE */}
            <div className="form-group">
              <label>
                Your Message <span>*</span>
              </label>

              <textarea
                name="message"
                placeholder="Write your message here..."
                required
              />
            </div>

            {/* CAPTCHA */}
            <div className="contactsec-captcha">
              <ReCAPTCHA
                ref={captchaRef}
                sitekey="6LegCO0sAAAAAHh9HRJTlqswykGs89XcaJrL9vIv"
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Request"}
            </button>

          </form>

        </div>

        {/* RIGHT INFO */}
     <div className="contactsec-right">

  <p className="contactsec-topsmall">
    WHY CHOOSE KINGS TRUCK CENTER
  </p>

  <h2 className="contactsec-mainheading">
    Trusted Heavy-Duty Truck Repair & Maintenance Specialists
  </h2>

  <p className="contactsec-para">
    At Kings Truck Center, we provide reliable commercial truck
    repair, diesel engine diagnostics, brake servicing, suspension
    repairs, transmission maintenance, and preventive truck care
    solutions designed to reduce downtime and keep your fleet
    operating safely and efficiently on the road.
  </p>

  {/* Progress Bars */}

  <div className="progress-item">

    <div className="progress-label">
      <span>Diesel Engine Repair Services</span>

      <span className="progress-percent">
        95%
      </span>
    </div>

    <div className="progress-bar">
      <div className="progress-fill" />
    </div>

  </div>

  <div className="progress-item">

    <div className="progress-label">
      <span>Truck Brake Repair & Inspection</span>

      <span className="progress-percent">
        90%
      </span>
    </div>

    <div className="progress-bar">
      <div className="progress-fill" />
    </div>

  </div>

  <div className="progress-item">

    <div className="progress-label">
      <span>Advanced Truck Diagnostics</span>

      <span className="progress-percent">
        92%
      </span>
    </div>

    <div className="progress-bar">
      <div className="progress-fill" />
    </div>

  </div>

  <div className="progress-item">

    <div className="progress-label">
      <span>Emergency Roadside Truck Support</span>

      <span className="progress-percent">
        88%
      </span>
    </div>

    <div className="progress-bar">
      <div className="progress-fill" />
    </div>

  </div>

</div>

      </div>

    </section>
  );
}