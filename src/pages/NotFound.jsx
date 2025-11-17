import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="mb-4">Page Not Found</p>
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </div>
  );
}
