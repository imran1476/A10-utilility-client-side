import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/common/Spinner";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import { toast } from "react-toastify";

export default function MyPayBills() {
  const { user } = useContext(AuthContext);
  const [myBills, setMyBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const fetchMyBills = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await api.get(`/my-bills?email=${user.email}`);
      setMyBills(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch bills!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBills();
  }, [user]);

  if (!user) return <p className="text-center mt-10">Please login to view your bills.</p>;
  if (loading) return <Spinner />;

  const totalAmount = myBills.reduce((sum, b) => sum + b.amount, 0);

  const handleUpdate = (bill) => {
    setSelectedBill(bill);
    setAddress(bill.address);
    setPhone(bill.phone);
    setOpenModal(true);
  };

  const submitUpdate = async () => {
    if (!address || !phone) {
      toast.error("Address and Phone are required!");
      return;
    }
    try {
      await api.put(`/my-bills/${selectedBill._id}`, { address, phone });
      toast.success("Bill updated successfully!");
      setMyBills((prev) =>
        prev.map((b) =>
          b._id === selectedBill._id ? { ...b, address, phone } : b
        )
      );
      setOpenModal(false);
    } catch (err) {
      toast.error("Update failed!");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Paid Bills</h1>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="bg-white shadow p-4 rounded-lg w-full sm:w-1/2 text-center">
          <p className="text-gray-600">Total Bills Paid</p>
          <p className="text-xl font-bold">{myBills.length}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg w-full sm:w-1/2 text-center">
          <p className="text-gray-600">Total Amount</p>
          <p className="text-xl font-bold">৳ {totalAmount}</p>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Username</th>
              <th className="border p-3 text-left">Amount</th>
              <th className="border p-3 text-left">Address</th>
              <th className="border p-3 text-left">Phone</th>
              <th className="border p-3 text-left">Date</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myBills.map((bill) => (
              <tr key={bill._id} className="hover:bg-gray-50 transition">
                <td className="border p-3">{bill.username}</td>
                <td className="border p-3">৳ {bill.amount}</td>
                <td className="border p-3">{bill.address}</td>
                <td className="border p-3">{bill.phone}</td>
                <td className="border p-3">{bill.date}</td>
                <td className="border p-3">
                  <Button onClick={() => handleUpdate(bill)} className="bg-blue-600 hover:bg-blue-700">
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <h2 className="text-xl font-bold mb-4">Update Bill</h2>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button onClick={submitUpdate} className="w-full bg-green-600 hover:bg-green-700">
          Submit
        </Button>
      </Modal>
    </div>
  );
}
