import { useAuth } from "@/context/useAuth";

export default function TopNavbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-temu-coffee/20 bg-temu-darker text-temu-cream">
      <h2 className="font-semibold">Dashboard</h2>

      <div className="flex items-center gap-4">
        <span>{user?.username}</span>

        <span className="px-2 py-1 rounded bg-temu-charcoal text-temu-bronze text-xs">
          {user?.role}
        </span>

        <button
          onClick={logout}
          className="text-sm hover:text-temu-bronze"
        >
          Logout
        </button>
      </div>
    </header>
  );
}