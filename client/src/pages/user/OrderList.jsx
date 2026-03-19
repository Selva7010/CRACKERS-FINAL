import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function OrderList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await Api.get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CANCEL ORDER ================= */
  const cancelOrder = async (id) => {
    if (!window.confirm("Cancel this order?")) return;

    try {
      setProcessingId(id);
      const token = localStorage.getItem("token");

      await Api.put(
        `/orders/${id}/status`,
        { orderStatus: "Cancelled" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchOrders();
    } catch (error) {
      alert("Failed to cancel order",error);
    } finally {
      setProcessingId(null);
    }
  };

  /* ================= REMOVE ORDER ================= */
  const removeOrder = async (id) => {
    if (!window.confirm("⚠️ This will permanently remove the order. Continue?")) return;

    try {
      setProcessingId(id);
      const token = localStorage.getItem("token");

      await Api.delete(`/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(prev => prev.filter(o => o._id !== id));
    } catch (error) {
      alert("Failed to remove order",error);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          📦 My Orders
        </h2>

        {loading && <p className="text-center">Loading orders...</p>}

        {!loading && orders.length === 0 && (
          <p className="text-center text-gray-500">No orders found</p>
        )}

        <div className="grid gap-4">
          {orders.map(order => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow
              p-4 sm:p-5 flex flex-col sm:flex-row
              sm:items-center sm:justify-between gap-4"
            >
              {/* LEFT */}
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/order/${order._id}`)}
              >
                <p className="font-semibold text-sm sm:text-base">
                  Order ID:
                  <span className="text-gray-500 ml-1">
                    {order._id.slice(-6)}
                  </span>
                </p>

                <p className="mt-1 text-gray-700">
                  Total: ₹{order.totalPrice}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full
                  text-xs sm:text-sm font-semibold
                  ${
                    order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.orderStatus === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-2 justify-end">
                <button
                  onClick={() => navigate(`/order/${order._id}`)}
                  className="px-4 py-2 rounded-lg text-sm
                  border border-blue-500 text-blue-600
                  hover:bg-blue-500 hover:text-white transition"
                >
                  View
                </button>

                {order.orderStatus === "Pending" && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    disabled={processingId === order._id}
                    className="px-4 py-2 rounded-lg text-sm
                    bg-orange-500 text-white hover:bg-orange-600
                    disabled:opacity-50"
                  >
                    Cancel
                  </button>
                )}

                {order.orderStatus === "Cancelled" && (
                  <button
                    onClick={() => removeOrder(order._id)}
                    disabled={processingId === order._id}
                    className="px-4 py-2 rounded-lg text-sm
                    bg-red-600 text-white hover:bg-red-700
                    disabled:opacity-50"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
