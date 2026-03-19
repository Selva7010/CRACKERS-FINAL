
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Api from "../../Api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function OrderView() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await Api.get(`/orders/${id}`);
      setOrder(res.data);
    } catch (error) {
      setError("Invalid Order ID",error);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading order...
      </div>
    );
  }

  /* ================= CALCULATIONS ================= */
  const subtotal = order.crackers_list.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const deliveryFee = subtotal >= 2000 ? 0 : 100;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-orange-500">
          Order Details
        </h2>

        {/* CUSTOMER DETAILS */}
        <div className="border p-6 rounded-xl shadow">
          <h3 className="font-bold text-orange-500 mb-2">
            👤 Customer Details
          </h3>
          <p><b>Name:</b> {order.customer_name}</p>
          <p><b>Mobile:</b> {order.customer_mobileNo}</p>
          <p><b>Address:</b> {order.customer_address}</p>
          <p className="text-lg font-bold text-blue-500 mt-2">
            Order Status: {order.orderStatus}
</p>

        </div>

        {/* PRODUCT TABLE */}
        <div className="border p-6 rounded-xl shadow">
          <h3 className="font-bold text-orange-500 mb-6">
            👜 Product Details
          </h3>

          {/* HEADER */}
          <div className="grid grid-cols-5 font-bold text-blue-500 border-b pb-2 mb-3 text-sm">
            <span>Product</span>
            <span>Image</span>
            <span>Qty</span>
            <span>Price</span>
            <span>Subtotal</span>
          </div>

          {/* ROWS */}
          {order.crackers_list.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-5 items-center text-sm border-b  py-2"
            >
              <span className="font-semibold">{p.name}</span>
               <img
                src={p.image}
                alt={p.name}
                className="w-12 h-12 rounded cursor-pointer"
                onClick={() => window.open(p.image, "_blank")}
              />
              <span>{p.quantity}</span>
              <span>₹{p.price}</span>
              <span className="text-orange-500 font-bold">
                ₹{p.price * p.quantity}
              </span>
             
            </div>
          ))}

          {/* SUMMARY */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-end gap-4">
              <span>Subtotal:</span>
              <span className="font-bold">₹{subtotal}</span>
            </div>

            <div className="flex justify-end gap-4">
              <span>Delivery Fee:</span>
              <span className="font-bold">
                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
              </span>
            </div>

            <div className="flex justify-end gap-4 text-lg font-extrabold">
              <span>Total:</span>
              <span className="text-orange-500">₹{grandTotal}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
