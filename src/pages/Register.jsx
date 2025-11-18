import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import Button from "../components/common/Button";

export default function Register() {
  const navigate = useNavigate();

  // ❗ Correct names from AuthContext
  const { register, loginWithGoogle } = useAuth();

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

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle(); // ✔ Correct function
      toast.success("Google Login Successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition hover:shadow-3xl"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          placeholder="Photo URL (optional)"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg mb-6"
        />

        <Button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Register
        </Button>

        {/* Google Login Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border flex items-center justify-center gap-2 border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="https://i.ibb.co.com/PGFyJ08y/images-q-tbn-ANd9-Gc-QVZEZ6fa7b-Pw-CI4-HE5583rhd3qi-FNmf6ki-Pg-s.png"
              className="w-5 h-5 rounded-full"
              alt="google"
            />
            Continue with Google
          </button>
        </div>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?
          <span
            className="text-blue-600 cursor-pointer hover:underline ml-1"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
