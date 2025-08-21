import Topbar from "../Layout/Topbar"
import Navbar from "./Navbar"

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      {/*Top bar*/}
        <Topbar/>
      {/* Nav bar */}
      <Navbar/>
      {/* Cart drawer */}

    </header>
  )
}

export default Header
