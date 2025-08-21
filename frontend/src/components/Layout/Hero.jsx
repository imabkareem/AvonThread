import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link"


import h1 from "../../assets/h1.webp";
import h2 from "../../assets/h2.webp";
import womenHero from "../../assets/hero-women-collection.png";
import menHero from "../../assets/hero-mens-collection.png";

const images = [womenHero, menHero,h1, h2 ];
// Different hero texts for variety
const heroTexts = [
  {
    title: "Step Into Style",
    subtitle: "Discover the latest trends in fashion, curated just for you.",
    button: "Shop Women",
    link: "/collection/all?gender=Women",
  },
  {
    title: "Elevate Your Wardrobe",
    subtitle: "Fresh arrivals to keep you looking sharp every season.",
    button: "Shop Men",
    link: "/collection/all?gender=Men",
  },
  {
    title: "Your Vacation Fits",
    subtitle: "Lightweight, stylish, and ready to travel the world with you.",
    button: "Explore Now",
    link: "/collection/all",
  },
  {
    title: "Limited Edition Drop",
    subtitle: "Exclusive pieces designed for those who love to stand out.",
    button: "Grab Yours",
    link: "#new-arrivals",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
      setTextIndex((prev) =>
        prev === heroTexts.length - 1 ? 0 : prev + 1
      );
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative">
      {/* Background Image */}
      <img
        src={images[currentIndex]}
        alt="Hero"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover transition-all duration-1000 ease-in-out"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 flex justify-center items-center text-white">
        <div className="text-center text-white p-6 max-w-2xl">
          <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight uppercase mb-4 drop-shadow-lg">
            {heroTexts[textIndex].title}
          </h1>
          <p className="text-sm md:text-xl mb-6 opacity-90">
            {heroTexts[textIndex].subtitle}
          </p>
          {
  heroTexts[textIndex].link.startsWith("#") ? (
    <HashLink
      smooth
      to={heroTexts[textIndex].link}
      className="bg-white text-gray-900 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-200 transition"
    >
      {heroTexts[textIndex].button}
    </HashLink>
  ) : (
    <Link
      to={heroTexts[textIndex].link}
      className="bg-white text-gray-900 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-200 transition"
    >
      {heroTexts[textIndex].button}
    </Link>
  )
}
        </div>
      </div>
    </section>
  );
};

export default Hero;
