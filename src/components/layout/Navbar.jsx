import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const navLinks = [
    { to: "/", label: "Home", auth: false },
    { to: "/bills", label: "Bills", auth: false },
    { to: "/add-bill", label: "Add Bill", auth: true },
    { to: "/my-pay-bills", label: "My Pay Bills", auth: true },
    { to: "/profile", label: "Profile", auth: true },
  ];

  return (
    <nav className="backdrop-blur-md bg-blue-900/80 dark:bg-slate-900/80 shadow-md border-b border-blue-700 dark:border-slate-700 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="https://i.ibb.co/93VZnyFG/Gemini-Generated-Image-drz815drz815drz8.png"
            alt="UtilityBills Logo" 
            className="w-8 h-8 object-contain rounded-full"
          />
          <span className="font-extrabold text-2xl text-white">
            Utility Bills
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map(link => 
            (!link.auth || (link.auth && user)) && (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 relative flex items-center rounded-lg transition-all ${
                    isActive ? "text-white" : "text-gray-200 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && <span className="absolute inset-0 bg-slate-400 rounded-lg -z-10"></span>}
                    {link.label}
                  </>
                )}
              </NavLink>
            )
          )}

          {/* Dark/Light Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md transition-all duration-200"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </motion.button>

          {user ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
            >
              Logout
            </motion.button>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} className="flex gap-2">
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white shadow"
                >
                  Register
                </NavLink>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white text-2xl">
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-blue-900/90 dark:bg-slate-900/90 border-t border-blue-700 dark:border-slate-700 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-2">

              {/* Mobile Dark Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md transition-all duration-200 w-full mb-2"
              >
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
              </motion.button>

              {navLinks.map(link =>
                (!link.auth || (link.auth && user)) && (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-2 relative flex items-center rounded-lg transition-all ${
                        isActive ? "text-white" : "text-gray-200 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && <span className="absolute inset-0 bg-slate-400 rounded-lg -z-10"></span>}
                        {link.label}
                      </>
                    )}
                  </NavLink>
                )
              )}

              {user ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow mt-2"
                >
                  Logout
                </motion.button>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow mt-2"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white shadow mt-2"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
