import { useEffect, useState } from "react";
import api from "../../services/api"; // api.js import করলাম
import { Link } from "react-router-dom";

export default function RecentBills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentBills = async () => {
      try {
        const res = await api.get("/bills?limit=6"); // backend থেকে 6 টি recent bills
        setBills(res.data);
      } catch (err) {
        console.error("Error fetching bills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentBills();
  }, []);

  if (loading) return <p>Loading recent bills...</p>;

  if (bills.length === 0)
    return (
      <div className="mt-8 p-4 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-3">Recent Bills</h2>
        <p>No recent bills found</p>
      </div>
    );

  return (
    <div className="mt-8 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-3">Recent Bills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {bills.map((bill) => (
          <div key={bill._id} className="border p-3 rounded hover:shadow">
            <img
              src={bill.image || "/src/assets/sample-bill.jpg"}
              alt={bill.title}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="font-semibold">{bill.title}</h3>
            <p className="text-sm text-gray-600">{bill.category}</p>
            <p className="text-sm text-gray-600">{bill.location}</p>
            <p className="font-bold">{bill.amount} ৳</p>
            <Link
              to={`/bills/${bill._id}`}
              className="inline-block mt-2 text-blue-500 hover:underline"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
