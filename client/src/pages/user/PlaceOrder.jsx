import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PlaceOrder() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    door: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem("cart")) || [];
    if (c.length === 0) navigate("/cart");
    setCart(c);
  }, [navigate]);

  /* ================= PRICE CALC ================= */
  const subtotal = cart.reduce(
    (sum, i) => sum + i.offer * i.quantity,
    0
  );

  const deliveryFee = subtotal >= 2000 ? 0 : 100;
  const totalPrice = subtotal + deliveryFee;

  /* ================= PLACE ORDER ================= */
  const placeOrder = async () => {
    const { name, mobile, door, street, city, state, pincode } = customer;

    if (!name || !mobile || !door || !street || !city || !state || !pincode) {
      alert("Please fill all Customer details!");
      return;
    }

    const payload = {
      customer_name: name,
      customer_mobileNo: mobile,
      customer_address: `${door}, ${street}, ${city}, ${state} - ${pincode}`,
      paymentMethod,
      totalPrice,
      crackers_list: cart.map(i => ({
        productId: i._id,
        name: i.name,
        quantity: i.quantity,
        price: i.offer,
        image: i.image
      }))
    };

    const res = await Api.post("/orders", payload);

    localStorage.removeItem("cart");
    navigate(`/ordersuccess/${res.data._id}`);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">

        {/* ================= CUSTOMER FORM ================= */}
        <div className="border p-6 rounded-xl shadow space-y-5">
          <h2 className="text-xl font-bold text-blue-600">
            👤 Customer Details
          </h2>

          {/* NAME */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              Full Name
            </label>
            <input
              placeholder="Ex. Kannan"
              className="w-full p-3 border rounded"
              onChange={e =>setCustomer({ ...customer, name: e.target.value })}
            />
          </div>

          {/* MOBILE */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              Mobile Number
            </label>
            <input
              placeholder="Ex. 9876543210"
              className="w-full p-3 border rounded"
              maxLength={10}
              onChange={e =>
                setCustomer({ ...customer, mobile: e.target.value })
              }
            />
          </div>

          {/* DOOR + STREET (PARALLEL) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 font-medium">
                Door No
              </label>
              <input
                placeholder="Ex. No.1"
                className="w-full p-3 border rounded"
                onChange={e =>
                  setCustomer({ ...customer, door: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium">
                Street / Area
              </label>
              <input
                placeholder="Ex. Anna Nagar"
                className="w-full p-3 border rounded"
                onChange={e =>
                  setCustomer({ ...customer, street: e.target.value })
                }
              />
            </div>
          </div>

          {/* CITY + STATE + PINCODE (3 PARALLEL) */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1 font-medium">
                City / Town
              </label>
              <input
                placeholder="Ex. Chennai"
                className="w-full p-3 border rounded"
                onChange={e =>
                  setCustomer({ ...customer, city: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium">
                State
              </label>
              <input
                placeholder="Ex. Tamilnadu"
                className="w-full p-3 border rounded"
                onChange={e =>
                  setCustomer({ ...customer, state: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium">
                Pincode
              </label>
              <input
                placeholder="Ex. 638001"
                className="w-full p-3 border rounded"
                maxLength={6}
                onChange={e =>
                  setCustomer({ ...customer, pincode: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div className="border p-6 rounded-xl shadow space-y-6">
          <h2 className="text-xl font-bold text-blue-600">
            🧾 Order Summary
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-bold text-orange-500">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="space-y-3">
            {["COD", "GPay", "PhonePe"].map(p => (
              <label
                key={p}
                className={`flex items-center gap-3 p-3 border rounded cursor-pointer
                  ${paymentMethod === p && "border-orange-400 bg-orange-50"}`}
              >
                <input
                  type="radio"
                  checked={paymentMethod === p}
                  onChange={() => setPaymentMethod(p)}
                />
                {p}
              </label>
            ))}
          </div>

          <button
            onClick={placeOrder}
            className="w-full py-3 bg-orange-400 hover:bg-orange-500 text-black font-bold rounded"
          >
            Place Order
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
