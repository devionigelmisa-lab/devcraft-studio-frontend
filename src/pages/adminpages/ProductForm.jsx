import React, { useState } from "react";
import { useProducts } from "../../utils/ProductContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function ProductForm() {
  const { addProduct, getCategories } = useProducts();

  // Fetch daftar kategori menggunakan React Query
  const { data: rawCategories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Ekstraksi aman data array kategori
  const categoriesList = Array.isArray(rawCategories)
    ? rawCategories
    : rawCategories?.data || rawCategories?.categories || [];

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",
    description: "",
    img: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });

    try {
      await addProduct(data);
      toast.success("Produk berhasil disimpan!");
      setTimeout(() => navigate("/admin/dashboard"), 1000);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Periksa kembali data yang dimasukkan.");
      } else {
        toast.error("Gagal menyimpan produk.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
        Tambah Produk
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Nama Produk */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Nama Produk
          </label>
          <input
            type="text"
            name="name"
            placeholder="Nama Produk"
            onChange={handleChange}
            className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
          )}
        </div>

        {/* Select Dropdown Kategori */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Pilih Kategori
          </label>
          <select
            name="category_id"
            onChange={handleChange}
            value={formData.category_id}
            className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.category_id ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">-- Pilih Kategori --</option>
            {categoriesList.map((cat) => {
               const catId = cat.kategori_id || cat.id || cat.category_id;
               const catName = cat.nama_kategori || cat.nama || cat.category || cat.name;
               
               return (
               <option key={catId} value={catId}>
                {catName}
                </option>
                );
                })}
                </select>
          {errors.category_id && (
            <p className="text-red-500 text-sm mt-1">{errors.category_id[0]}</p>
          )}
        </div>

        {/* Input Harga */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Harga
          </label>
          <input
            type="number"
            name="price"
            placeholder="Harga Produk"
            onChange={handleChange}
            className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price[0]}</p>
          )}
        </div>

        {/* Input Stok */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Stok
          </label>
          <input
            type="number"
            name="stock"
            placeholder="Jumlah Stok"
            onChange={handleChange}
            className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.stock ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.stock && (
            <p className="text-red-500 text-sm mt-1">{errors.stock[0]}</p>
          )}
        </div>

        {/* Input Deskripsi */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Deskripsi
          </label>
          <textarea
            name="description"
            placeholder="Tuliskan deskripsi produk"
            onChange={handleChange}
            rows="3"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        {/* Input Upload Gambar Produk */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Gambar Produk
          </label>
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-600 hover:file:bg-blue-200 cursor-pointer"
          />
          {errors.img && (
            <p className="text-red-500 text-sm mt-1">{errors.img[0]}</p>
          )}
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-md"
        >
          Simpan Produk
        </button>
      </form>
    </div>
  );
}