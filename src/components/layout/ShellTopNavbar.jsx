import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { sidebarMenu } from "@/config/sidebarMenu";

export default function ShellTopNavbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = sidebarMenu.find((item) => 
  location.pathname.startsWith(item.path));
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-temu-coffee/30 bg-temu-darker/95 px-4 py-4 backdrop-blur md:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-temu-coffee/30 text-temu-cream transition hover:bg-temu-charcoal md:hidden"
          aria-label="Buka navigasi"
        >
          <span className="text-lg font-semibold">≡</span>
        </button>

        <div>
          <p className="text-4xl font-semibold tracking-light text-temu-bronze">
            {currentPage?.label || "Dashboard"}
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-temu-cream">
            {user?.username || "Admin"}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-full border border-temu-coffee/40 bg-temu-charcoal px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-temu-bronze">
          {user?.role || "SUPER_ADMIN"}
        </span>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-2xl bg-temu-charcoal px-4 py-2.5 text-sm font-semibold text-temu-cream transition hover:bg-temu-coffee"
        >
          Logout
        </button>
      </div>
    </header>
  );
}