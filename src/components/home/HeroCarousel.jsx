import React, { useState, useEffect } from "react";

const slides = [
  {
    title: "Never Miss a Due Date",
    subtitle: "Get instant reminders for all your utility bills.",
    image: "https://i.ibb.co/bMvLGm2/Gemini-Generated-Image-wargu9wargu9warg.png",
  },
  {
    title: "Quick and Secure Bill Payments",
    subtitle: "Pay electricity, water, gas, and internet bills anytime.",
    image: "https://i.ibb.co/bMvLGm2/Gemini-Generated-Image-wargu9wargu9warg.png",
  },
  {
    title: "Go Paperless",
    subtitle: "Download and store your digital PDF receipts instantly.",
    image: "https://i.ibb.co/bMvLGm2/Gemini-Generated-Image-wargu9wargu9warg.png",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrent(index);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          } bg-cover bg-center`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-white text-2xl md:text-5xl font-extrabold drop-shadow-lg">
              {slide.title}
            </h1>

            <p className="text-white text-sm md:text-xl mt-3 opacity-90">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
      >
        &#10094;
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
