import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [quickView, setQuickView] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const syncCart = updated => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    syncCart(cart.map(i => i._id === id ? { ...i, quantity: qty } : i));
  };

  const removeItem = id => {
    syncCart(cart.filter(i => i._id !== id));
  };

  const subtotal = cart.reduce((s, i) => s + i.offer * i.quantity, 0);
  const deliveryFee = cart.length === 0 ? 0 : subtotal > 2000 ? 0 : 100;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* ================= EMPTY CART ================= */}
        {cart.length === 0 && (
          <div className="flex flex-col items-center justify-center py-28">
            <p className="text-2xl text-gray-500 mb-4">
              Your cart is empty 🛒
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 bg-orange-400 text-black font-bold rounded-xl"
            >
              Start Shopping →
            </button>
          </div>
        )}

        {/* ================= CART CONTENT ================= */}
        {cart.length > 0 && (
          <>
            {/* TITLE */}
            <h2 className="text-3xl font-extrabold mb-8 text-orange-500">
              🛒 Your Cart ({cart.length})
            </h2>

            <div className="grid lg:grid-cols-3 gap-8">

              {/* ================= PRODUCTS ================= */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map(item => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row gap-4 bg-white border border-orange-400 rounded-xl p-4"
                  >
                    <img
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      onClick={() => setQuickView(item)}
                      className="w-full sm:w-28 h-28 rounded-xl object-cover cursor-pointer hover:opacity-80"
                    />

                    <div className="flex-1 ">
                      <h3 className="font-semibold text-lg text-black">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>

                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-orange-500 font-bold">
                          ₹{item.offer}
                        </span>
                        <span className="line-through text-gray-500">
                          ₹{item.price}
                        </span>
                      </div>

                      {/* QTY */}
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => updateQty(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-3 py-1 bg-orange-200 hover:bg-orange-500 text-black rounded font-bold"
                        >
                          −
                        </button>

                        <span className="font-bold text-black">{item.quantity}</span>

                        <button
                          onClick={() => updateQty(item._id, item.quantity + 1)}
                          className="px-3 py-1 bg-orange-400 hover:bg-orange-500 text-black rounded font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex sm:flex-col justify-around sm:items-end">
                      <p className="font-bold text-orange-400">
                        Total : ₹{item.offer * item.quantity}
                      </p>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-black/50 hover:text-black text-sm"
                      >
                        Remove ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ================= SUMMARY ================= */}
              <div className="bg-white border border-orange-400 rounded-2xl p-6 h-fit sticky top-24">
                <h3 className="text-xl text-black font-bold mb-4">📦 Order Summary</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between text-gray-500">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                  </div>

                  <hr className="border-orange-400/30 my-3" />

                  <div className="flex justify-between text-lg font-extrabold text-orange-400">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/placeorder")}
                  className="mt-6 w-full py-3 bg-orange-400 hover:bg-orange-500 text-black font-extrabold rounded-xl"
                >
                  Proceed to Place Order →
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ================= QUICK VIEW ================= */}
      {quickView && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1c0033] rounded-3xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setQuickView(null)}
              className="absolute top-4 right-4 text-xl"
            >
              ✕
            </button>

            <img
              src={quickView.image || "/placeholder.jpg"}
              className="w-full h-60 object-cover rounded-xl mb-4"
            />

            <h3 className="text-xl font-bold">{quickView.name}</h3>
            <p className="text-sm text-gray-400">{quickView.category}</p>
            <p className="text-orange-400 font-bold text-lg mt-2">
              ₹{quickView.offer}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
