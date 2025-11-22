import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Bills from './pages/Bills';
import BillDetails from './pages/BillDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import MyPayBills from './pages/MyPayBills';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/common/PrivateRoute';
import AddBill from './pages/AddBill';

export default function App() {

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0f172a] text-black dark:text-white">

      {/* Toggle Button */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="fixed right-5 top-5 p-2 bg-gray-200 dark:bg-gray-700 rounded-md"
      >
        {theme === "light" ? "Dark" : "Light"}
      </button>

      <Navbar />

      <main className="flex-1 container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/bills/:id" element={<PrivateRoute><BillDetails /></PrivateRoute>} />
          <Route path="/add-bill" element={<PrivateRoute><AddBill /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-pay-bills" element={<PrivateRoute><MyPayBills /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
