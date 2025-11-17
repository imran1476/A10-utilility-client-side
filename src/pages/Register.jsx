import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import Button from "../components/common/Button";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("All fields required!");
      return;
    }
    try {
      await register(name, email, password, photo);
      toast.success("Registration Successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} className="w-full border p-2 rounded mb-3"/>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border p-2 rounded mb-3"/>
        <input type="text" placeholder="Photo URL" value={photo} onChange={(e)=>setPhoto(e.target.value)} className="w-full border p-2 rounded mb-3"/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border p-2 rounded mb-3"/>
        <Button type="submit" className="w-full mb-3">Register</Button>
      </form>
    </div>
  );
}
