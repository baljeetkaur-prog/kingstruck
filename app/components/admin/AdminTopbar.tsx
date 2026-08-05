"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaUserCircle,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

export default function AdminTopbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showPasswordModal, setShowPasswordModal] =
  useState(false);

const [passwords, setPasswords] =
  useState({
    currentPassword: "",
    newPassword: "",
  });

const [loading, setLoading] =
  useState(false);
  const handlePasswordChange = async (
  e: any
) => {
  e.preventDefault();

  setLoading(true);

  try {
    const res = await fetch(
      "/api/admin/change-password",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(passwords),
      }
    );

    const data = await res.json();

    if (data.success) {
      toast.success(
        "Password changed successfully"
      );

      setShowPasswordModal(false);

      setPasswords({
        currentPassword: "",
        newPassword: "",
      });
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="admin-topbar">

      {/* LEFT */}
      <h2 className="admin-topbar-title">
        Kings Truck Admin
      </h2>

      {/* RIGHT */}
      <div className="admin-topbar-right" ref={dropdownRef}>

        <button
          className="admin-avatar-btn"
          onClick={() => setOpen(!open)}
        >
          <FaUserCircle />
        </button>

        {open && (
          <div className="admin-dropdown">

         <button
  className="admin-dropdown-item"
  onClick={() => {
    setShowPasswordModal(true);
    setOpen(false);
  }}
>
              <FaKey />
              <span>Change Password</span>
            </button>

         <button
  className="admin-dropdown-item logout"
  onClick={() =>
    signOut({ callbackUrl: "/admin/login" })
  }
>
  <FaSignOutAlt />
  <span>Logout</span>
</button>

          </div>
        )}

      </div>
      {showPasswordModal && (
  <div className="password-modal-overlay">

    <div className="password-modal">

      <h2>Change Password</h2>

      <form onSubmit={handlePasswordChange}>

        <input
          type="password"
          placeholder="Current Password"
          value={passwords.currentPassword}
          onChange={(e) =>
            setPasswords({
              ...passwords,
              currentPassword:
                e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={(e) =>
            setPasswords({
              ...passwords,
              newPassword:
                e.target.value,
            })
          }
        />

        <div className="password-modal-actions">

          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              setShowPasswordModal(false)
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="save-btn"
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>

        </div>

      </form>

    </div>

  </div>
)}
    </header>
  );
}