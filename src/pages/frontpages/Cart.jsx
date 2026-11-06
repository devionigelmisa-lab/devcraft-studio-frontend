import { Link } from "react-router-dom";
import { useCart } from "../../utils/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQty, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto my-16 text-center space-y-4">
        <p className="text-gray-500 text-lg">Keranjang belanja kamu masih kosong.</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[#2b75b1] hover:bg-[#112a46] text-white font-bold rounded-xl transition shadow"
        >
          Jelajah Katalog DevCraft
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-8 px-6 space-y-6">
      <h1 className="text-2xl font-extrabold text-[#112a46]">Keranjang Belanja</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const price = item.price || item.startingPrice || 0;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold text-[#112a46]">{item.name}</h3>
                    <p className="text-xs text-[#2b75b1] font-semibold">
                      Rp {price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    value={item.qty || 1}
                    onChange={(e) => updateQty(item.id, parseInt(e.target.value) || 1)}
                    className="w-14 border rounded p-1 text-center text-sm"
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-xs hover:underline font-semibold"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ringkasan Belanja */}
        <div className="bg-white p-6 border rounded-xl shadow-sm space-y-4 h-fit">
          <h2 className="font-bold text-lg text-[#112a46]">Ringkasan Pesanan</h2>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-bold text-[#2b75b1]">
              Rp {subtotal ? subtotal.toLocaleString("id-ID") : "0"}
            </span>
          </div>
          <hr />
          <Link
            to="/checkout"
            className="w-full block text-center py-3 bg-[#2b75b1] hover:bg-[#112a46] text-white font-bold rounded-xl transition shadow"
          >
            Lanjut ke Pembayaran
          </Link>
        </div>
      </div>
    </div>
  );
}