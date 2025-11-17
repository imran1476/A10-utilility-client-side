export default function CategoryCards() {
  const items = ["Electricity", "Water", "Gas", "Internet"];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {items.map((item) => (
        <div key={item} className="p-6 bg-white shadow rounded text-center">
          {item}
        </div>
      ))}
    </div>
  );
}
