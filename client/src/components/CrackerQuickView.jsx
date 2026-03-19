import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function QuickViewModal({ cracker, onClose }) {
  const { addToCart } = useContext(CartContext);

  // toggle full image view
  const [fullView, setFullView] = useState(false);

  if (!cracker) return null;

  return (
    <>
      {/* ================= BACKDROP ================= */}
      <div
        className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
        onClick={onClose}
      >
        {/* ================= MODAL ================= */}
        <div
          className="relative bg-blue-500 border border-orange-400
          w-full max-w-5xl mx-4 rounded-2xl p-6
          grid md:grid-cols-2 gap-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-2xl font-bold
            text-orange-400 hover:text-red-500"
          >
            ✕
          </button>

          {/* ================= IMAGE ================= */}
          <div className="relative group cursor-zoom-in">
            <img
              src={cracker.image || "/placeholder.jpg"}
              alt={cracker.name}
              onClick={() => setFullView(true)}
              className="w-full h-80 object-cover rounded-xl shadow-lg
              group-hover:scale-105 transition"
            />
            <span className="absolute bottom-3 right-3 bg-black/60
            px-3 py-1 text-xs rounded text-white">
              Click to view full image
            </span>
          </div>

          {/* ================= DETAILS ================= */}
          <div>
            <h2 className="text-2xl font-extrabold text-black">
              {cracker.name}
            </h2>

            <p className="text-white font-semibold mt-1">
              Category: {cracker.category}
            </p>

            {/* PRICE */}
            <div className="flex gap-6 items-center my-4">
              {cracker.offer && (
                <span className="line-through text-blue-800 text-2xl">
                ₹{cracker.price}
                </span>
              )}
              <span className="text-orange-500 font-bold text-3xl">
                ₹{cracker.offer || cracker.price}
              </span>
            </div>

            {/* DESCRIPTION FROM BACKEND */}
            <p className="text-sm text-black mb-6 leading-relaxed">
              {cracker.description
                ? cracker.description
                : "No description available for this product."}
            </p>

            {/* ACTION */}
            <button
              onClick={() => addToCart(cracker)}
              className="w-full py-3 bg-orange-400 hover:bg-orange-500
              text-black font-extrabold rounded-lg transition shadow-lg"
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* ================= FULL IMAGE VIEW ================= */}
      {fullView && (
        <div
          className="fixed inset-0 z-[60] bg-black flex items-center justify-center"
          onClick={() => setFullView(false)}
        >
          <img
            src={cracker.image || "/placeholder.jpg"}
            alt="Full View"
            className="max-h-full max-w-full object-contain"
          />

          <button
            onClick={() => setFullView(false)}
            className="absolute top-4 right-5 text-3xl text-white hover:text-red-500"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
