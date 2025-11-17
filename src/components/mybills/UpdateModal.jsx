import React, { useState, useEffect } from "react";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import api from "../../services/api";

export default function UpdateModal({ open, onClose, bill, onUpdated }) {
  const [formData, setFormData] = useState({
    amount: "",
    address: "",
    phone: "",
    date: "",
  });

  useEffect(() => {
    if (bill) {
      setFormData({
        amount: bill.amount || "",
        address: bill.address || "",
        phone: bill.phone || "",
        date: bill.date || "",
      });
    }
  }, [bill]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/my-bills/${bill._id}`, formData);
      onUpdated(res.data); // Update parent state
      onClose();
      alert("Bill updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating bill");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Update Bill</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Amount:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full mb-3 border px-3 py-2 rounded"
          required
        />

        <label className="block mb-2 font-medium">Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full mb-3 border px-3 py-2 rounded"
          required
        />

        <label className="block mb-2 font-medium">Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full mb-3 border px-3 py-2 rounded"
          required
        />

        <label className="block mb-2 font-medium">Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full mb-4 border px-3 py-2 rounded"
          required
        />

        <div className="flex justify-end gap-2">
          <Button type="submit">Save</Button>
          <Button
            className="bg-gray-400 hover:bg-gray-500"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
