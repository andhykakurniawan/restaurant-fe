import { NavLink, useLocation } from "react-router-dom";
import { sidebarMenu } from "@/config/sidebarMenu";
import { useAuth } from "@/context/useAuth";
import { ChevronRight } from "lucide-react";

function isMenuActive(pathname, itemPath) {
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
}

export default function ShellSidebar({
  collapsed,
  open,
  onClose,
  // onToggle,
}) {
  const location = useLocation();
  const { user } = useAuth();

  const filteredMenu = sidebarMenu.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  return (
    <>
      {/* overlay mobile */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col
        bg-linear-to-b from-[#141312] via-[#1a1816] to-[#0f0e0d]
        text-temu-cream border-r border-temu-coffee/30
        transition duration-300 md:translate-x-0
        ${collapsed ? "md:w-24" : "md:w-72"}
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="px-6 py-6 border-b border-temu-coffee/20">
          <h1 className="text-4xl font-semibold tracking-light">
            TEMU <span className="text-temu-bronze">RASA</span>
          </h1>

          <p className="text-xl text-temu-muted mt-1">
            Admin Dashboard
          </p>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {filteredMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => {
                const active =
                  isActive ||
                  isMenuActive(location.pathname, item.path);

                return `
                group flex items-center justify-between
                px-4 py-3 rounded-xl
                transition-all duration-200
                ${
                  active
                    ? "bg-linear-to-r from-temu-charcoal to-transparent border-l-4 border-temu-bronze shadow-lg shadow-black/30 text-temu-bronze"
                    : "text-temu-muted hover:text-temu-cream hover:bg-white/5"
                }
                `;
              }}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />

                {!collapsed && (
                  <span className="font-medium">
                    {item.label}
                  </span>
                )}
              </div>

              {!collapsed && (
                <ChevronRight
                  size={16}
                  className="opacity-40 group-hover:opacity-100"
                />
              )}
            </NavLink>
          ))}
        </nav>

        {/* FOOTER PROFILE */}
        <div className="border-t border-temu-coffee/20 px-5 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-temu-bronze/20 border border-temu-bronze/40" />

          {!collapsed && (
            <div className="text-sm">
              <p className="font-medium">
                {user?.username || "Chef Admin"}
              </p>

              <p className="text-temu-muted text-xs">
                {user?.role || "ADMIN"}
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}