import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Api";
import Navbar from "../../components/Navbar";
import CrackerCard from "../../components/CrackerCard";
import GiftBoxCard from "../../components/GiftBoxCard";
import Footer from "../../components/Footer";

const ITEMS_PER_PAGE = 8;

export default function Products() {
  const navigate = useNavigate();

  const [crackers, setCrackers] = useState([]);
  const [giftboxes, setGiftboxes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(3000);
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const crackersRes = await Api.get("/crackers");
    const giftboxRes = await Api.get("/giftbox");
    setCrackers(crackersRes.data);
    setGiftboxes(giftboxRes.data);
  };

  /* ================= FILTER ================= */
  const filterFn = (item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "all" || item.category === category) &&
    item.price <= price;

  let allProducts = [
    ...crackers.filter(filterFn).map(p => ({ ...p, type: "cracker" })),
    ...giftboxes.filter(filterFn).map(p => ({ ...p, type: "giftbox" }))
  ];

  /* ================= SORT ================= */
  if (sort === "low-high") allProducts.sort((a, b) => a.offer - b.offer);
  if (sort === "high-low") allProducts.sort((a, b) => b.offer - a.offer);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = allProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  /* ================= UNIQUE CATEGORIES ================= */
  const categories = [
    "all",
    ...new Set([...crackers, ...giftboxes].map(p => p.category))
  ];

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto bg-sky-200 min-h-screen">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center">
            🎆 Our Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {/* ================= FILTER ================= */}
            <div className="bg-white rounded-xl shadow p-5 space-y-6">
              <div>
                <label className="font-semibold text-orange-500 block mb-1">
                  Search
                </label>
                <input
                  type="text"
                  className="border rounded-lg p-2 w-full"
                  placeholder="Search products..."
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>

              <div>
                <label className="font-semibold text-orange-500 block mb-1">
                  Category
                </label>
                <select
                  className="border rounded-lg p-2 w-full"
                  value={category}
                  onChange={e => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                >
                  {categories.map(c => (
                    <option key={c} value={c}>
                      {c.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-orange-500 block mb-1">
                  Sort by Price
                </label>
                <select
                  className="border rounded-lg p-2 w-full"
                  value={sort}
                  onChange={e => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="default">Default</option>
                  <option value="low-high">Low → High</option>
                  <option value="high-low">High → Low</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">
                  Max Price: ₹{price}
                </label>
                <input
                  type="range"
                  min="10"
                  max="3000"
                  value={price}
                  onChange={e => {
                    setPrice(Number(e.target.value));
                    setPage(1);
                  }}
                  className="w-full"
                />
              </div>
            </div>

            {/* ================= PRODUCTS GRID ================= */}
            <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map(item =>
                  item.type === "cracker" ? (
                    <CrackerCard key={item._id} item={item} />
                  ) : (
                    <GiftBoxCard key={item._id} item={item} />
                  )
                )
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No products found
                </p>
              )}
            </div>
          </div>

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8 flex-wrap">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-xl font-semibold ${
                    page === i + 1
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* ================= DESKTOP CART BUTTON ================= */}
      <div className="hidden md:flex justify-center py-4">
        <button
          onClick={() => navigate("/cart")}
          className="bg-orange-500 hover:bg-orange-600
          text-white font-bold px-6 py-3 rounded-xl shadow-lg"
        >
          🛒 Go to Cart
        </button>
      </div>
      </div>

      {/* ================= MOBILE CART BUTTON ================= */}
      <div className="fixed bottom-0 left-0 right-0 bg-white
        border-t shadow-md p-3 flex justify-center md:hidden z-50">
        <button
          onClick={() => navigate("/cart")}
          className="bg-orange-500 hover:bg-orange-600
          text-white font-bold px-6 py-3 rounded-xl w-full max-w-md"
        >
          🛒 Go to Cart
        </button>
      </div>

      

      <Footer />
    </>
  );
}
