import { ShoppingBag, ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { Search, User, Menu, X } from 'lucide-react'


const Navigation = () => {
   const [searchQuery,setSearchQuery] = useState("");
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const isAuthencation = false
    const handleSearch =(e)=>{
        e.preventDefault();
        if(searchQuery.trim()){
            navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`)

        }else{
            navigate("/products")
        }
        setSearchQuery("");

    }

    return (
        <nav className='sticky top-0 w-full bg-white shadow-md z-50 '>
            <div className='max-w-6xl mx-auto px-4 h-16 flex items-center justify-between'>

                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
                    <ShoppingBag size={28} />
                    <span>Shopping Hub</span>
                </NavLink>

                {/* Menu */}
                <div className='hidden md:flex items-center gap-8'>

                    <NavLink to="/" className={({ isActive }) =>
                        `relative ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"}`
                    }>
                        Home
                    </NavLink>

                    <NavLink to="/products" className={({ isActive }) =>
                        `relative ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"}`
                    }>
                        Product
                    </NavLink>

                    <NavLink to="/about" className={({ isActive }) =>
                        `relative ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"}`
                    }>
                        About Us
                    </NavLink>

                    <NavLink to="/contact" className={({ isActive }) =>
                        `relative ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"}`
                    }>
                        Contact Us
                    </NavLink>

                </div>

                <div className="flex items-center gap-4">

                    {/* Search */}
                    <form  onSubmit={ handleSearch} className="hidden sm:flex items-center border rounded-full px-3 py-1">
                        <input
                            type="text"
                            placeholder="Search Product"
                            className="outline-none px-2 py-1 w-40 md:w-56 text-sm"
                            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit">
                            <Search size={18} />
                        </button>
                    </form>

                    {/* Cart */}
                    <Link to="/cart" className="relative text-gray-700">
                        <ShoppingCart size={22} />
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            1
                        </span>
                    </Link>

                    {/* Register */}
                    {!isAuthencation && (
                        <Link
                            to="/register"
                            className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            <User size={18} />
                            Register
                        </Link>
                    )}

                    {/* Mobile button */}
                    <button onClick={() => setOpen(!open)} className='md:hidden'>
                        {open ? <X /> : <Menu />}
                    </button>

                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>

                <div className='flex flex-col p-4 gap-4'>

                    <Link onClick={() => setOpen(false)} to="/">Home</Link>
                    <Link onClick={() => setOpen(false)} to="/products">Products</Link>
                    <Link onClick={() => setOpen(false)} to="/about">About Us</Link>
                    <Link onClick={() => setOpen(false)} to="/contact">Contact Us</Link>

                </div>

            </div>

        </nav>
    )
}

export default Navigation