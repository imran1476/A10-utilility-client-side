import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function AddBill() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    email: "",
    location: "",
    description: "",
    amount: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/bills", form);
      toast.success("Bill Added Successfully!");
      setForm({
        title: "",
        category: "",
        email: "",
        location: "",
        description: "",
        amount: "",
        image: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add bill!");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Bill</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-3 bg-white p-5 shadow rounded"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Add Bill
        </button>
      </form>
    </div>
  );
}
