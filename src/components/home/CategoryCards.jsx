import React from "react";

export default function CategoryCards() {
  const categories = [
    { name: "Electricity", icon: "⚡" },
    { name: "Water", icon: "💧" },
    { name: "Gas", icon: "🔥" },
    { name: "Internet", icon: "🌐" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Utility Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white shadow-md hover:shadow-xl transform hover:scale-105 transition rounded-xl p-8 flex flex-col items-center justify-center"
          >
            <div className="text-5xl mb-4">{cat.icon}</div>
            <h3 className="text-xl font-bold text-gray-700">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
