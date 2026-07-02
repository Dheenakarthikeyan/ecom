import React from 'react'
import { Mail, Phone, MapPin } from "lucide-react"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaYoutube } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 ">

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* About */}
        <div>
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-400 text-sm">
            We provide high-quality products with the best user experience.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@example.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> India
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Shop</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div >
          <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
          <p className="text-gray-400 text-sm mb-3">
            Subscribe to get latest updates
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 text-amber-50 rounded-l-md outline-none"
            />
            <button className="bg-blue-500 px-4 rounded-r-md  hover:bg-blue-600">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Social Icons */}
      <div className="flex justify-center space-x-6 mt-10 text-xl">

        <a href="https://www.linkedin.com" target="_blank">
          <FaLinkedin className="hover:text-blue-500 transition-transform hover:scale-110" />
        </a>

        <a href="https://github.com" target="_blank">
          <FaGithub className="hover:text-gray-300 transition-transform hover:scale-110" />
        </a>

        <a href="https://www.youtube.com" target="_blank">
          <FaYoutube className="hover:text-red-500 transition-transform hover:scale-110" />
        </a>

        <a href="https://www.facebook.com" target="_blank">
          <FaFacebook className="hover:text-blue-600 transition-transform hover:scale-110" />
        </a>

        <a href="https://twitter.com" target="_blank">
          <FaTwitter className="hover:text-blue-400 transition-transform hover:scale-110" />
        </a>

        <a href="https://www.instagram.com" target="_blank">
          <FaInstagram className="hover:text-pink-500 transition-transform hover:scale-110" />
        </a>

      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 mt-6 border-t border-gray-700 py-4 text-sm">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer