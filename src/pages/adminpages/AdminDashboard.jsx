import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../utils/ProductContext";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const { getProducts, getCategories, deleteProduct } = useProducts();

  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [searchParams, setSearchParams] = useState({ category_id: "", keyword: "" });

  // 1. Fetch Categories
  const { data: rawCategories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categoriesList = Array.isArray(rawCategories)
    ? rawCategories
    : rawCategories?.data || rawCategories?.categories || [];

  // 2. Fetch Products (Query Key Simpel & Stabil)
  const { data: rawProductsData, isLoading, isError } = useQuery({
    queryKey: ["products-list", page, searchParams.category_id, searchParams.keyword, sortBy, sortOrder],
    queryFn: () =>
      getProducts({
        page,
        limit: 5,
        category_id: searchParams.category_id,
        keyword: searchParams.keyword,
        sort_by: sortBy,
        sort_order: sortOrder,
      }),
  });

  const productList = Array.isArray(rawProductsData)
    ? rawProductsData
    : Array.isArray(rawProductsData?.data)
    ? rawProductsData.data
    : rawProductsData?.data?.data || [];

  const lastPage =
    rawProductsData?.last_page ||
    rawProductsData?.data?.last_page ||
    1;

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchParams({
      category_id: selectedCategory,
      keyword: keyword.trim(),
    });
  };

  const handleReset = () => {
    setSelectedCategory("");
    setKeyword("");
    setSortBy("");
    setSortOrder("asc");
    setPage(1);
    setSearchParams({ category_id: "", keyword: "" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus produk ini?");
    if (!confirmDelete) return;

    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Produk berhasil dihapus!");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus produk.");
    }
  };

  if (isLoading) return <p className="p-4 font-medium">Loading data produk...</p>;
  if (isError)
    return (
      <div className="p-4 space-y-2">
        <p className="text-red-500 font-semibold">Gagal memuat data produk.</p>
        <button
          onClick={handleReset}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
        >
          Muat Ulang Data
        </button>
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Manajemen Produk</h1>

      {/* Panel Search, Filter & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-2">
          {/* Select Kategori */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Semua Kategori</option>
            {categoriesList.map((cat) => {
              const catId = cat.kategori_id ?? cat.id ?? cat.category_id;
              const catName = cat.nama_kategori ?? cat.nama ?? cat.name ?? cat.category;
              return (
                <option key={catId} value={catId}>
                  {catName}
                </option>
              );
            })}
          </select>

          {/* Input Keyword */}
          <input
            type="text"
            placeholder="Cari produk..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          {/* Select Sorting */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split("-");
              setSortBy(field || "");
              setSortOrder(order || "asc");
            }}
            className="border rounded px-3 py-1.5 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="-asc">Urutkan Default</option>
            <option value="harga-asc">Harga: Termurah ke Termahal</option>
            <option value="harga-desc">Harga: Termahal ke Termurah</option>
            <option value="judul-asc">Nama: A - Z</option>
            <option value="judul-desc">Nama: Z - A</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-1.5 rounded transition duration-200"
          >
            Cari
          </button>

          {(selectedCategory || keyword || sortBy) && (
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold px-3 py-1.5 rounded transition duration-200"
            >
              Reset
            </button>
          )}
        </form>

        <Link
          to="/admin/add-product"
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          + Tambah Produk
        </Link>
      </div>

      {/* Tabel Data Produk */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-3 border text-center w-12">#</th>
              <th className="p-3 border text-center w-32">Image</th>
              <th className="p-3 border">Nama</th>
              <th className="p-3 border">Harga</th>
              <th className="p-3 border text-center">Stok</th>
              <th className="p-3 border text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {productList.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-400 italic">
                  Belum ada data produk yang sesuai filter.
                </td>
              </tr>
            ) : (
              productList.map((p, index) => {
                if (!p) return null;

                const productName = p.judul || p.nama_desain || p.nama || p.name || "Produk";

                let categoryName = "Uncategorized";
                if (typeof p.kategori === "object" && p.kategori !== null) {
                  categoryName = p.kategori.nama_kategori || p.kategori.nama || "Uncategorized";
                } else if (typeof p.category === "object" && p.category !== null) {
                  categoryName = p.category.name || "Uncategorized";
                } else if (typeof p.kategori === "string") {
                  categoryName = p.kategori;
                }

                let rawImgUrl = p.gambar_url || p.img || p.image || p.gambar || "";
                let imageUrl = "https://via.placeholder.com/150";

                if (rawImgUrl) {
                  let cleanUrl = rawImgUrl.replace("/storage//images/", "/images/");
                  cleanUrl = cleanUrl.replace("/storage/images/", "/images/");

                  if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
                    if (cleanUrl.includes("8000/images/")) {
                      imageUrl = cleanUrl.substring(cleanUrl.indexOf("/images/"));
                    } else {
                      imageUrl = cleanUrl;
                    }
                  } else if (cleanUrl.startsWith("/")) {
                    imageUrl = cleanUrl;
                  } else {
                    imageUrl = `/${cleanUrl}`;
                  }
                }

                const productPrice = typeof p.harga === "number" ? p.harga : (Number(p.price) || 0);
                const productStock = p.stok ?? p.stock ?? 10;
                const productId = p.id || p.desain_id;

                return (
                  <tr key={productId || index} className="hover:bg-gray-50 border-b">
                    <td className="p-3 border text-center font-medium text-gray-600">
                      {(page - 1) * 5 + index + 1}
                    </td>

                    <td className="p-3 border text-center">
                      <img
                        src={imageUrl}
                        alt={productName}
                        className="w-16 h-16 object-cover rounded-xl border border-gray-200 shadow-sm mx-auto bg-gray-50"
                        onError={(e) => {
                          const fallbackName = p.slug ? `${p.slug}.png` : "canva.png";
                          e.target.onerror = null;
                          e.target.src = `/images/${fallbackName}`;
                        }}
                      />
                    </td>

                    <td className="p-3 border">
                      <span className="font-bold text-gray-800 text-base">
                        {productName}
                      </span> <br />
                      <small className="text-gray-500 font-medium">
                        #{categoryName}
                      </small>
                    </td>

                    <td className="p-3 border font-semibold text-gray-700">
                      Rp {productPrice.toLocaleString("id-ID")}
                    </td>

                    <td className="p-3 border text-center font-medium text-gray-700">
                      {productStock}
                    </td>

                    <td className="p-3 border space-x-3 text-center">
                      <Link
                        to={`/admin/edit-product/${productId}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(productId)}
                        className="cursor-pointer text-red-600 hover:text-red-800 font-semibold hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Control */}
      <div className="flex items-center justify-center space-x-1 pt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Sebelumnya
        </button>

        {Array.from({ length: lastPage }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`px-3 py-1 text-sm rounded ${
              page === pageNum
                ? "bg-blue-600 text-white font-bold"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, lastPage))}
          disabled={page === lastPage}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded disabled:opacity-50 hover:bg-blue-700"
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}