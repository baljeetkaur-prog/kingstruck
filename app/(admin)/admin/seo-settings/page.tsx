"use client";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import "./seo.css";

export default function SeoPage() {

  const [form, setForm] = useState({
    page: "home",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const [loading, setLoading] =
    useState(false);

const pages = [
  { value: "home", label: "Home Page" },
  { value: "blogs", label: "Blogs Page (Listing)" },
  { value: "contact", label: "Contact Page" },
  { value: "services", label: "Services Page" },
  { value: "about", label: "About Page" },
  { value: "faq", label: "FAQ Page" },
  { value: "request-service", label: "Request Service Page" } 
];

  useEffect(() => {
    fetchSeo();
  }, [form.page]);

const fetchSeo = async () => {
  try {
    const res = await fetch("/api/seo");
    const data = await res.json();

    if (data.success) {
      const pageSeo = data.seo.find(
        (item: any) =>
          item.page === form.page
      );

      if (pageSeo) {
        setForm({
          page: pageSeo.page || form.page,
          metaTitle: pageSeo.metaTitle || "",
          metaDescription: pageSeo.metaDescription || "",
          metaKeywords: pageSeo.metaKeywords || "",
        });
      } else {
        setForm({
          page: form.page,
          metaTitle: "",
          metaDescription: "",
          metaKeywords: "",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

  const handleSubmit = async (
    e: any
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/seo", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("SEO Updated");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seo-page">
      <h1>SEO Settings</h1>

      <form
        className="seo-form"
        onSubmit={handleSubmit}
      >

        {/* PAGE SELECT */}
        <div className="seo-field">
          <label>Select Page</label>

          <select
            value={form.page}
            onChange={(e) =>
              setForm({
                ...form,
                page: e.target.value,
              })
            }
          >
            {pages.map((p) => (
              <option
                key={p.value}
                value={p.value}
              >
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="seo-field">
          <label>Meta Title</label>

          <input
            type="text"
            value={form.metaTitle}
            onChange={(e) =>
              setForm({
                ...form,
                metaTitle:
                  e.target.value,
              })
            }
          />
        </div>

        <div className="seo-field">
          <label>
            Meta Description
          </label>

          <textarea
            rows={6}
            value={form.metaDescription}
            onChange={(e) =>
              setForm({
                ...form,
                metaDescription:
                  e.target.value,
              })
            }
          />
        </div>

        <div className="seo-field">
          <label>Meta Keywords</label>

          <textarea
            rows={4}
            value={form.metaKeywords}
            onChange={(e) =>
              setForm({
                ...form,
                metaKeywords:
                  e.target.value,
              })
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : "Save SEO"}
        </button>

      </form>
    </div>
  );
}