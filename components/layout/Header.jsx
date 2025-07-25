"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Menu, X, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import NavigationDropdowns from "../dropdowns/Categories";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      document.body.classList.toggle("scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0070bf]">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="WebMall"
            width={200}
            height={60}
            priority
          />
        </Link>

        {/* Search Bar */}
        <div className="hidden  max-w-lg md:flex flex-1 mx-4">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="What are you looking for?"
              className="w-full py-2 pl-4 pr-10 rounded-md text-gray-800"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          </div>
        </div>

        {/* App Store Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Image src="/ios.png" alt="App Store" width={120} height={40} />
          <Image
            src="/google.png"
            alt="Google Play"
            width={120}
            height={40}
          />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Input
            type="text"
            placeholder="What are you looking for?"
            className="w-full py-2 pl-4 pr-10 rounded-md text-gray-800"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <NavigationDropdowns/>
      </header>
      {/* spacer div */}
    <div className="h-[90px] lg:h-[70px]"> </div>
    </>
  );
};

export default Header;
