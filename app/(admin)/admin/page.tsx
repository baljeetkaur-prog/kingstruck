"use client";

import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaFileInvoice,
  FaBlog,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    contacts: 0,
    quotations: 0,
    blogs: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [contactsRes, quotesRes, blogsRes] =
          await Promise.all([
            fetch("/api/contact"),
            fetch("/api/quotation"),
            fetch("/api/blogs"),
          ]);

        const contactsData = await contactsRes.json();
        const quotesData = await quotesRes.json();
        const blogsData = await blogsRes.json();

        setStats({
          contacts: contactsData?.count || contactsData?.contacts?.length || 0,
          quotations: quotesData?.count || quotesData?.quotations?.length || 0,
          blogs: blogsData?.blogs?.length || 0,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>

      {/* PAGE TITLE */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your admin panel</p>
      </div>

      {/* STATS CARDS */}
      <div className="dashboard-cards">

        {/* CONTACT QUERIES */}
        <div className="dashboard-card">
          <div className="dashboard-card-icon queries">
            <FaEnvelope />
          </div>

          <div>
            <h3>Contact Queries</h3>
            <h2>
              {loading ? "..." : stats.contacts}
            </h2>
          </div>
        </div>

        {/* QUOTATIONS */}
        <div className="dashboard-card">
          <div className="dashboard-card-icon quotations">
            <FaFileInvoice />
          </div>

          <div>
            <h3>Quotations</h3>
            <h2>
              {loading ? "..." : stats.quotations}
            </h2>
          </div>
        </div>

        {/* BLOGS */}
        <div className="dashboard-card">
          <div className="dashboard-card-icon blogs">
            <FaBlog />
          </div>

          <div>
            <h3>Total Blogs</h3>
            <h2>
              {loading ? "..." : stats.blogs}
            </h2>
          </div>
        </div>

      </div>

    </div>
  );
}