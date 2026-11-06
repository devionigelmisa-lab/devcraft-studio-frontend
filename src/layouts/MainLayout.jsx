// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <footer className="bg-[#112a46] text-white text-center p-6 text-sm mt-12">
        <p>© 2026 DevCraft Studio — Solusi Desain Digital & Jasa Desain Kustom.</p>
      </footer>
    </div>
  );
}