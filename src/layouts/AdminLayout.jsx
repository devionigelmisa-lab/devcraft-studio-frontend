import { Link, NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Admin */}
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col justify-between shrink-0 shadow-lg">
        <div>
          {/* Judul Admin */}
          <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-4 mb-6">
            DevCraft Admin
          </h2>

          {/* Navigasi Utama */}
          <nav className="space-y-2 flex flex-col">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-lg transition text-sm font-semibold flex items-center gap-2 ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/about"
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-lg transition text-sm font-semibold flex items-center gap-2 ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              About
            </NavLink>

            {/* Menu Baru: Manajemen Kategori */}
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-lg transition text-sm font-semibold flex items-center gap-2 ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              Manajemen Kategori
            </NavLink>

            {/* Menu Baru: Pengaturan Toko */}
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-lg transition text-sm font-semibold flex items-center gap-2 ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              Pengaturan Toko
            </NavLink>
          </nav>
        </div>

        {/* Tombol Kembali ke Website Utama */}
        <div className="pt-4 border-t border-slate-700">
          <Link
            to="/"
            className="block w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-center rounded-lg transition text-xs font-medium"
          >
            ← Kembali ke Website
          </Link>
        </div>
      </aside>

      {/* Area Konten Utama Halaman (Outlet) */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}