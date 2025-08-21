import { useEffect, useRef, useState } from "react";
import { FaFilter} from 'react-icons/fa';
import FilterSidebar from "../components/Product/FilterSidebar";
import SortItem from "../components/Product/SortItem";
import ProductGrid from "../components/Product/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { fetchProductsByFilters } from "../redux/slices/productSlice";

const CollectionPage = () => {
  const { collection } = useParams();
 const [searchParams] = useSearchParams();
 const dispatch = useDispatch();
 const {products,loading,error} =  useSelector(state=>state.products)
 const queryParams = Object.fromEntries([...searchParams])

 
  const sidebarRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(()=>{
    dispatch(fetchProductsByFilters({ collection,...queryParams}))
  },[dispatch,collection,searchParams])
  
  const handleClikedOutside = (e) =>{
  //   //Close sidebar if cliked outside
    if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
      setIsOpen(false)
  }
}

  const toggleSidebar=()=>{
    setIsOpen(!isOpen)
  }

  useEffect(()=>{
    document.addEventListener("mousedown",handleClikedOutside)
      return()=>{
        document.removeEventListener("mousedown",handleClikedOutside)
      }
  },[]);


  

  return (
    <div className=" flex flex-col lg:flex-row ">
      {/*Mobile filter button */}
      <button onClick={toggleSidebar}  className=" border p-2 flex justify-center items-center lg:hidden">
        <FaFilter className="mr-2 "/>
      </button>
      {/*Filter Sidebar */}
      <div ref={sidebarRef} className={`${isOpen?"translate-x-0":"-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
        <FilterSidebar/>
      </div>
      <div className="flex-grow p-4 ">
          <h2 className="text-2xl uppercase md-4 ">All Collection</h2>

          {/*Sort Option  */}
          <SortItem  />

          {/*Product Grid */}
          <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
