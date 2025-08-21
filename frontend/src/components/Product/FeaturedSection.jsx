import {HiOutlineCreditCard, HiShoppingBag, HiArrowPath} from "react-icons/hi2";

const FeaturedSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Featured First */}
            <div className="flex flex-col items-center">
                <div className="p-4 rounded-full items-center">
                    <HiShoppingBag className="text-xl" />
                </div>
                <h4 className="tracking-tighter mb-2">
                    Free International Shipping
                </h4>
                <p className="text-gray-600 text-sm tracking-tighter">
                    On All Orders Over $100
                </p>
            </div>
            {/* Featured Second */}
            <div className="flex flex-col items-center">
                <div className="p-4 rounded-full items-center">
                    <HiArrowPath className="text-xl" />
                </div>
                <h4 className="tracking-tighter mb-2">
                    45-Day Return Policy
                </h4>
                <p className="text-gray-600 text-sm tracking-tighter">
                    Hassle-Free Returns on All Orders
                </p>
            </div>
            {/* Featured Third*/}
            <div className="flex flex-col items-center">
                <div className="p-4 rounded-full items-center">
                    <HiOutlineCreditCard className="text-xl" />
                </div>
                <h4 className="tracking-tighter mb-2">
                    Secure Payment Options
                </h4>
                <p className="text-gray-600 text-sm tracking-tighter">
                    100% Secure Transactions
                </p>
            </div>
       </div>
    </section>
  )
}

export default FeaturedSection
