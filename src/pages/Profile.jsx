import { useState, useRef } from "react";
import useAuth from "../hooks/useAuth";
import Button from "../components/common/Button";

export default function Profile() {
  const { user, logout } = useAuth();
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [displayName, setDisplayName] = useState(user?.displayName || "");

  const fileInputRef = useRef();

  // Email login user-er jonno default images
  const defaultEmailPhotos = {
    "example@gmail.com": "https://i.ibb.co/3s0Rr4k/default-avatar.png",
    "tumar-email@gmail.com": "https://i.ibb.co/3s0Rr4k/default-avatar.png",
    // aro email add kora jete pare
  };

  // Profile picture decide korar logic
  const photoToShow =
    photoURL || user?.photoURL || defaultEmailPhotos[user.email] || "https://i.ibb.co/3s0Rr4k/default-avatar.png";

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-slate-900 p-4">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Please login to view your profile.
        </p>
      </div>
    );

  // File select handler (local preview)
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoURL(reader.result); // local preview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-start bg-gray-100 dark:bg-slate-900 min-h-screen py-10 px-4">
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-8 w-full max-w-md text-center transition-all duration-300">

        {/* Profile Image */}
        <div className="relative w-28 h-28 mx-auto mb-4">
          <img
            src={photoToShow}
            alt={displayName || "User"}
            className="w-full h-full rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
          />
          {/* Edit Photo Button */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            title="Edit Photo"
          >
            ✎
          </button>
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>

        {/* User Info */}
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-1">
          {displayName || "No Name"}
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mb-6">{user.email}</p>

        {/* Edit Name */}
        <div className="mb-6">
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-200 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Edit display name"
          />
          <Button
            onClick={() => alert("Update name functionality")}
            className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            Update Name
          </Button>
        </div>

        {/* Logout */}
        <Button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
