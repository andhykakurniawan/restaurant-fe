import { useParams } from "react-router-dom";

const pageContent = {
  dashboard: {
    eyebrow: "Ringkasan operasional",
    title: "Dashboard",
    description:
      "Pantau performa outlet, status pesanan, dan indikator operasional dari satu layout yang konsisten.",
    metrics: [
      { label: "Today Revenue", value: "Rp 12.8M" },
      { label: "Open Orders", value: "24" },
      { label: "Active Staff", value: "18" },
    ],
  },

  menu: {
    eyebrow: "Katalog produk",
    title: "Manage Menu",
    description:
      "Kelola daftar menu, kategori, dan harga dengan struktur halaman admin yang sama.",
    metrics: [
      { label: "Total Menu Items", value: "84" },
      { label: "Draft Changes", value: "6" },
      { label: "Out of Stock", value: "4" },
    ],
  },

  settings: {
    eyebrow: "Konfigurasi sistem",
    title: "Settings",
    description:
      "Atur preferensi operasional, hak akses, dan integrasi tanpa keluar dari layout dashboard.",
    metrics: [
      { label: "User Roles", value: "5" },
      { label: "Pending Changes", value: "2" },
      { label: "Connected Services", value: "7" },
    ],
  },
};

export default function DashboardPage() {
  const { section = "dashboard" } = useParams();

  const content =
    pageContent[section] || pageContent.dashboard;

  return (
    <div className="space-y-6">

      {/* Hero section */}
      <section className="overflow-hidden rounded-4xl bg-temu-charcoal px-6 py-8 text-temu-cream shadow-xl md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-temu-bronze">
          {content.eyebrow}
        </p>

        <h1 className="mt-4 text-3xl font-semibold md:text-4xl">
          {content.title}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-temu-coffee md:text-base">
          {content.description}
        </p>
      </section>

      {/* Metrics */}
      <section className="grid gap-4 md:grid-cols-3">
        {content.metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-3xl border border-temu-coffee/30 bg-temu-darker p-6"
          >
            <p className="text-sm text-temu-muted">
              {metric.label}
            </p>

            <p className="mt-3 text-3xl font-semibold text-temu-cream">
              {metric.value}
            </p>
          </article>
        ))}
      </section>

      {/* Info block */}
      <section className="rounded-4xl border border-dashed border-temu-coffee/40 bg-temu-charcoal p-6">
        <h2 className="text-lg font-semibold text-temu-cream">
          Reusable Dashboard Shell
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-temu-muted">
          Halaman ini dipasang di dalam layout admin yang sama, sehingga sidebar,
          navbar, role badge, dan shortcut logout dipakai ulang untuk semua route
          yang dilindungi.
        </p>
      </section>

    </div>
  );
}