import { useEffect, useState } from "react";
import api from "../services/api";
import BillsGrid from "../components/bills/BillsGrid";
import FilterBar from "../components/bills/FilterBar";
import Spinner from "../components/common/Spinner";

export default function Bills() {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (selectedCategory === "") setFilteredBills(bills);
    else setFilteredBills(bills.filter((b) => b.category === selectedCategory));
  }, [selectedCategory, bills]);

  if (loading) return <Spinner />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Bills</h1>
      <FilterBar
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <BillsGrid bills={filteredBills} />
    </div>
  );
}
