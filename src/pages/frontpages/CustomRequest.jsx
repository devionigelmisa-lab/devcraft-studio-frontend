// src/pages/frontpages/CustomRequest.jsx
import { useState } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import { catalogData } from "../../utils/data";
import { useCart } from "../../utils/CartContext";

export default function CustomRequest() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Ambil ID dari URL params / dynamic route ATAU query param (?id=...)
  const productId = id || searchParams.get("id");

  // Cari produk dengan perbandingan longgar (==) agar String "4" bisa match dengan Number 4
  const product = catalogData.find((p) => String(p.id) === String(productId)) || 
                  catalogData.find((p) => p.type === "service") || 
                  catalogData[0];

  const [formData, setFormData] = useState({
    brandName: "",
    industry: "",
    targetAudience: "",
    stylePreference: "Modern & Minimalist",
    colorPalette: "",
    outputFormat: "PNG, JPG, PDF, SVG",
    referenceUrl: "",
    additionalNotes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const customOrder = {
      ...product,
      cartItemId: `${product.id}-${Date.now()}`,
      briefDetails: formData,
    };

    addToCart(customOrder);
    navigate("/cart");
  };

  // Render form dinamis berdasarkan kategori produk
  const renderCategorySpecificFields = () => {
    const category = (product?.category || "").toLowerCase();
    const productName = (product?.name || "").toLowerCase();

    if (category.includes("poster") || productName.includes("poster")) {
      return (
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-3">
          <p className="font-bold text-[#112a46]">Spesifikasi Detail Event & Poster:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Judul Event / Acara</label>
              <input
                type="text"
                name="eventTitle"
                placeholder="Contoh: Seminar Nasional AI 2026"
                onChange={handleChange}
                className="w-full border rounded-lg p-2.5 outline-none focus:border-[#2b75b1] bg-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Ukuran / Orientasi Poster</label>
              <select
                name="posterSize"
                onChange={handleChange}
                className="w-full border rounded-lg p-2.5 outline-none focus:border-[#2b75b1] bg-white"
              >
                <option value="A4 / A3 (Print)">A4 / A3 (Siap Cetak)</option>
                <option value="1080x1350 (Instagram Feed)">1080x1350 (Instagram Feed)</option>
                <option value="1080x1920 (Story Banner)">1080x1920 (Insta Story Banner)</option>
              </select>
            </div>
          </div>
        </div>
      );
    }

    if (category.includes("social") || category.includes("media") || productName.includes("social")) {
      return (
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-3">
          <p className="font-bold text-[#112a46]">Spesifikasi Konten Social Media:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Platform Tujuan</label>
              <input
                type="text"
                name="platform"
                placeholder="Contoh: Instagram, TikTok, LinkedIn"
                onChange={handleChange}
                className="w-full border rounded-lg p-2.5 outline-none focus:border-[#2b75b1] bg-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Jumlah Konten / Slide</label>
              <input
                type="text"
                name="contentCount"
                placeholder="Contoh: 6 Feeds + 3 Story"
                onChange={handleChange}
                className="w-full border rounded-lg p-2.5 outline-none focus:border-[#2b75b1] bg-white"
              />
            </div>
          </div>
        </div>
      );
    }

    // Default untuk Logo & Branding
    return (
      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-3">
        <p className="font-bold text-[#112a46]">Spesifikasi Identitas Brand / Logo:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Slogan / Tagline (Opsional)</label>
            <input
              type="text"
              name="tagline"
              placeholder="Contoh: 'Taste of Heritage'"
              onChange={handleChange}
              className="w-full border rounded-lg p-2.5 outline-none focus:border-[#2b75b1] bg-white"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Tipe Logo Yang Disukai</label>
            <select
              name="logoType"
              onChange={handleChange}
              className="w-full border rounded-lg p-2.5 outline-none focus:border-[#2b75b1] bg-white"
            >
              <option value="Combination (Icon + Text)">Combination (Icon + Teks)</option>
              <option value="Wordmark (Typographic)">Wordmark (Hanya Teks)</option>
              <option value="Mascot / Character">Mascot / Karakter</option>
              <option value="Minimalist Icon">Minimalist Icon</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <Link to="/" className="text-xs font-semibold text-[#2b75b1] hover:underline">
        ← Batal & Kembali ke Katalog
      </Link>

      <div className="bg-white border rounded-2xl p-8 shadow-sm space-y-6">
        <div className="border-b pb-4">
          <span className="text-xs font-bold text-[#2b75b1] uppercase tracking-wide">
            CREATIVE BRIEF — JASA {product?.category || "CUSTOM"}
          </span>
          <h1 className="text-2xl font-extrabold text-[#112a46] mt-1">
            {product?.name}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Lengkapi instruksi dan kustomisasi di bawah ini agar hasil pengerjaan tim desainer presisi sesuai keinginan kamu.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">
                Nama Brand / Perusahaan / Acara <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="brandName"
                required
                value={formData.brandName}
                onChange={handleChange}
                placeholder="Contoh: Kopi Kita / Seminar Nasional 2026"
                className="w-full border rounded-xl p-3 outline-none focus:border-[#2b75b1] bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">
                Bidang / Industri / Tema <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="industry"
                required
                value={formData.industry}
                onChange={handleChange}
                placeholder="Contoh: Kuliner F&B, Education, Tech Start-up"
                className="w-full border rounded-xl p-3 outline-none focus:border-[#2b75b1] bg-gray-50"
              />
            </div>
          </div>

          {/* DYNAMIC FIELD */}
          {renderCategorySpecificFields()}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">
                Target Audience / Segmen Pelanggan
              </label>
              <input
                type="text"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                placeholder="Contoh: Mahasiswa, Gen Z, Umur 18-35 Tahun"
                className="w-full border rounded-xl p-3 outline-none focus:border-[#2b75b1] bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">
                Gaya Visual / Style Desain
              </label>
              <select
                name="stylePreference"
                value={formData.stylePreference}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 outline-none focus:border-[#2b75b1] bg-gray-50 font-medium"
              >
                <option value="Modern & Minimalist">Modern & Minimalist</option>
                <option value="Bold & Professional">Bold & Professional</option>
                <option value="Playful & Eye-Catching">Playful & Eye-Catching</option>
                <option value="Vintage & Retro">Vintage & Retro</option>
                <option value="Elegant & Luxury">Elegant & Luxury</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">
              Preferensi Warna Utama / Kode Palet (Hex)
            </label>
            <input
              type="text"
              name="colorPalette"
              value={formData.colorPalette}
              onChange={handleChange}
              placeholder="Contoh: Navy (#112a46), Gold (#D4AF37), Putih"
              className="w-full border rounded-xl p-3 outline-none focus:border-[#2b75b1] bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">
              Link Referensi Desain / Moodboard (Pinterest, Dribbble, GDrive)
            </label>
            <input
              type="url"
              name="referenceUrl"
              value={formData.referenceUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border rounded-xl p-3 outline-none focus:border-[#2b75b1] bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">
              Catatan Khusus / Teks Wajib Masuk
            </label>
            <textarea
              name="additionalNotes"
              rows="3"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Tuliskan teks wajib, sponsor logo, atau instruksi pengerjaan khusus lainnya di sini..."
              className="w-full border rounded-xl p-3 outline-none focus:border-[#2b75b1] bg-gray-50"
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#112a46] hover:bg-[#0c1f35] text-white font-bold rounded-xl transition shadow-md text-sm"
            >
              Kirim Brief & Masukkan Keranjang →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}