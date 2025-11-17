import { Link } from "react-router-dom";

export default function BillCard({ bill }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-4 flex flex-col">
      {/* Bill Image */}
      <img
        src={bill.image}
        alt={bill.title}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />

      {/* Bill Info */}
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{bill.title}</h3>
        <p className="text-gray-500 text-sm mb-1">Category: {bill.category}</p>
        <p className="text-gray-500 text-sm mb-2">Location: {bill.location}</p>
        <p className="text-gray-800 font-semibold mb-4">Amount: ৳{bill.amount}</p>

        {/* See Details Button */}
        <Link
          to={`/bills/${bill._id}`}
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg transition font-medium"
        >
          See Details
        </Link>
      </div>
    </div>
  );
}
