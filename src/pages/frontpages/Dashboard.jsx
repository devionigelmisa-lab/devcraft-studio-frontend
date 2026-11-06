import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { catalogData } from "../../utils/data";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredCatalog = catalogData.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "" || item.category === category;
    return matchSearch && matchCategory;
  });

  const trendingProducts = filteredCatalog.filter((i) => i.type === "product");
  const popularServices = filteredCatalog.filter((i) => i.type === "service");

  return (
    <div className="space-y-8">
      <section className="bg-[#eaf2f8] py-8 px-6 text-center border-b border-gray-200">
        <div className="max-w-2xl mx-auto space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#112a46]">
            Solusi Desain Praktis untuk Tugas, Bisnis, & Kontenmu! 
          </h1>
          <p className="text-gray-600 text-xs md:text-sm">
            Template desain siap pakai atau mau pesan jasa desain kustom? Semua ada di sini untuk wujudkan ide kreatifmu.
          </p>

        
          <div className="pt-4 max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Cari produk atau desain..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2b75b1]"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2b75b1]"
            >
              <option value="">Semua Kategori</option>
              <option value="Social Media">Social Media</option>
              <option value="CV">CV</option>
              <option value="Presentation">Presentation</option>
              <option value="Poster">Poster</option>
              <option value="Branding">Branding</option>
              <option value="Illustration">Illustration</option>
            </select>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[#112a46]">Trending Products</h2>
          <p className="text-gray-500 text-xs">Produk digital siap pakai langsung download.</p>
        </div>

        {trendingProducts.length === 0 ? (
          <p className="text-sm text-gray-400 italic py-4">Tidak ada produk yang sesuai pencarian.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-6 pt-2">
        <div className="bg-[#112a46] text-white rounded-2xl p-6 text-center space-y-3 shadow-md">
          <span className="text-xs font-bold tracking-widest text-[#83a7c3] uppercase">
            Punya Ide Desain Sendiri?
          </span>
          <h2 className="text-2xl font-extrabold">Ceritain kebutuhanmu, biar kami yang buatkan!</h2>
          <Link
            to="/custom-request"
            className="inline-block px-6 py-2.5 bg-[#83a7c3] hover:bg-white text-[#112a46] font-bold rounded-xl transition text-sm shadow-sm"
          >
            Mulai Project Custom
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 space-y-4 pb-12">
        <div>
          <h2 className="text-xl font-bold text-[#112a46]">Popular Design Services</h2>
          <p className="text-gray-500 text-xs">Jasa pembuatan desain kustom dari desainer studio.</p>
        </div>

        {popularServices.length === 0 ? (
          <p className="text-sm text-gray-400 italic py-4">Tidak ada layanan desain yang sesuai pencarian.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularServices.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}