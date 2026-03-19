
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Api";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  //Submit handler
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post("/login", form);
      if (!res.data.token) return setMsg("Login failed");

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMsg("Login Successfully!");
      //Navigate to Home page
      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl  border border-black">

    {/* Main Heading */}
      <h1 className="text-3xl font-extrabold text-center 
      text-red-500 mb-2">
      🎇 Welcome Back
      </h1>

    {/* Subtitle */}
      <p className="text-center text-orange-400 mb-6 text-sm">
      Login to light up your Diwali shopping journey ✨
      </p>

    {/* Message */}
      {msg && (
      <p className="text-green-500 text-center font-medium mb-4">
        {msg}
      </p>
      )}

    {/* Form */}
      <form onSubmit={submit} className="space-y-4">

      {/* Email */}
        <div>
          <label className="block text-black mb-1 font-medium">
            Email Address
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg border-black text-black"
              required
            />
          </div>

      {/* Password */}
        <div>
        <label className="block mb-1 font-medium">
          Password
        </label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Enter your password"
          className="w-full p-3 border rounded-lg border-black text-black"
            required
          />
          </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full py-3 bg-orange-400 hover:bg-orange-500 cursor-pointer font-bold rounded-lg"
        >
        Login
      </button>
      </form>

      {/* Sign up Link */}
      <p className="text-center mt-6 text-sm text-red-500">
        Don't have an account?{" "}
        <Link to="/register" className="text-red-500 text-xl font-semibold  hover:underline">Sign up</Link>
      </p>
    
     </div>
    </div>
  );
};
