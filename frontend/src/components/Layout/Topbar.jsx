import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

function Topbar() {
  return (
    <div className="bg-red-600 text-white text-sm">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        {/* Left - Social Icons */}
        <div className="hidden md:flex space-x-4 items-center">
          <a href="#" className="hover:text-gray-200 transform hover:scale-110 transition duration-200">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-200 transform hover:scale-110 transition duration-200">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-200 transform hover:scale-110 transition duration-200">
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>

        {/* Center - Announcement */}
        <div className="flex-grow text-center">
          <span className="tracking-wide font-medium">
            🚚 We ship worldwide — Fast & Reliable Shipping!
          </span>
        </div>

        {/* Right - Phone */}
        <div>
          <a
            href="tel:+1234567890"
            className="hover:text-gray-200 hidden md:block font-medium transition"
          >
            📞+917987897890
          </a>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
