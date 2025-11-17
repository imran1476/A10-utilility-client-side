import { useEffect, useState } from "react";
import api from "../../services/api"; // backend api
import Button from "../shared/Button";
import Modal from "../shared/Modal";
import Spinner from "../shared/Spinner";

export default function MyBillsTable() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch logged-in user's bills
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await api.get("/my-bills"); // ensure backend gives logged-in user's bills
        setBills(res.data);
      } catch (err) {
        console.error("Error fetching my bills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, []);

  const handleUpdate = (bill) => {
    setSelectedBill(bill);
    setModalOpen(true);
  };

  const handleDelete = async (billId) => {
    if (!confirm("Are you sure you want to delete this bill?")) return;
    try {
      await api.delete(`/my-bills/${billId}`);
      setBills(bills.filter((b) => b._id !== billId));
      alert("Bill deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error deleting bill");
    }
  };

  if (loading) return <Spinner />;

  if (bills.length === 0)
    return <p className="text-center mt-6">You haven't paid any bills yet.</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Paid Bills</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Bill Title</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{bill.title}</td>
                <td className="px-4 py-2">৳{bill.amount}</td>
                <td className="px-4 py-2">{bill.date}</td>
                <td className="px-4 py-2">{bill.address}</td>
                <td className="px-4 py-2">{bill.phone}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button onClick={() => handleUpdate(bill)}>Update</Button>
                  <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleDelete(bill._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedBill && (
          <div>
            <h2 className="text-xl font-bold mb-4">Update Bill</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                const updatedBill = {
                  amount: form.amount.value,
                  address: form.address.value,
                  phone: form.phone.value,
                  date: form.date.value,
                };
                try {
                  await api.put(`/my-bills/${selectedBill._id}`, updatedBill);
                  setBills(
                    bills.map((b) =>
                      b._id === selectedBill._id ? { ...b, ...updatedBill } : b
                    )
                  );
                  setModalOpen(false);
                  alert("Bill updated successfully!");
                } catch (err) {
                  console.error(err);
                  alert("Error updating bill");
                }
              }}
            >
              <label className="block mb-2">Amount:</label>
              <input
                type="number"
                name="amount"
                defaultValue={selectedBill.amount}
                className="w-full mb-3 border px-3 py-2 rounded"
              />

              <label className="block mb-2">Address:</label>
              <input
                type="text"
                name="address"
                defaultValue={selectedBill.address}
                className="w-full mb-3 border px-3 py-2 rounded"
              />

              <label className="block mb-2">Phone:</label>
              <input
                type="text"
                name="phone"
                defaultValue={selectedBill.phone}
                className="w-full mb-3 border px-3 py-2 rounded"
              />

              <label className="block mb-2">Date:</label>
              <input
                type="date"
                name="date"
                defaultValue={selectedBill.date}
                className="w-full mb-4 border px-3 py-2 rounded"
              />

              <div className="flex justify-end gap-2">
                <Button type="submit">Save</Button>
                <Button className="bg-gray-400 hover:bg-gray-500" onClick={() => setModalOpen(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        )}
      </Modal>

      {/* Total Paid */}
      <p className="mt-4 font-semibold">
        Total Amount Paid: ৳{bills.reduce((sum, bill) => sum + Number(bill.amount), 0)}
      </p>
    </div>
  );
}
