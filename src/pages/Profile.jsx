import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Button from "../components/common/Button";

export default function Profile() {
  const { user, logout } = useAuth();
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [displayName, setDisplayName] = useState(user?.displayName || "");

  if (!user) return <p className="p-6">Please login to view profile.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="flex items-center gap-6 mb-4">
        <img src={user.photoURL} alt={user.displayName} className="w-24 h-24 rounded-full object-cover border"/>
        <div>
          <h2 className="font-bold text-xl">{user.displayName}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
