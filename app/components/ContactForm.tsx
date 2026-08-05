"use client";

import "./ContactForm.css";

import { useRef, useState } from "react";

import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";

export default function ContactForm() {

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

  return (
    <section className="contactform">

      {/* Left Image Side */}
      <div className="contactform-left"></div>

      {/* Right Form Side */}
      <div className="contactform-right">

        <div className="contactform-content">

         <p className="contactform-smallheading">
  KINGS TRUCK CENTER
</p>

       <h2 className="contactform-heading">
  Contact Our Heavy-Duty Truck
  Repair & Maintenance Experts
</h2>

          <form
            className="contactform-form"
            onSubmit={handleSubmit}
          >

            {/* ROW 1 */}
            <div className="contactform-inputgroup">

              <div className="contactform-field">

                <label className="contactform-label">
                  Your Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="contactform-input"
                  required
                />

              </div>

              <div className="contactform-field">

                <label className="contactform-label">
                  Email Address <span>*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="contactform-input"
                  required
                />

              </div>

            </div>

            {/* ROW 2 */}
            <div className="contactform-inputgroup">

              <div className="contactform-field">

                <label className="contactform-label">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  placeholder="Enter subject"
                  className="contactform-input"
                />

              </div>

              <div className="contactform-field">

                <label className="contactform-label">
                  Phone Number <span>*</span>
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="contactform-input"
                  required
                />

              </div>

            </div>

            {/* MESSAGE */}
            <div className="contactform-field">

              <label className="contactform-label">
                Message <span>*</span>
              </label>

              <textarea
                name="message"
                placeholder="Write your message"
                className="contactform-textarea"
                rows={6}
                required
              ></textarea>

            </div>

            {/* CAPTCHA */}
            <div className="contactform-captcha">

              <ReCAPTCHA
                ref={captchaRef}
                sitekey="6LegCO0sAAAAAHh9HRJTlqswykGs89XcaJrL9vIv"
              />

            </div>

            <button
              type="submit"
              className="contactform-btn"
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : "Get Contact Us"}
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}