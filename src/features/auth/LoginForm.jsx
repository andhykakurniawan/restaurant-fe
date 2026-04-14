import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      if (!response.ok) {
        throw new Error("Login gagal");
      }

      const data = await response.json();

      login(data.accessToken, data.user);
      navigate("/admin/dashboard", { replace: true });

    } catch {
      alert("Email atau password salah");
    }
  }

  return (
    <div className="w-full max-w-md">

      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-[#1A1A1A]">
          Welcome back
        </h2>

        <p className="mt-2 text-gray-500">
          Sign in to access the operations dashboard
        </p>
      </div>


      {/* FORM */}
      <form onSubmit={handleLogin} className="space-y-6">

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>

          <input
            type="email"
            placeholder="admin@temurasa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-[#1A1A1A] outline-none transition-all focus:border-[#C49A6C] focus:ring-1 focus:ring-[#C49A6C]"
          />
        </div>


        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-[#1A1A1A] outline-none transition-all focus:border-[#C49A6C] focus:ring-1 focus:ring-[#C49A6C]"
          />
        </div>


        {/* BUTTON */}
        <button
          type="submit"
          className="w-full rounded-lg bg-[#C49A6C] py-3.5 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#9F7B4F] active:scale-[0.98]"
        >
          Sign In
        </button>

      </form>


      {/* FOOTER */}
      <footer className="mt-12 text-center text-xs tracking-widest text-gray-400 uppercase">
        TEMU RASA v1.0
      </footer>

    </div>
  );
}
