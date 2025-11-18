import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-3">
            <img 
              src="https://i.ibb.co/93VZnyFG/Gemini-Generated-Image-drz815drz815drz8.png" 
              alt="UtilityBills Logo" 
              className="w-10 h-10 object-contain rounded-full"
            />
            <span className="text-2xl font-bold text-blue-500">UtilityBills</span>
          </Link>
          <p className="text-gray-300 text-sm">
            Easily manage your electricity, gas, water, and internet bills with a modern, secure, and responsive interface.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="text-gray-300 hover:text-blue-500 transition"><FaFacebookF /></a>
            <a href="#" className="text-gray-300 hover:text-blue-500 transition"><FaTwitter /></a>
            <a href="#" className="text-gray-300 hover:text-blue-500 transition"><FaLinkedinIn /></a>
            <a href="#" className="text-gray-300 hover:text-blue-500 transition"><FaInstagram /></a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Useful Links</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/bills" className="hover:text-blue-400 transition">Bills</Link></li>
            <li><Link to="/my-pay-bills" className="hover:text-blue-400 transition">My Pay Bills</Link></li>
            <li><Link to="/profile" className="hover:text-blue-400 transition">Profile</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Resources</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition">FAQ</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p className="text-gray-300 text-sm">Email: support@utilitybills.com</p>
          <p className="text-gray-300 text-sm">Phone: +880 1234 567 890</p>
          <p className="text-gray-300 text-sm">Address: Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        &copy; 2025 UtilityBills. All rights reserved.
      </div>
    </footer>
  );
}
