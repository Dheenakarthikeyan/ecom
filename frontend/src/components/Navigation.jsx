import { ShoppingBag, ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Search,User } from 'lucide-react'

const Navigation = () => {
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

                    {/* Home */}
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `relative group transition ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                            }`
                        }
                    >
                        Home
                        <span className="absolute left-0 -bottom-1 h-0.5 bg-blue-600 w-0 group-hover:w-full transition-all duration-300"></span>
                    </NavLink>

                    {/* Product */}
                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            `relative group transition ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                            }`
                        }
                    >
                        Product
                        <span className="absolute left-0 -bottom-1 h-0.5 bg-blue-600 w-0 group-hover:w-full transition-all duration-300"></span>
                    </NavLink>

                    {/* About */}
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `relative group transition ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                            }`
                        }
                    >
                        About Us
                        <span className="absolute left-0 -bottom-1 h-0.5 bg-blue-600 w-0 group-hover:w-full transition-all duration-300"></span>
                    </NavLink>

                    {/* Contact */}
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `relative group transition ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                            }`
                        }
                    >
                        Contact Us
                        <span className="absolute left-0 -bottom-1 h-0.5 bg-blue-600 w-0 group-hover:w-full transition-all duration-300"></span>
                    </NavLink>

                </div>





                <div className="flex items-center gap-4">

                    {/* 🔍 Search */}
                    <form className="hidden sm:flex items-center border border-slate-300 rounded-full overflow-hidden px-3 py-1 bg-white shadow-sm">

                        <input
                            type="text"
                            placeholder="Search Product"
                            className="outline-none px-2 py-1 w-40 md:w-56 text-sm"
                        />

                        <button
                            type="submit"
                            className="p-2 rounded-full hover:bg-blue-100 transition duration-300"
                        >
                            <Search size={18} className="text-gray-600" />
                        </button>

                    </form>

                    {/* 🛒 Cart */}
                    <Link
                        to="/cart"
                        className="relative text-gray-700 hover:text-blue-600 transition"
                    >
                        <ShoppingCart size={22} />

                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                            1
                        </span>
                    </Link>

                    {/* 👤 Register */}
                    <Link
                        to="/register"
                        className="hidden sm:flex gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        <User size={18} />
                        Register
                    </Link>

                </div>
            </div>


        </nav >
    )
}

export default Navigation