import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import heroImg from "../../assets/img-2.jpg";
import flowerpot from "../../assets/flowerport.jpg";
import chakkar from "../../assets/chakkar.jpg";
import giftbox from "../../assets/giftbox.jpg";
import kids from "../../assets/kidscracker.jpg";
import rocket from "../../assets/rocket.jpg";
import spark from "../../assets/sparklers.jpg";

export default function Home() {

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      
      <div className="bg-sky-200 max-w-7xl mx-auto ">
      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-15 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block mb-4 px-4 py-1 rounded-lg bg-orange-500/20 text-orange-400 font-semibold tracking-wide">
            🎆 Diwali Mega Sale
          </span>

          <h1 className="text-2xl md:text-2xl text-black font-extrabold">
            Light Up Your
            <span className="text-orange-400"> Diwali </span>
            With Premium Crackers
          </h1>

          <p className="mt-5 text-gray-500 max-w-lg">
            Celebrate Diwali with safe, certified and colourful fireworks.
            Best prices, festival offers & fast doorstep delivery.
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              to="/products"
              className="px-2 py-2 bg-orange-400 text-black font-bold rounded-lg hover:bg-orange-500 "
            >
              🛒 Shop Now
            </Link>

            <Link
              to="/products"
              className="px-2 py-2 border border-orange-400 text-orange-400 rounded-lg hover:bg-orange-400 hover:text-black"
            >
              🔥 View Offers
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="absolute inset-0 bg-orange-400/30 blur-3xl rounded-full"></div>
          <img
            src={heroImg}
            alt="Diwali Crackers"
            className="relative z-10 rounded-2xl shadow-xl"
          />
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "🎆 Premium Quality",
              desc: "Certified, safe and eco-friendly fireworks for joyful celebrations."
            },
            {
              title: "🚚 Fast Delivery",
              desc: "Quick local delivery so your festival celebrations are never delayed."
            },
            {
              title: "💰 Festival Offers",
              desc: "Special Diwali discounts, combo packs and bulk savings."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white backdrop-blur border border-black p-6 rounded-xl hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold text-orange-400 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
<section className="max-w-7xl mx-auto px-6 py-15">
  <div className="text-center mb-10">
    <h2 className="text-2xl font-extrabold text-black">
      🎇 Explore Top Categories
    </h2>
    <p className="text-gray-500 mt-2">
      Choose your favourite fireworks & celebrate safely
    </p>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

    {/* Rockets */}
    <Link
      to="/products"
      className="group relative rounded-2xl overflow-hidden shadow-lg"
    >
      <img
        src={rocket}
        alt="Rockets"
        className="h-44 w-full object-cover group-hover:scale-110 transition duration-500"
      />
      <div className=" absolute inset-0 bg-black/50 group-hover:bg-black/60 transition"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h3 className="text-lg font-bold text-white">Rockets</h3>
        
      </div>
    </Link>

    {/* Sparklers */}
    <Link
      to="/products"
      className="group relative rounded-2xl overflow-hidden shadow-lg"
    >
      <img
        src={spark}
        alt="Sparklers"
        className="h-44 w-full object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h3 className="text-lg font-bold text-white">Sparklers</h3>
        {/* <span className="text-sm text-orange-400">25 Products</span> */}
      </div>
    </Link>

    {/* Gift Box */}
    <Link
      to="/products"
      className="group relative rounded-2xl overflow-hidden shadow-lg"
    >
      <img
        src={giftbox}
        alt="Gift Box"
        className="h-44 w-full object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h3 className="text-lg font-bold text-white">Gift Box</h3>
        {/* <span className="text-sm text-orange-400">5 Products</span> */}
      </div>
    </Link>

    {/* Chakkars */}
    <Link
      to="/products"
      className="group relative rounded-2xl overflow-hidden shadow-lg"
    >
      <img
        src={chakkar}
        alt="Chakkars"
        className="h-44 w-full object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h3 className="text-lg font-bold text-white">Chakkars</h3>
        {/* <span className="text-sm text-orange-400">9 Products</span> */}
      </div>
    </Link>

    {/* Flower Pots */}
    <Link
      to="/products"
      className="group relative rounded-2xl overflow-hidden shadow-lg"
    >
      <img
        src={flowerpot}
        alt="Flower Pots"
        className="h-44 w-full object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h3 className="text-lg font-bold text-white">Flower Pots</h3>
        {/* <span className="text-sm text-orange-400">8 Products</span> */}
      </div>
    </Link>

    {/* Kids Special */}
    <Link
      to="/products"
      className="group relative rounded-2xl overflow-hidden shadow-lg"
    >
      <img
        src={kids}
        alt="Kids Special"
        className="h-44 w-full object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h3 className="text-lg font-bold text-white">Kids Special</h3>
        {/* <span className="text-sm text-orange-400">18 Products</span> */}
      </div>
    </Link>

  </div>
</section>



      {/* ================= CTA ================= */}
      <section className="text-center py-2">
        <h2 className="text-2xl text-black md:text-2xl font-extrabold">
          Make This Diwali
          <span className="text-orange-400"> Brighter ✨</span>
        </h2>

        <p className="text-gray-500 mt-4">
          Order today and celebrate safely with your loved ones.
        </p>

        <Link
          to="/products"
          className="inline-block mt-4 px-4 py-2 bg-orange-400 text-black font-bold rounded-lg hover:bg-orange-500 transition"
        >
          Start Shopping
        </Link>
      </section>
      </div>
      <Footer />
    </div>
  );
}
