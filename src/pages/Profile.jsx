import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Button from "../components/common/Button";

export default function Profile() {
  const { user, logout } = useAuth();
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [displayName, setDisplayName] = useState(user?.displayName || "");

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <p className="text-gray-600 text-lg">Please login to view your profile.</p>
      </div>
    );

  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
        <img
          src={photoURL || "/default-avatar.png"}
          alt={displayName}
          className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{displayName}</h1>
        <p className="text-gray-600 mb-6">{user.email}</p>
        <Button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
