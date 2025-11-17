import { useEffect, useState } from "react";
import BillCard from "./BillCard";
import api from "../../services/api"; // axios instance

export default function BillsGrid() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await api.get("/bills"); // backend URL
        setBills(res.data);
      } catch (err) {
        console.error("Failed to fetch bills:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading bills...</p>
      </div>
    );
  }

  if (!bills.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">No bills available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        All Bills
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bills.map((bill) => (
          <BillCard key={bill._id} bill={bill} />
        ))}
      </div>
    </div>
  );
}
