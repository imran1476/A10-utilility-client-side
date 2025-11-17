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

  // Check if user logged in
  useEffect(() => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch bill details
  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await api.get(`/bills/${id}`);
        setBill(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load bill!");
      } finally {
        setLoading(false);
      }
    };
    fetchBill();
  }, [id]);

  if (loading) return <Spinner />;
  if (!bill) return <p className="text-center text-red-500 mt-8">Bill not found</p>;

  const isCurrentMonth = new Date(bill.date).getMonth() === new Date().getMonth();

  const handlePay = async () => {
    if (!address || !phone) {
      toast.error("Address and Phone are required!");
      return;
    }

    const payload = {
      billId: bill._id,
      username: user.displayName || "Anonymous",
      email: user.email,
      amount: bill.amount,
      address,
      phone,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      await api.post("/my-bills", payload);
      toast.success("Bill Paid Successfully!");
      setOpenModal(false);
      navigate("/my-pay-bills");
    } catch (err) {
      console.error("PAY ERROR:", err);
      toast.error("Payment failed!");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <img
          src={bill.image}
          alt={bill.title}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{bill.title}</h1>
          <p className="text-gray-500 mb-2">{bill.category} | {bill.location}</p>
          <p className="text-gray-700 mb-3">{bill.description}</p>
          <p className="text-xl font-semibold mb-2">Amount: ৳ {bill.amount}</p>
          <p className="text-gray-400 mb-4">Date: {bill.date}</p>

          <Button
            className={`mt-4 w-full ${!isCurrentMonth ? "bg-gray-400 cursor-not-allowed" : ""}`}
            onClick={() => setOpenModal(true)}
            disabled={!isCurrentMonth}
          >
            {isCurrentMonth ? "Pay Bill" : "Pay Bill (Only Current Month)"}
          </Button>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Pay Bill</h2>
        <div className="space-y-3">
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600">Bill Amount: ৳ {bill.amount}</p>

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <Button onClick={handlePay} className="w-full mt-2">
            Submit Payment
          </Button>
        </div>
      </Modal>
    </div>
  );
}
