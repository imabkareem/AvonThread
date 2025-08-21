
import {Link} from 'react-router-dom';
import { FiPhoneCall } from 'react-icons/fi';
import { TbBrandFacebook, TbBrandInstagram, TbBrandLinkedin, TbBrandX } from 'react-icons/tb';
const Footer = () => {
  return (
    <footer className="border-t py-12 px-5 ">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0 ">
            <div>
                <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
                
               <p className="text-gray-500 mb-4">
                  Stay updated with our latest collections, special events, and exclusive deals.
                </p>
                <p className="font-medium text-sm text-gray-600 mb-6">
                  Join now and enjoy 10% off your first purchase!
                </p>

                {/*News letter form */}
                <form className="flex">
                     <input type="text" placeholder="Enter your email" className="p-3 w-full text-sm border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all" required/>
                    <button type="submit" className="bg-gray-800 text-white p-3 rounded-r-md hover:bg-gray-700 transition-all">Subscribe</button>
                </form>
            </div>
            {/*Shop Link */}
            <div>
              <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-600 ">
                <li><Link to="collection/all?gender=Men" className="hover:text-gray-800 transition-colors">Men's top wear</Link></li>
                <li><Link to="collection/all?gender=Women" className="hover:text-gray-800 transition-colors">Women's top wear</Link></li>
                <li><Link to="collection/all?category=Top Wear" className="hover:text-gray-800 transition-colors">Men's bottom weara</Link></li>
                <li><Link to="collection/all?category=Bottom Wear" className="hover:text-gray-800 transition-colors">women's bottom wear</Link></li>
              </ul>
                 
            </div>
            {/*Suport Link */}
            <div>
              <h3 className="text-lg text-gray-800 mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600 ">
                <li><Link to="#" className="hover:text-gray-800 transition-colors">Contact Us </Link></li>
                <li><Link to="#" className="hover:text-gray-800 transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-gray-800 transition-colors">FAQs</Link></li>
                <li><Link to="#" className="hover:text-gray-800 transition-colors">Features</Link></li>
              </ul>  
            </div>
            {/*Follow us Link */}
            <div>
              <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
              <div className='flex items-center  space-x-4 mb-6 '>
                <Link to="https://www.facebook.com" target='_blank' className="text-gray-600 hover:text-gray-800 transition-colors">
                  <TbBrandFacebook className="text-2xl" />
                </Link>
                <Link to="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                   <TbBrandX className="text-2xl" />
                </Link>
                <Link to="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                  <TbBrandInstagram className="text-2xl" />
                </Link>
                <Link to="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                  <TbBrandLinkedin className="text-2xl" />
                </Link> 
              </div>
              <p>Call us</p>
              <p>
                <Link to="tel:+1234567890" className="text-gray-600 hover:text-gray-800 transition-colors">
                  
              <FiPhoneCall className="inline mr-2" />
                  +1234567890
                </Link>

              </p>
            </div>
        </div>
        {/*Copyright Section */}
        <div className=" container text-center mt-12 mx-auto border-t lg:px-0 border-gray-200 pt-6">
         <p className='text-gray-500 text-sm tracking-tighter text-center'> &copy; {new Date().getFullYear()} Ecommerce. All rights reserved.</p> 
        </div>
    </footer>
     
  )
}

export default Footer
