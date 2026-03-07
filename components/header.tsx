"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className=" header-main py-5 px-0 w-full bg-[#F6F2EA] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" header-row flex items-center justify-between h-20">
          <Link href="/" className=" logo flex items-center">
            <Image
              src="/logo.png"
              alt="PawPair Logo"
              width={229}
              max-width={229}
              height={72}
              className="h-12 w-auto"
              priority
            />
          </Link>

          <nav className=" navigation hidden md:flex items-center space-x-[49px] md:space-x-[15px] lg:space-x-[49px]">
            <Link
              href="/about"
              className="font-normal text-[18px] leading-[18px] text-black m-0 font-modern md:text-[14px] lg:text-[18px] hover:opacity-70 transition-opacity"
            >
              About
            </Link>
            <Link
              href="/auth/caregiver-signup"
              className="text-[#000000] font-modern font-normal text-[18px] leading-[100%] hover:opacity-70 transition-opacity"
            >
              Find a Provider
            </Link>
            <Link
              href="/contact"
              className="font-normal text-[18px] leading-[18px] text-black m-0 font-modern md:text-[14px] lg:text-[18px] hover:opacity-70 transition-opacity"
            >
              Contact
            </Link>
            <Link
              href="/find-care"
              className="px-6 py-3 bg-[#5F7E9D] text-white font-modern font-normal text-[18px] leading-[100%] rounded-[10px] border-2 border-transparent hover:bg-white md:text-[14px] hover:text-[#5F7E9D] m-0 hover:border-[#5F7E9D] transition-all duration-300"
            >
              Create Your Dog’s Profile
            </Link>
          </nav>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-[#000000] hover:opacity-70 transition-opacity"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4 border-t border-[#000000]/10">
            <Link
              href="/about"
              className="block text-[#000000] font-modern font-normal text-[18px] leading-[100%] py-2 hover:opacity-70 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
         <Link
  href="/auth/caregiver-signup"
  className="block text-[#000000] font-modern font-normal text-[18px] leading-[100%] py-2 hover:opacity-70 transition-opacity"
  onClick={() => setIsMenuOpen(false)}
>
  Find a Provider
</Link>
            <Link
              href="/contact"
              className="block text-[#000000] font-modern font-normal text-[18px] leading-[100%] py-2 hover:opacity-70 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/find-care"
              className="block w-full text-center px-6 py-3 bg-[#5F7E9D] text-white font-modern font-normal text-[18px] leading-[100%] rounded-[10px] border-2 border-transparent hover:bg-white hover:text-[#5F7E9D] hover:border-[#5F7E9D] transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Create Your Dog’s Profile
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
