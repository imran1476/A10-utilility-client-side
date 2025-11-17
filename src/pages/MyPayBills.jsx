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

  if (!user) return <p>Please login to view your bills.</p>;
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
      <h1 className="text-2xl font-bold mb-4">My Paid Bills</h1>
      <p>Total Bills Paid: {myBills.length}</p>
      <p>Total Amount: ৳ {totalAmount}</p>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Username</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {myBills.map((bill) => (
            <tr key={bill._id}>
              <td className="border p-2">{bill.username}</td>
              <td className="border p-2">৳ {bill.amount}</td>
              <td className="border p-2">{bill.address}</td>
              <td className="border p-2">{bill.phone}</td>
              <td className="border p-2">{bill.date}</td>
              <td className="border p-2 space-x-2">
                <Button onClick={() => handleUpdate(bill)}>Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <h2 className="text-xl font-bold mb-3">Update Bill</h2>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />
        <Button onClick={submitUpdate} className="w-full">Submit</Button>
      </Modal>
    </div>
  );
}
