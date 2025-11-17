import React from "react";

export default function Avatar({ src, alt = "avatar", size = 40, onClick }) {
  return (
    <div
      className={`w-${size} h-${size} rounded-full overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-110`}
      onClick={onClick}
      title={alt}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
