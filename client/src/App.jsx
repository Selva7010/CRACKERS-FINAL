import { Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";


/* USER */
import Products from "./pages/user/Products";
import Cart from "./pages/user/Cart";



import Home from "./pages/user/Home";
import PlaceOrder from "./pages/user/PlaceOrder";
import OrderView from "./pages/user/OrderView";
import OrderSuccess from "./pages/user/OrderSuccess";
import OrderList from "./pages/user/OrderList";
// import OrderList from "./pages/user/OrderList";


export default function App() {
  return (
    <Routes>
      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* USER AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* USER */}
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/placeorder" element={<PlaceOrder />} />
      <Route path="/ordersuccess/:id" element={<OrderSuccess />} />
      <Route path="/order/:id" element={<OrderView />} />
      <Route path="/orders" element={<OrderList />} />
      {/* <Route path="/orders" element={<OrderList />} /> */}
      
      {/* FALLBACK */}
      <Route path="*" element={<h1 className="p-10">404 Page Not Found</h1>} />
    </Routes>
  );
}
