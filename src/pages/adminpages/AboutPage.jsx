import React from "react";

export default function AboutPage() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Tentang DevCraft Studio</h1>
      <p className="text-gray-600 leading-relaxed">
        DevCraft Studio adalah platform manajemen katalog e-commerce modern yang dirancang untuk mempermudah pengelolaan produk digital, kategori, dan profil usaha secara efisien.
      </p>
      <div className="pt-4 border-t border-gray-100 text-sm text-gray-500 space-y-1">
        <p><span className="font-semibold text-gray-700">Versi Aplikasi:</span> 1.0.0</p>
        <p><span className="font-semibold text-gray-700">Pengembang:</span> Tim DevCraft Studio</p>
        <p><span className="font-semibold text-gray-700">Tech Stack:</span> React, TanStack Query, Tailwind CSS & Laravel API</p>
      </div>
    </div>
  );
}