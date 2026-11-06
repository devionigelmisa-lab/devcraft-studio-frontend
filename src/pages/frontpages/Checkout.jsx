import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../utils/CartContext";

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("QRIS");

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    clearCart();
    alert("Pembayaran Berhasil! Pesanan kamu sedang diproses.");
    navigate("/");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto my-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-[#112a46]">Keranjang Belanja Kosong</h1>
        <p className="text-gray-500 text-sm">Tidak ada produk yang bisa dicheckout saat ini.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-8 px-6 space-y-6">
      <h1 className="text-2xl font-extrabold text-[#112a46]"> Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="bg-white p-6 border rounded-2xl shadow-sm space-y-6">
        <div className="space-y-3">
          <h2 className="font-bold text-[#112a46]">Informasi Pemesan</h2>
          <input
            type="text"
            required
            placeholder="Nama Lengkap"
            className="w-full border rounded-lg p-2.5 text-sm focus:outline-[#2b75b1]"
          />
          <input
            type="email"
            required
            placeholder="Alamat Email"
            className="w-full border rounded-lg p-2.5 text-sm focus:outline-[#2b75b1]"
          />
        </div>

        <div className="space-y-2">
          <h2 className="font-bold text-[#112a46]">Metode Pembayaran</h2>
          <div className="flex gap-4">
            {["QRIS", "E-Wallet", "Bank Transfer"].map((method) => (
              <label key={method} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {method}
              </label>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Total Tagihan:</p>
            <p className="text-xl font-extrabold text-[#2b75b1]">
              Rp {subtotal ? subtotal.toLocaleString("id-ID") : "0"}
            </p>
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-[#112a46] hover:bg-[#0c1f35] text-white font-bold rounded-xl transition shadow"
          >
            Bayar Sekarang
          </button>
        </div>
      </form>
    </div>
  );
}