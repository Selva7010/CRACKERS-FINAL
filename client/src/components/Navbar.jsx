import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/bird.jpg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  /* LOAD USER */
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  /* LOAD CART COUNT */
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className=" max-w-7xl mx-auto bg-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/home" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-7 w-10 rounded-lg" />
          <h1 className="font-bold text-orange-400">
            RUDHRAKS CRACKERS SHOP
          </h1>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10 font-semibold">

          {user && <span className="text-blue-400">👤 {user.name}</span>}

          <Link to="/products" className="text-orange-500 hover:text-orange-600">
            Products
          </Link>

          <Link to="/orders" className="text-orange-500 hover:text-orange-600">
            Orders
          </Link>

          {/* CART */}
          <Link to="/cart" className="relative text-orange-500 text-xl">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <button onClick={logout} className="text-red-500 cursor-pointer">
            Logout
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-orange-500 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-black px-6 py-4 space-y-4">
          <Link to="/products" onClick={() => setMenuOpen(false)} className="block text-orange-500">
            Products
          </Link>

          <Link to="/orders" onClick={() => setMenuOpen(false)} className="block text-orange-500">
            Orders
          </Link>

          <Link to="/cart" onClick={() => setMenuOpen(false)} className="block text-orange-500">
            🛒 Cart ({cartCount})
          </Link>

          <button onClick={logout} className="text-red-500 ">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
