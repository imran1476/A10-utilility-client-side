import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaBolt } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="backdrop-blur-md bg-blue-900/80 shadow-md border-b border-blue-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <FaBolt className="text-yellow-300 text-3xl" />
          <span className="font-extrabold text-2xl text-white">UtilityBills</span>
        </Link>

        {/* NAVIGATION */}
        <div className="flex items-center gap-4">

          {/* MAIN TABS */}
          <div className="flex items-center gap-1">

            {/* Helper Component Style */}
            {(path, label) => null}

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 relative flex items-center rounded-lg transition-all ${
                  isActive
                    ? "text-white"
                    : "text-gray-200 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute inset-0  bg-slate-400 rounded-lg -z-10"></span>
                  )}
                  Home
                </>
              )}
            </NavLink>

            <NavLink
              to="/bills"
              className={({ isActive }) =>
                `px-4 py-2 relative flex items-center rounded-lg transition-all ${
                  isActive
                    ? "text-white"
                    : "text-gray-200 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute inset-0  bg-slate-400 rounded-lg -z-10"></span>
                  )}
                  Bills
                </>
              )}
            </NavLink>

            {user && (
              <NavLink
                to="/add-bill"
                className={({ isActive }) =>
                  `px-4 py-2 relative flex items-center rounded-lg transition-all ${
                    isActive
                      ? "text-white"
                      : "text-gray-200 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute inset-0 bg-slate-400 rounded-lg -z-10"></span>
                    )}
                    Add Bill
                  </>
                )}
              </NavLink>
            )}

            {user && (
              <NavLink
                to="/my-pay-bills"
                className={({ isActive }) =>
                  `px-4 py-2 relative flex items-center rounded-lg transition-all ${
                    isActive
                      ? "text-white"
                      : "text-gray-200 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute inset-0  bg-slate-400 rounded-lg -z-10"></span>
                    )}
                    My Pay Bills
                  </>
                )}
              </NavLink>
            )}

            {user && (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `px-4 py-2 relative flex items-center rounded-lg transition-all ${
                    isActive
                      ? "text-white"
                      : "text-gray-200 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute inset-0  bg-slate-400 rounded-lg -z-10"></span>
                    )}
                    Profile
                  </>
                )}
              </NavLink>
            )}
          </div>

          {/* LOGIN / LOGOUT */}
          {user ? (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
            >
              Logout
            </button>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
