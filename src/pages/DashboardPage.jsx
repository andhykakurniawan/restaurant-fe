export default function DashboardPage() {

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-6">

      <h1 className="text-4xl font-bold text-[#032446]">
        Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-lg transition"
      >
        Logout
      </button>

    </div>
  );
}