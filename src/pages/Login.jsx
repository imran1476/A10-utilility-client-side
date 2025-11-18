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
      navigate(from, { replace: true });
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white rounded-2xl shadow-xl w-96 p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Login
          </Button>

          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2"
          >
            <img
              src="https://i.ibb.co.com/PGFyJ08y/images-q-tbn-ANd9-Gc-QVZEZ6fa7b-Pw-CI4-HE5583rhd3qi-FNmf6ki-Pg-s.png"
              alt="Google"
              className="w-5 h-5 rounded-full"
            />
            Login with Google
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
