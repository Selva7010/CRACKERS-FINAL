

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Api";
import { Link } from "react-router-dom";

export default function Register(){
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    name:"", 
    email:"", 
    password:"", 
  });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post("/register", form);
      if (!res.data.user) return setMsg("Registration failed");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMsg("🎉 Registered Successfully! Redirecting...");

      setTimeout(()=>navigate("/login"), 1000);

    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg 
        p-6 rounded-2xl shadow-lg border border-red-500">

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-center text-red-500 mb-3">
          🎇 Create Your Account
        </h1>

        {/* Sub Content */}
        <p className="text-center text-orange-400 mb-6 text-sm font-semibold">
          Join us and light up your Diwali celebrations with amazing crackers ✨
        </p>

        {/* Message */}
        {msg && (
          <p className="text-yellow-300 text-center font-medium mb-4">
            {msg}
          </p>
        )}

        {/* Form */}
        <form onSubmit={submit} className="space-y-4 ">

          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input 
              value={form.name} 
              onChange={e=>setForm({...form,name:e.target.value})} 
              placeholder="Enter your name" 
              className="w-full p-3 border rounded-lg border-black text-black"
              required 
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input 
              type="email" 
              value={form.email} 
              onChange={e=>setForm({...form,email:e.target.value})} 
              placeholder="Enter your email" 
              className="w-full p-3 border rounded-lg border-black text-black"
              required 
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input 
              type="password" 
              value={form.password} 
              onChange={e=>setForm({...form,password:e.target.value})} 
              placeholder="Create a strong password" 
              className="w-full p-3 border rounded-lg border-black text-black"
              required 
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Mobile Number</label>
              <input 
                value={form.mobile} 
                onChange={e=>setForm({...form,mobile:e.target.value})} 
                placeholder="Enter mobile number" 
                className="w-full p-3 border rounded-lg border-black text-black"
                required 
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Address</label>
              <input 
                value={form.address} 
                onChange={e=>setForm({...form,address:e.target.value})} 
                placeholder="Enter your address" 
                className="w-full p-3 border rounded-lg border-black text-black"
              />
            </div>
          </div>

          {/* Button */}
          <button 
            className="w-full py-3 bg-orange-400 hover:bg-orange-500 cursor-pointer font-bold rounded-lg"
          >
             Create Account
          </button>

        </form>

        {/* Login link */}
        <p className="text-center mt-6 text-sm text-red-500">
        Don't have an account?{" "}
        <Link to="/login" className="text-red-500 text-xl font-semibold  hover:underline">Login</Link>
      </p>
      </div>
    </div>
  );
}
