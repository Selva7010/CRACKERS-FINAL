import {useState } from "react";
import GiftboxQuickView from "./GiftboxQuickView";

export default function GiftboxCard({ item }) {
  const [selected, setSelected] = useState(null);

  const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((i) => i._id === product._id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // 🔥 Notify navbar
  window.dispatchEvent(new Event("cartUpdated"));
};


  return (
    <>
      {/* ================= CARD ================= */}
      <div
        className="relative  border
        border-blue-400/30 rounded-2xl shadow-lg
        hover:shadow-blue-500/30 transition p-4 text-white group"
      >
        {/* IMAGE */}
        <div className="overflow-hidden rounded-xl">
          <img
            src={item.mainImage || "/placeholder.jpg"}
            alt={item.name}
            className="h-36 w-full object-cover cursor-pointer
            group-hover:scale-110 transition"
            onClick={() => setSelected(item)}
          />
        </div>

        {/* DETAILS */}
        <h3 className="mt-3 font-bold text-lg">
          Name: {item.name}
        </h3>

        <p className="text-sm text-gray-200">
          {item.category}
        </p>

        {/* PRICE */}
        <div className="mt-2">
          <span className="line-through text-red-300">
            ₹{item.price}
          </span>
          <div>
            <span className="text-blue-900 font-bold text-lg">
              ₹{item.offer}
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => addToCart(item)}
            className="flex-1 py-2 bg-blue-600
            hover:bg-blue-700 text-white
            font-bold rounded-lg transition"
          >
            ➕
          </button>

          <button
            onClick={() => setSelected(item)}
            className="flex-1 py-2 border border-blue-600
            text-blue-900 font-bold rounded-lg
            hover:bg-blue-600 hover:text-white transition"
          >
            👁
          </button>
        </div>
      </div>

      {/* ================= QUICK VIEW MODAL ================= */}
      {selected && (
        <GiftboxQuickView
          giftbox={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
