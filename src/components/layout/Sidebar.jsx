import { NavLink, useLocation } from "react-router-dom";
import { sidebarMenu } from "@/config/sidebarMenu";
import { useAuth } from "@/context/useAuth";

function isMenuActive(pathname, itemPath) {
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
}

export default function Sidebar({ collapsed }) {
  const location = useLocation();
  const { user } = useAuth();

  const filteredMenu = sidebarMenu.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  return (
    <aside className={`h-screen bg-temu-darker border-r border-temu-coffee/30 text-temu-cream transition-all ${collapsed ? "w-24" : "w-72"}`}>
      
      <div className="p-6 border-b border-temu-coffee/20">
        <h1 className="text-2xl font-bold tracking-tight text-temu-cream">
          TEMU<span className="text-temu-bronze">RASA</span>
        </h1>
      </div>

      <nav className="px-4 py-5 space-y-2">
        {filteredMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => {
              const active =
                isActive || isMenuActive(location.pathname, item.path);

              return `flex items-center gap-3 rounded-xl px-3 py-3 transition ${
                active
                  ? "bg-temu-charcoal border-l-4 border-temu-bronze text-temu-bronze"
                  : "text-temu-coffee hover:bg-temu-charcoal/50 hover:text-temu-cream"
              }`;
            }}
          >
            <item.icon size={20} />
            {!collapsed && item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-temu-coffee/20 p-4">
        <p className="text-temu-cream font-medium">
          {user?.username}
        </p>
        <p className="text-temu-bronze text-sm">
          {user?.role}
        </p>
      </div>
    </aside>
  );
}