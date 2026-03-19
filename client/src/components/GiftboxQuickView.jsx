import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function GiftboxQuickView({ giftbox, onClose }) {
  const { addToCart } = useContext(CartContext);
  const [activeImage, setActiveImage] = useState(
    giftbox?.mainImage
  );
  const [fullView, setFullView] = useState(false);

  if (!giftbox) return null;

  return (
    <>
      {/* ================= BACKDROP ================= */}
      <div
        className="fixed inset-0 z-50 bg-black/70
        flex items-center justify-center px-3 py-6 overflow-y-auto"
        onClick={onClose}
      >
        {/* ================= MODAL ================= */}
        <div
          className="relative bg-blue-500 border border-orange-400
          w-full max-w-6xl rounded-2xl p-4 md:p-6
          grid grid-cols-1 md:grid-cols-2 gap-6 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-2xl font-bold
            text-orange-400 hover:text-red-500"
          >
            ✕
          </button>

          {/* ================= IMAGE SECTION ================= */}
          <div className="flex flex-col">
            <img
              src={activeImage || "/placeholder.jpg"}
              alt={giftbox.name}
              onClick={() => setFullView(true)}
              className="w-full h-60 sm:h-72 md:h-80 object-cover rounded-xl
              shadow-lg cursor-zoom-in hover:scale-105 transition"
            />

            {/* SUB IMAGES */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {[giftbox.mainImage, ...(giftbox.subImages || [])].map(
                (img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    onClick={() => setActiveImage(img)}
                    className={`h-14 w-14 sm:h-16 sm:w-16 object-cover
                    rounded-lg cursor-pointer border-2 transition
                    ${
                      activeImage === img
                        ? "border-orange-400"
                        : "border-transparent"
                    }`}
                  />
                )
              )}
            </div>
          </div>

          {/* ================= DETAILS ================= */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl text-black sm:text-2xl md:text-2xl font-extrabold">
                {giftbox.name}
              </h2>

              <p className="text-white mt-1 text-sm sm:text-base">
                Category: {giftbox.category}
              </p>

              {/* PRICE */}
              <div className="flex gap-4 items-center my-4">
                {giftbox.offer && (
                  <span className="line-through text-blue-800 text-lg">
                    ₹{giftbox.price}
                  </span>
                )}
                <span className="text-orange-500 font-bold text-2xl sm:text-3xl">
                  ₹{giftbox.offer || giftbox.price}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm sm:text-base text-gray-100 mb-2 mt-8 leading-relaxed">
                
                  🎁 Make every celebration extra special with our Premium Gift Box Crackers. 
                  Beautifully packed and crafted for delight, each cracker contains a surprise 
                  gift, a fun message, and a festive snap to bring joy to any occasion. Perfect 
                  for holidays, parties, corporate gifting, or family gatherings, these crackers 
                  add a touch of excitement and elegance to your celebrations.
              </p>
            </div>

            {/* ACTION */}
            <button
              onClick={() => addToCart(giftbox)}
              className="w-full py-3 mb-4 bg-orange-400 hover:bg-orange-500
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
          className="fixed inset-0 z-[60] bg-black
          flex items-center justify-center px-4"
          onClick={() => setFullView(false)}
        >
          <img
            src={activeImage || "/placeholder.jpg"}
            alt="Full View"
            className="max-h-[90vh] max-w-full object-contain"
          />

          <button
            onClick={() => setFullView(false)}
            className="absolute top-4 right-5 text-3xl
            text-white hover:text-red-500"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
