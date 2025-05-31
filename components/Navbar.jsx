"use client"
import React, { useState } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();

  return (
    <nav className="relative">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
        <Image
          className="cursor-pointer w-24 sm:w-28 md:w-32"
          onClick={() => router.push('/')}
          src={assets.logo}
          alt="logo"
        />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <Link href="/" className="hover:text-gray-900 transition">
            Home
          </Link>
          <Link href="/all-products" className="hover:text-gray-900 transition">
            Shop
          </Link>
          <Link href="/" className="hover:text-gray-900 transition">
            About Us
          </Link>
          <Link href="/" className="hover:text-gray-900 transition">
            Contact
          </Link>
          {isSeller && (
            <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">
              Seller Dashboard
            </button>
          )}
        </div>

        {/* Desktop User Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
                <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Image src={assets.menu_icon} alt="menu" className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50">
          <div className="flex flex-col py-2">
            <Link href="/" className="px-4 py-2 hover:bg-gray-100">
              Home
            </Link>
            <Link href="/all-products" className="px-4 py-2 hover:bg-gray-100">
              Shop
            </Link>
            <Link href="/" className="px-4 py-2 hover:bg-gray-100">
              About Us
            </Link>
            <Link href="/" className="px-4 py-2 hover:bg-gray-100">
              Contact
            </Link>
            {isSeller && (
              <button 
                onClick={() => router.push('/seller')} 
                className="px-4 py-2 text-left hover:bg-gray-100"
              >
                Seller Dashboard
              </button>
            )}
            {user ? (
              <>
                <button 
                  onClick={() => router.push('/cart')} 
                  className="px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                >
                  <CartIcon /> Cart
                </button>
                <button 
                  onClick={() => router.push('/my-orders')} 
                  className="px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                >
                  <BagIcon /> My Orders
                </button>
              </>
            ) : (
              <button 
                onClick={openSignIn} 
                className="px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
              >
                <Image src={assets.user_icon} alt="user icon" />
                Account
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;