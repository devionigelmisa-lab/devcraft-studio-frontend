import { useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { useCart } from "../../utils/CartContext";
import { catalogData } from "../../utils/data";

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();

  // Ambil item dari state atau cari berdasarkan ID di data.js
  const item = location.state || catalogData.find((p) => p.id === id);

  // State Ulasan
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  if (!item) {
    return (
      <div className="p-12 text-center text-gray-500">
        Item tidak ditemukan. <Link to="/explore" className="text-blue-600 underline">Kembali ke Katalog</Link>
      </div>
    );
  }

  const isService = item.type === "service";

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!review.trim()) return;
    setReviews([...reviews, { id: Date.now(), rating, review }]);
    setReview("");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 border rounded-2xl shadow-sm">
        <div>
          <img src={item.img} alt={item.name} className="w-full h-80 object-cover rounded-xl" />
        </div>

        <div className="space-y-4">
          <span className="text-xs font-semibold px-3 py-1 bg-[#eaf2f8] text-[#2b75b1] rounded-full">
            {item.category}
          </span>
          <h1 className="text-3xl font-extrabold text-[#112a46]">{item.name}</h1>
          <p className="text-gray-600 text-sm">{item.desc}</p>

          <p className="text-2xl font-extrabold text-[#2b75b1]">
            {isService
              ? `From Rp ${item.startingPrice?.toLocaleString("id-ID")}`
              : `Rp ${item.price?.toLocaleString("id-ID")}`}
          </p>

          {isService ? (
            <Link
              to="/custom-request"
              className="w-full text-center py-3 bg-[#112a46] hover:bg-[#0c1f35] text-white font-bold rounded-xl block transition shadow"
            >
              Order Service / Kirim Brief
            </Link>
          ) : (
            <button
              onClick={() => addToCart(item)}
              className="w-full py-3 bg-[#2b75b1] hover:bg-[#112a46] text-white font-bold rounded-xl transition shadow"
            >
              + Tambah ke Keranjang
            </button>
          )}
        </div>
      </div>

      {/* Ulasan */}
      <div className="bg-white p-6 border rounded-2xl shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-[#112a46]">Ulasan Pengguna</h2>

        <form onSubmit={handleAddReview} className="space-y-3 max-w-lg">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Tulis ulasan kamu di sini..."
            className="w-full border rounded-lg p-3 text-sm focus:outline-[#2b75b1]"
            rows="3"
          ></textarea>
          <button type="submit" className="px-4 py-2 bg-[#2b75b1] text-white font-semibold text-sm rounded-lg">
            Kirim Ulasan
          </button>
        </form>

        <div className="space-y-2 pt-4">
          {reviews.length === 0 ? (
            <p className="text-gray-400 text-sm italic">Belum ada ulasan.</p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="p-3 bg-gray-50 border rounded-lg">
                <p className="text-xs text-yellow-500 font-bold">★ {r.rating}</p>
                <p className="text-sm text-gray-700">{r.review}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}