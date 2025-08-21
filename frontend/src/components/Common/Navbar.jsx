import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUser, HiOutlineShoppingBag } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { HiBars3BottomRight } from 'react-icons/hi2';
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { useSelector } from 'react-redux';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

  const cartItemCount = cart?.products?.reduce(
    (acc, item) => acc + item.quantity,
    0
  ) || 0;

  return (
    <>
      {/* Navbar */}
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 shadow-sm bg-white sticky top-0 z-40">
        {/* Left Logo */}
        <div>
          <Link to="/" className="text-2xl font-bold tracking-wide text-gray-800 hover:text-red-600 transition">
            Avon<span className="text-red-600">Threads</span>
          </Link>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/collection/all?gender=Men"
            className="hover:text-red-600 text-gray-700 text-sm font-medium uppercase transition"
          >
            Men
          </Link>
          <Link
            to="/collection/all?gender=Women"
            className="hover:text-red-600 text-gray-700 text-sm font-medium uppercase transition"
          >
            Women
          </Link>
          <Link
            to="/collection/all?category=Top Wear"
            className="hover:text-red-600 text-gray-700 text-sm font-medium uppercase transition"
          >
            Top wear
          </Link>
          <Link
            to="/collection/all?category=Bottom Wear"
            className="hover:text-red-600 text-gray-700 text-sm font-medium uppercase transition"
          >
            Bottom wear
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-5">
          {user && user.role === 'admin' && (
            <Link
              to="/admin"
              className="bg-red-600 text-white px-4 py-1.5 rounded-lg hover:bg-black transition font-medium"
            >
              Admin
            </Link>
          )}

          <Link to="/profile" className="hover:text-red-600 transition">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-red-600 transition"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Search Bar */}
          <div className="hidden md:block overflow-hidden">
            <SearchBar />
          </div>

          {/* Mobile Menu */}
          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-7 w-7 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Nav Drawer */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <IoMdClose
            className="h-6 w-6 text-gray-700 cursor-pointer hover:text-red-600 transition"
            onClick={toggleNavDrawer}
          />
        </div>

        <div className="p-5 space-y-5">
          <Link
            to="/collection/all?gender=Men"
            className="block text-gray-700 font-medium hover:text-red-600 transition"
          >
            Men
          </Link>
          <Link
            to="/collection/all?gender=Women"
            className="block text-gray-700 font-medium hover:text-red-600 transition"
          >
            Women
          </Link>
          <Link
            to="/collection/all?category=Top Wear"
            className="block text-gray-700 font-medium hover:text-red-600 transition"
          >
            Top Wear
          </Link>
          <Link
            to="/collection/all?category=Bottom Wear"
            className="block text-gray-700 font-medium hover:text-red-600 transition"
          >
            Bottom Wear
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
