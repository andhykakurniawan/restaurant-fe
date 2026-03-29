export default function AuthLayout({ children }) {
    return (
        <div className="grid min-h-screen md:grid-cols-2">

            {/* LEFT PANEL */}
            <div className="hidden md:flex flex-col items-center justify-center bg-linear-to-b from-[#1E2F5A] to-[#0F172A] text-white p-10">

                <img
                    src="/assets/logo/logo-primary.png"
                    alt="Anchor & Flame"
                    className="w-40 mb-6"
                />

                <h1
                    style={{ fontFamily: "Allura, cursive" }}
                    className="text-4xl tracking-normal"
                >
                    Anchor & Flame
                </h1>

                <p className="opacity-80 mt-3">
                    Kitchen Operations Panel
                </p>

            </div>


            {/* RIGHT PANEL */}
            <div className="flex items-center justify-center bg-white">
                {children}
            </div>

        </div>
    );
}