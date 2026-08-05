"use client";

import Link from "next/link";
import "./RequestServicePage.css";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";

export default function RequestServicePage() {
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
      phone: formData.get("phone"),
      email: formData.get("email"),
      company: formData.get("company"),
      truck_make:
        formData.get("truck_make"),

      truck_model:
        formData.get("truck_model"),

      service_needed:
        formData.get(
          "service_needed"
        ),

      date: formData.get("date"),

      address:
        formData.get("address"),

      message:
        formData.get("message"),

      emergency:
        formData.get("emergency") ===
        "on",
    };

    /* =========================
       SAVE TO DATABASE
    ========================= */

    const dbResponse = await fetch(
      "/api/quotation",
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
        "Failed to submit request"
      );

      return;

    }

    /* =========================
       SEND TO FORMSPREE
    ========================= */

    const formspreeData =
      new FormData();

    Object.entries(payload).forEach(
      ([key, value]) => {

        formspreeData.append(
          key,
          String(value)
        );

      }
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
        "Service request submitted successfully!"
      );

      form.reset();

      captchaRef.current?.reset();

    } else {

      toast.error(
        "Failed to submit request"
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
      <section className="requestpg-banner">
        <div className="requestpg-banner-overlay"></div>

        <div className="requestpg-banner-content">
          <h1>Request Service</h1>

          <div className="requestpg-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <p>Request Service</p>
          </div>
        </div>
      </section>

      {/* SERVICE FORM */}
      <section className="requestpg-section">

        <div className="requestpg-container">

         <p className="requestpg-small">
  BOOK YOUR SERVICE
</p>

<h2 className="requestpg-heading">
  Schedule Your Truck Service Appointment
</h2>

<p className="requestpg-subtext">
  Fill out the form below and our team will contact you shortly
  to confirm your requested service and appointment details.
</p>

<div className="requestpg-formbox">

<form
  className="requestpg-form"
  onSubmit={handleSubmit}
>

  {/* ROW 1 */}
  <div className="requestpg-row">

    <div className="requestpg-field">
      <label className="requestpg-label">
        Full Name
        <span className="requestpg-required">*</span>
      </label>
      <input type="text" name="name" placeholder="Enter your full name" required />
    </div>

    <div className="requestpg-field">
      <label className="requestpg-label">
        Phone Number
        <span className="requestpg-required">*</span>
      </label>
      <input type="text" name="phone" placeholder="Enter your phone number" required />
    </div>

  </div>

  {/* ROW 2 */}
  <div className="requestpg-row">

    <div className="requestpg-field">
      <label className="requestpg-label">
        Email Address
        <span className="requestpg-required">*</span>
      </label>
      <input type="email" name="email" placeholder="Enter your email address" required />
    </div>

    <div className="requestpg-field">
      <label className="requestpg-label">
        Company Name
      </label>
      <input type="text" name="company" placeholder="Enter company name" />
    </div>

  </div>

  {/* ROW 3 */}
  <div className="requestpg-row">

    <div className="requestpg-field">
      <label className="requestpg-label">
        Truck Make
        <span className="requestpg-required">*</span>
      </label>
      <select name="truck_make" required>
        <option value="">Select truck make</option>
        <option>Freightliner</option>
        <option>Volvo</option>
        <option>Peterbilt</option>
        <option>Kenworth</option>
        <option>Mack</option>
        <option>International</option>
        <option>Western Star</option>
        <option>Other</option>
      </select>
    </div>

    <div className="requestpg-field">
      <label className="requestpg-label">Truck Model</label>
      <input type="text" name="truck_model" placeholder="Enter truck model" />
    </div>

  </div>

  {/* ROW 4 */}
  <div className="requestpg-row">

  <div className="requestpg-field">
  <label className="requestpg-label">
    Service Needed
    <span className="requestpg-required">*</span>
  </label>

  <select name="service_needed" required>
    <option value="">Select a service</option>

    <option>Wheel Alignment</option>
    <option>Hunter Alignment</option>
    <option>DPF Cleaning</option>
    <option>Oil Change</option>
    <option>New & Used Tires</option>
    <option>Suspension</option>
    <option>Brakes</option>
    <option>Computer Diagnostic</option>
    <option>Engine</option>
    <option>Transmission</option>
    <option>Other</option>
  </select>
</div>

    <div className="requestpg-field">
      <label className="requestpg-label">
        Preferred Service Date
        <span className="requestpg-required">*</span>
      </label>
      <input type="date" name="date" required />
    </div>

  </div>

  {/* ADDRESS */}
  <div className="requestpg-field">
    <label className="requestpg-label">
      Service Address / Current Location
      <span className="requestpg-required">*</span>
    </label>
    <input
      type="text"
      name="address"
      placeholder="Enter service address or current truck location"
      required
    />
  </div>

  {/* MESSAGE */}
  <div className="requestpg-field">
    <label className="requestpg-label">
      Describe The Issue
      <span className="requestpg-required">*</span>
    </label>
    <textarea name="message" placeholder="Describe your truck issue..." required />
  </div>

  {/* EMERGENCY */}
  <div className="requestpg-checkbox">
    <input type="checkbox" id="emergency" name="emergency" />
    <label htmlFor="emergency">
      This is an emergency roadside service request
    </label>
  </div>
  <div className="requestpg-captcha">
  <ReCAPTCHA
    ref={captchaRef}
    sitekey="6LegCO0sAAAAAHh9HRJTlqswykGs89XcaJrL9vIv"
  />
</div>

<button type="submit" disabled={loading}>
  {loading ? "Submitting..." : "Request Service"}
</button>

</form>

          </div>

        </div>

      </section>
    </>
  );
}