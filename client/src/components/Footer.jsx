import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" max-w-7xl mx-auto bg-black text-gray-300 ">
      <div className="max-w-7xl mx-auto px-6 py-8 grid gap-10 md:grid-cols-4">

        {/* COMPANY DESCRIPTION */}
        <div>
          <h2 className="text-xl font-bold text-orange-500 mb-3">
            🎆 RudhRaks Crackers
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            RudhRaks Crackers is your trusted online store for premium-quality 
            fireworks and festive essentials. We ensure safe, eco-friendly 
            celebrations delivered right to your doorstep.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-orange-500 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm ">
            <li>
              <Link to="/home" className="hover:text-yellow-400 hover:underline transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-yellow-400 hover:underline transition">
                Crackers
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-yellow-400 hover:underline transition">
                My Cart
              </Link>
            </li>
            
            <li>
              <Link to="/admin/login" className="hover:text-yellow-400 hover:underline transition">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY DETAILS */}
        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-3">
            Contact Us
          </h3>
          <ul className="text-sm space-y-2 text-gray-400">
            <li>📍 Erode, Tamil Nadu, India</li>
            <li>📞 +91 96558 32293</li>
            <li>✉️ support@rudhrakscrackers.com</li>
            <li>🕒 Mon – Sat : 9:00 AM – 9:00 PM</li>
          </ul>
        </div>

        {/* GOOGLE MAP */}
        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-3">
            Our Location
          </h3>
          <div className="rounded-lg overflow-hidden border border-gray-600">
            <iframe
              title="company-location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56666.218557537235!2d77.60225158177356!3d11.214388318585375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba973d1f37ab941%3A0xba7459e0fabb982f!2sThenmugam%20Vellode%2C%20Tamil%20Nadu!5e1!3m2!1sen!2sin!4v1768247624234!5m2!1sen!2sin"
              className="w-full h-40 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Rudhraks Crackers. All Rights Reserved. ✨  
        <div className="mt-1 text-yellow-400 animate-pulse">
          Celebrate Safely & Responsibly 🎇
        </div>
      </div>
    </footer>
  );
}
