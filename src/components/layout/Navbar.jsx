import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-blue-600">
          UtilityBills
        </Link>
        <div className="flex items-center gap-4">
          <NavLink to="/" end className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}>Home</NavLink>
          <NavLink to="/bills" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}>Bills</NavLink>
          {user && <NavLink to="/add-bill" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}>Add Bill</NavLink>}
          {user ? (
            <>
              <NavLink to="/my-pay-bills" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}>My Pay Bills</NavLink>
              <NavLink to="/profile" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}>Profile</NavLink>
              <button onClick={logout} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}>Login</NavLink>
              <NavLink to="/register" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}>Register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
