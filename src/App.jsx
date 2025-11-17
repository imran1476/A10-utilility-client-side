import React from 'react';
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
  return (
    <div className="min-h-screen flex flex-col">
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
