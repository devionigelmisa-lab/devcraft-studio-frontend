import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  const totalItems = cart.reduce((total, item) => total + (item.qty || 1), 0);

  return (
    <header className="bg-[#83a7c3] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-tight flex items-center gap-1">
          <span className="text-white">DevCraft</span>
          <span className="text-[#112a46]">Studio</span>
        </Link>

        <nav className="flex items-center gap-6 font-semibold text-sm">
          <Link to="/" className="hover:text-[#112a46] transition">
            Katalog
          </Link>

          <Link to="/cart" className="relative hover:text-[#112a46] transition flex items-center gap-1.5">
            <span>Keranjang</span>
            {totalItems > 0 && (
              <span className="bg-[#112a46] text-white text-xs font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>

          <Link to="/checkout" className="hover:text-[#112a46] transition">
            Checkout
          </Link>

          <Link
            to="/admin/dashboard"
            className="bg-[#112a46] hover:bg-[#0c1f35] text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
          >
            Admin Panel
          </Link>
        </nav>
      </div>
    </header>
  );
}