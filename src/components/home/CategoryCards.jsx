import React from "react";

export default function CategoryCards() {
  const categories = [
    { 
      name: "Electricity", 
      icon: "⚡", 
      bg: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    { 
      name: "Water", 
      icon: "💧", 
      bg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    { 
      name: "Gas", 
      icon: "🔥", 
      bg: "bg-red-100",
      iconColor: "text-red-600"
    },
    { 
      name: "Internet", 
      icon: "🌐", 
      bg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-12 text-center">
        Utility Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="
              rounded-2xl shadow-md bg-white 
              flex flex-col items-center justify-center text-center
              p-8 h-56 hover:shadow-lg hover:scale-105 transition cursor-pointer
            "
          >
            {/* Icon Section */}
            <div
              className={`${cat.bg} w-20 h-20 rounded-full flex items-center justify-center mb-4`}
            >
              <span className={`text-5xl ${cat.iconColor}`}>{cat.icon}</span>
            </div>

            {/* Name Section */}
            <h3 className="text-xl font-bold text-gray-700">
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
