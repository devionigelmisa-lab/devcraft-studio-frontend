import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

export default function ProductCard({ item }) {
  const { addToCart } = useCart();

  const isService = item.type === "service";
  const priceDisplay = item.price
    ? `Rp ${item.price.toLocaleString("id-ID")}`
    : `From Rp ${item.startingPrice?.toLocaleString("id-ID")}`;

  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="relative mb-3">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-44 object-cover rounded-xl"
          />
          <span className="absolute top-2 right-2 bg-[#112a46] text-white text-[10px] font-bold px-2 py-1 rounded-md capitalize">
            {item.type}
          </span>
        </div>

        <span className="text-[11px] font-semibold text-[#2b75b1] bg-blue-50 px-2 py-0.5 rounded-md">
          {item.category}
        </span>

        <h3 className="font-bold text-[#112a46] mt-2 text-base line-clamp-1">
          {item.name}
        </h3>

        <div className="flex justify-between items-center mt-3 text-xs">
          <span className="text-yellow-500 font-bold">★ {item.rating || "5.0"}</span>
          <span className="font-extrabold text-[#112a46]">{priceDisplay}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t flex gap-2">
        <Link
          to={`/product/${item.id}`}
          className="flex-1 py-2 bg-[#2b75b1] hover:bg-[#112a46] text-white font-semibold text-xs rounded-xl transition shadow-sm text-center"
        >
          Lihat Detail
        </Link>

  
        {isService ? (
          <Link
            to={`/custom-request/${item.id}`}
            className="px-3 py-2 bg-[#112a46] hover:bg-black text-white font-semibold text-xs rounded-xl transition shadow-sm flex items-center justify-center"
          >
            Brief
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => addToCart(item)}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition shadow-sm"
          >
            + Keranjang
          </button>
        )}
      </div>
    </div>
  );
}