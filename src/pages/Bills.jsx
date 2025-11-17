import { useEffect, useState } from "react";
import api from "../services/api";
import Spinner from "../components/common/Spinner";

export default function Bills() {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch bills from API
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await api.get("/bills");
        setBills(res.data);
        setFilteredBills(res.data);

        const cats = [...new Set(res.data.map((b) => b.category))];
        setCategories(cats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, []);

  // Filter bills by category and search
  useEffect(() => {
    let temp = [...bills];
    if (selectedCategory) temp = temp.filter((b) => b.category === selectedCategory);
    if (search) temp = temp.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBills(temp);
  }, [selectedCategory, search, bills]);

  if (loading) return <Spinner />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Bills</h1>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search bills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/3 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Bills Grid */}
      {filteredBills.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No bills found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBills.map((bill) => (
            <div
              key={bill._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={bill.image || "/src/assets/sample-bill.jpg"}
                alt={bill.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{bill.title}</h3>
                <p className="text-sm text-gray-500 mb-1">{bill.category} | {bill.location}</p>
                <p className="text-md font-bold text-gray-700 mb-2">৳ {bill.amount}</p>
                <a
                  href={`/bills/${bill._id}`}
                  className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
