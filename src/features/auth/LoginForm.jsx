import { useState } from "react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

            localStorage.setItem("token", data.accessToken);

            window.location.href = "/dashboard";

        } catch (err) {
            console.error(err);
            alert("Login gagal. Cek console.");
        }
    }

    return (

        <div className="w-full max-w-xl bg-white shadow-x1 rounded-2xl p-12 space-y-6">
            <form onSubmit={handleLogin}>
                {/* TITLE */}
                <div>
                    <h2 className="text-4xl font-semibold text-black">
                        Welcome back
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                        Sign in to access the operations dashboard
                    </p>
                </div>

                {/* EMAIL */}
                <div>
                    <label className="text-sm text-gray-600">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Please type your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                </div>


                {/* PASSWORD */}
                <div>
                    <label className="text-sm text-gray-600">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                </div>

                {/* BUTTON */}
                <button type="submit" className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-medium rounded-lg py-3 transition">
                    Sign In
                </button>


                {/* FOOTER */}
                <p className="text-xs text-center text-gray-400">
                    Anchor & Flame v1.0
                </p>
            </form>
        </div>
    );
}