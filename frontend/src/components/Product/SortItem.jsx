
import { useSearchParams } from "react-router-dom"

const SortItem = () => {
  const [searchParams,setSearchParams]=useSearchParams()

   const handleSortChange = (e)=>{
     const sortBy = e.target.value
     searchParams.set("sortBy",sortBy)
     setSearchParams(searchParams)
   }
  return (
    <div className="sort-item flex items-center justify-center">
      <select 
      onChange={handleSortChange}
      value={searchParams.get("sortBy") || ""}
      className="border p-2 rounded-md focus:out-of-range">
        <option value="">Default</option>
        <option value="priceAscending">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  )
}

export default SortItem
