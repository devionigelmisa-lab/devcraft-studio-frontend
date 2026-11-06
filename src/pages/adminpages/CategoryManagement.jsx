import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useProducts } from "../../utils/ProductContext";
import apiClient from "../../utils/apiClient";
import toast from "react-hot-toast";

export default function CategoryManagement() {
  const { getCategories } = useProducts();
  const queryClient = useQueryClient();
  const [newCategory, setNewCategory] = useState("");

  // 1. Fetch Categories
  const { data: rawCategories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categoriesList = Array.isArray(rawCategories)
    ? rawCategories
    : rawCategories?.data || [];

  // 2. Mutation Tambah Kategori
  const addCategoryMutation = useMutation({
    mutationFn: async (nama_kategori) => {
      return await apiClient.post("/categories", { nama_kategori });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast.success("Kategori berhasil ditambahkan!");
      setNewCategory("");
    },
    onError: () => {
      toast.error("Gagal menambahkan kategori.");
    },
  });

  // 3. Mutation Hapus Kategori
  const deleteCategoryMutation = useMutation({
    mutationFn: async (id) => {
      return await apiClient.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast.success("Kategori berhasil dihapus!");
    },
    onError: () => {
      toast.error("Gagal menghapus kategori.");
    },
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    addCategoryMutation.mutate(newCategory);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus kategori ini?")) {
      deleteCategoryMutation.mutate(id);
    }
  };

  if (isLoading) return <p className="p-4 font-medium">Loading data kategori...</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Manajemen Kategori</h1>

      {/* Form Tambah Kategori */}
      <form onSubmit={handleAdd} className="flex gap-2 max-w-md">
        <input
          type="text"
          placeholder="Nama Kategori Baru..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          + Tambah
        </button>
      </form>

      {/* Tabel Kategori */}
      <div className="overflow-x-auto max-w-2xl">
        <table className="table-auto w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-3 border text-center w-16">#</th>
              <th className="p-3 border">Nama Kategori</th>
              <th className="p-3 border text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList.map((cat, index) => {
              const catId = cat.kategori_id ?? cat.id;
              const catName = cat.nama_kategori ?? cat.nama ?? cat.name;

              return (
                <tr key={catId || index} className="hover:bg-gray-50 border-b">
                  <td className="p-3 border text-center font-medium">{index + 1}</td>
                  <td className="p-3 border font-semibold text-gray-800">{catName}</td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleDelete(catId)}
                      className="text-red-600 hover:underline font-semibold"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}