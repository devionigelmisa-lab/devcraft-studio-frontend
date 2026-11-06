import { Link } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div
      className={`${
        sidebarOpen ? "block" : "hidden"
      } md:block w-64 bg-slate-900 text-white min-h-screen`}
    >
      <div className="p-4 font-bold text-xl border-b border-slate-800">
        DevCraft Admin
      </div>
      <nav className="flex flex-col p-4 space-y-2 text-sm font-medium">
        <Link
          to="/admin/dashboard"
          className="px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/about"
          className="px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
        >
          About
        </Link>
        <Link
          to="/admin/categories"
          className="px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
        >
          Manajemen Kategori
        </Link>
        <Link
          to="/admin/settings"
          className="px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
        >
          Pengaturan Toko
        </Link>
      </nav>
    </div>
  );
}