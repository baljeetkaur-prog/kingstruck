"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./LoginPage.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

const handleLogin = async (e: any) => {
  e.preventDefault();

  setLoading(true);

  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Login successful");

    router.push("/admin");

  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-card">

        <Image
          src="/images/nav-logo.png"
          alt="Logo"
          width={140}
          height={50}
          className="login-logo"
          priority
        />

        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        {/* PASSWORD FIELD WRAPPER */}
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

      <button
  type="submit"
  className="login-button"
  disabled={loading}
>
  {loading ? "Logging in..." : "Login"}
</button>
      </form>
    </div>
  );
}