import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen ">
      <Navbar />

      <div className="flex flex-col items-center justify-center py-32 text-center">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-4">
          🎉 Order Placed Successfully
        </h1>

        <p className="text-gray-500 mb-8">
          Your order has been placed and will be delivered soon.
        </p>

        <button
          onClick={() => navigate(`/order/${id}`)}
          className="px-6 py-3 bg-orange-400 hover:bg-orange-500 text-black font-bold rounded-xl"
        >
          View Order
        </button>
      </div>

      <Footer />
    </div>
  );
}
