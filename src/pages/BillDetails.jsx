import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Spinner from "../components/common/Spinner";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function BillDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await api.get(`/bills/${id}`);
        setBill(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBill();
  }, [id]);

  if (loading) return <Spinner />;
  if (!bill) return <p>Bill not found</p>;

  const isCurrentMonth = new Date(bill.date).getMonth() === new Date().getMonth();

  const handlePay = async () => {
    if (!address || !phone) {
      toast.error("Address and Phone are required!");
      return;
    }

    const payload = {
      billId: bill._id, // ✅ Correct field name
      username: user.displayName || "Anonymous",
      email: user.email,
      amount: bill.amount,
      address,
      phone,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await api.post("/my-bills", payload);
      console.log("PAY RESPONSE:", res.data);
      toast.success("Bill Paid Successfully!");
      setOpenModal(false);
      navigate("/my-pay-bills"); // redirect to paid bills
    } catch (err) {
      console.error("PAY ERROR:", err);
      toast.error("Payment failed!");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img src={bill.image} alt={bill.title} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-2xl font-bold mb-2">{bill.title}</h1>
      <p className="text-gray-600">{bill.category} | {bill.location}</p>
      <p className="my-2">{bill.description}</p>
      <p className="font-semibold">৳ {bill.amount}</p>
      <p>Date: {bill.date}</p>

      <Button
        className={`${!isCurrentMonth ? "bg-gray-400 cursor-not-allowed" : ""} mt-4`}
        onClick={() => setOpenModal(true)}
        disabled={!isCurrentMonth}
      >
        Pay Bill
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <h2 className="text-xl font-bold mb-3">Pay Bill</h2>
        <p>Email: {user.email}</p>
        <p>Bill Amount: ৳ {bill.amount}</p>
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
        <Button onClick={handlePay} className="w-full">Submit Payment</Button>
      </Modal>
    </div>
  );
}
