"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">

      {/* LOGO */}
      <div className="admin-sidebar-logo">
        <Image
          src="/images/nav-logo.png"
          alt="Logo"
          width={140}
          height={45}
          priority
        />
      </div>

      {/* MENU */}
      <div className="admin-sidebar-content">

        <Link className={`admin-link ${pathname === "/admin" ? "active" : ""}`} href="/admin">
          <span>Dashboard</span>
          <FaChevronRight className="chevron" />
        </Link>

        <Link className={`admin-link ${pathname === "/admin/quotations" ? "active" : ""}`} href="/admin/quotations">
          <span>Quotations</span>
          <FaChevronRight className="chevron" />
        </Link>

        <Link className={`admin-link ${pathname === "/admin/contact-queries" ? "active" : ""}`} href="/admin/contact-queries">
          <span>Contact Queries</span>
          <FaChevronRight className="chevron" />
        </Link>

      <Link
  className={`admin-link ${pathname === "/admin/blogs" ? "active" : ""}`}
  href="/admin/blogs"
>
  <span>Blogs</span>
  <FaChevronRight className="chevron" />
</Link>

    <Link
  className={`admin-link ${
    pathname === "/admin/blogs/view"
      ? "active"
      : ""
  }`}
  href="/admin/blogs/view"
>
  <span>Manage Blogs</span>

  <FaChevronRight className="chevron" />
</Link>

        <Link className={`admin-link ${pathname === "/admin/seo-settings" ? "active" : ""}`} href="/admin/seo-settings">
          <span>SEO Settings</span>
          <FaChevronRight className="chevron" />
        </Link>

      </div>

      {/* LOGOUT (BOTTOM FIXED) */}
      <div className="admin-sidebar-footer">
     <button
  className="admin-logout"
  onClick={() =>
    signOut({ callbackUrl: "/admin/login" })
  }
>
  Logout
</button>
      </div>

    </aside>
  );
}