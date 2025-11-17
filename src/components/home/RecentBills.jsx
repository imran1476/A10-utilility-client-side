import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function RecentBills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentBills = async () => {
      try {
        const res = await api.get("/bills?limit=6");
        setBills(res.data);
      } catch (err) {
        console.error("Error fetching bills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentBills();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500">Loading recent bills...</p>
      </div>
    );

  if (bills.length === 0)
    return (
      <div className="mt-8 p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-3">Recent Bills</h2>
        <p className="text-gray-500">No recent bills found</p>
      </div>
    );

  return (
    <section className="mt-12 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Recent Bills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bills.map((bill) => (
          <div
            key={bill._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div className="relative w-full h-48 md:h-40">
              <img
                src={bill.image || "/src/assets/sample-bill.jpg"}
                alt={bill.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-1">
                {bill.title}
              </h3>
              <p className="text-sm text-gray-500">{bill.category}</p>
              <p className="text-sm text-gray-500">{bill.location}</p>
              <p className="mt-2 font-bold text-gray-800">{bill.amount} ৳</p>
              <Link
                to={`/bills/${bill._id}`}
                className="block mt-4 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
