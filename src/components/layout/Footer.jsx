import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h1 className="text-2xl font-bold text-blue-500 mb-3">UtilityBills</h1>
          <p className="text-gray-300">
            Manage your electricity, gas, water, and internet bills easily with a modern and responsive interface.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Useful Links</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">Home</Link>
            </li>
            <li>
              <Link to="/bills" className="hover:text-blue-400 transition">Bills</Link>
            </li>
            <li>
              <Link to="/my-pay-bills" className="hover:text-blue-400 transition">My Pay Bills</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-blue-400 transition">Profile</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p className="text-gray-300">Email: support@utilitybills.com</p>
          <p className="text-gray-300">Phone: +880 1234 567 890</p>
          <p className="text-gray-300">Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; 2025 Utility Bill System. All rights reserved.
      </div>
    </footer>
  );
}
