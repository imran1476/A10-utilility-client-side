import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/common/Spinner";

export default function Home() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recent 6 bills
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bills?limit=6"); // Backend URL ঠিক করো
        const data = await res.json();

        // যদি backend response array হয়
        setBills(data);

        // যদি backend response object হয় { bills: [...] }
        // setBills(data.bills);

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch bills:", err);
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  return (
    <div className="w-full bg-gray-50">

      {/* --------------------- HERO CAROUSEL --------------------- */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl">
          <div
            className="absolute inset-0 bg-cover bg-center animate-[slide_14s_infinite]"
            style={{ backgroundImage: "url('https://i.ibb.co.com/bMvLGm2w/Gemini-Generated-Image-wargu9wargu9warg.png')" }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg text-center">
              Manage Your Utility Bills Easily
            </h1>
          </div>
        </div>

        {/* Carousel Animation */}
        <style>
          {`
            @keyframes slide {
              0% { background-image: url('https://i.ibb.co.com/kV01YhHr/Gemini-Generated-Image-wuvtkbwuvtkbwuvt.png'); }
              33% { background-image: url('https://i.ibb.co.com/QvFhNxn4/Gemini-Generated-Image-es6oe1es6oe1es6o.png'); }
              66% { background-image: url('https://i.ibb.co.com/zHBw6Qws/Gemini-Generated-Image-ahloczahloczahlo.png'); }
              100% { background-image: url('https://i.ibb.co.com/hR42Hg4q/Gemini-Generated-Image-23il7c23il7c23il.png'); }
            }
          `}
        </style>
      </section>

      {/* --------------------- CATEGORY SECTION --------------------- */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Utility Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Electricity", icon: "⚡" },
            { name: "Gas", icon: "🔥" },
            { name: "Water", icon: "💧" },
            { name: "Internet", icon: "🌐" },
          ].map((cat, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-8 text-center"
            >
              <div className="text-5xl mb-4">{cat.icon}</div>
              <h3 className="text-xl font-bold text-gray-700">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------- RECENT BILLS SECTION --------------------- */}
      <section className="max-w-7xl mx-auto px-4 py-12 bg-white shadow rounded-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Recent Bills
        </h2>

        {loading ? (
          <div className="flex justify-center py-6"><Spinner /></div>
        ) : bills.length === 0 ? (
          <p className="text-center text-gray-600 py-6">No bills found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {bills.map((bill) => (
              <div
                key={bill._id}
                className="bg-gray-100 rounded-xl shadow hover:shadow-xl transition p-4 flex flex-col"
              >
                <img
                  src={bill.image || "/src/assets/sample-bill.jpg"}
                  alt={bill.title}
                  className="h-40 w-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800 truncate">{bill.title}</h3>
                <p className="text-gray-600 truncate">Category: {bill.category}</p>
                <p className="text-gray-600 truncate">Location: {bill.location}</p>
                <p className="text-gray-700 font-semibold mt-2">Amount: ৳{bill.amount}</p>

                <Link
                  to={`/bills/${bill._id}`}
                  className="block text-center mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                  See Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --------------------- FEATURES SECTION --------------------- */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Fast & Secure Payments",
              text: "Pay your utility bills instantly with secure encryption.",
              icon: "💳",
            },
            {
              title: "Manage All Bills in One Place",
              text: "Track electricity, gas, water & internet bills easily.",
              icon: "📊",
            },
            {
              title: "Download PDF Reports",
              text: "Get detailed billing reports anytime.",
              icon: "📄",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-8 rounded-2xl text-center hover:shadow-xl transition"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------- WHY CHOOSE US SECTION --------------------- */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src="https://i.ibb.co.com/DfX1Nr4x/Whats-App-Image-2025-11-18-at-2-51-29-PM.jpg"
            alt="billing"
            className="w-full md:w-1/2 rounded-2xl shadow-lg"
          />
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-5">
              Why Choose Our Utility Bill System?
            </h2>
            <ul className="space-y-4 text-lg text-gray-600">
              <li>✔ Fast bill tracking & history</li>
              <li>✔ Safe & secure payment processing</li>
              <li>✔ Easy to update & manage bills</li>
              <li>✔ Clean, modern & responsive design</li>
              <li>✔ Optimized for mobile & desktop</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
