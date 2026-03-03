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
    <header className="w-full bg-[#F6F2EA] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="PawPair Logo"
              width={200}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-[#000000] font-modern font-normal text-[18px] leading-[100%] hover:opacity-70 transition-opacity"
            >
              About
            </Link>
            <Link
              href="/become-caregiver"
              className="text-[#000000] font-modern font-normal text-[18px] leading-[100%] hover:opacity-70 transition-opacity"
            >
              Become A Caregiver
            </Link>
            <Link
              href="/contact"
              className="text-[#000000] font-modern font-normal text-[18px] leading-[100%] hover:opacity-70 transition-opacity"
            >
              Contact
            </Link>
            <Link
              href="/find-care"
              className="px-6 py-3 bg-[#5F7E9D] text-white font-modern font-normal text-[18px] leading-[100%] rounded-[10px] border-2 border-transparent hover:bg-white hover:text-[#5F7E9D] hover:border-[#5F7E9D] transition-all duration-300"
            >
              Find Care That Fits
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
              href="/become-caregiver"
              className="block text-[#000000] font-modern font-normal text-[18px] leading-[100%] py-2 hover:opacity-70 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Become A Caregiver
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
              Find Care That Fits
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
