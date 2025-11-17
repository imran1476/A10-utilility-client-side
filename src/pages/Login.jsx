import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import Button from "../components/common/Button";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // redirect to intended page after login or home
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email & Password required!");
      return;
    }
    try {
      await login(email, password);
      toast.success("Login Successful!");
      navigate(from, { replace: true }); // Redirect to intended page
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Google Login Successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border p-2 rounded mb-3"/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border p-2 rounded mb-3"/>
        
        <Button type="submit" className="w-full mb-3">Login</Button>
        <Button type="button" onClick={handleGoogleLogin} className="w-full bg-red-500 hover:bg-red-600 mb-3">
          Login with Google
        </Button>

        <p className="text-sm text-center">
          Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={()=>navigate("/register")}>Register</span>
        </p>
      </form>
    </div>
  );
}
