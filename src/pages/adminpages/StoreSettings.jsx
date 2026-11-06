import React, { useState } from "react";
import toast from "react-hot-toast";

export default function StoreSettings() {
  const [storeData, setStoreData] = useState({
    name: "DevCraft Studio",
    email: "contact@devcraft.id",
    phone: "+62 812-3456-7890",
    address: "Singaraja, Bali, Indonesia",
    description: "Platform penyedia template UI/UX dan aset digital berkualitas tinggi.",
  });

  const handleChange = (e) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Menyimpan sementara di LocalStorage
    localStorage.setItem("devcraft_store_settings", JSON.stringify(storeData));
    toast.success("Pengaturan profil studio berhasil disimpan!");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Pengaturan Toko / Studio</h1>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Nama Studio</label>
          <input
            type="text"
            name="name"
            value={storeData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Email Kontak</label>
            <input
              type="email"
              name="email"
              value={storeData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Nomor WhatsApp / Telepon</label>
            <input
              type="text"
              name="phone"
              value={storeData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Alamat Studio</label>
          <input
            type="text"
            name="address"
            value={storeData.address}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Deskripsi Singkat Studio</label>
          <textarea
            name="description"
            rows="3"
            value={storeData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow transition"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}