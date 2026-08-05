import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTopbar from "@/app/components/admin/AdminTopbar";

import "./admin.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/admin/login");

  if ((session.user as any)?.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        <AdminTopbar />

        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
}