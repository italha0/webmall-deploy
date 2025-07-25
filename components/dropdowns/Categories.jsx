"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ShopByCategories from "./ShopByCategories";
const categories = [
  {
    name: "Mobiles",
    items: [
      "Smartphones",
      "Foldable Phones",
      "Gaming Phones",
      "Refurbished Phones",
      "Feature Phones",
    ],
  },
  {
    name: "Laptops",
    items: [
      "Gaming Laptops",
      "Ultrabooks",
      "Business Laptops",
      "2-in-1 Laptops",
      "Student Laptops",
    ],
  },
  {
    name: "Televisions",
    items: [
      "Smart TVs",
      "4K TVs",
      "Android TVs",
      "OLED TVs",
      "QLED TVs",
    ],
  },
  {
    name: "Audio",
    items: [
      "Bluetooth Speakers",
      "Soundbars",
      "Wireless Earbuds",
      "Gaming Headsets",
      "Noise Cancelling Headphones",
    ],
  },
  {
    name: "Wearables",
    items: [
      "Smartwatches",
      "Fitness Trackers",
      "Kids Watches",
      "Luxury Smartwatches",
      "Sports Bands",
    ],
  },
  {
    name: "Appliances",
    items: [
      "Refrigerators",
      "Washing Machines",
      "Air Conditioners",
      "Microwaves",
      "Vacuum Cleaners",
    ],
  },
  {
    name: "Cameras",
    items: [
      "DSLR Cameras",
      "Mirrorless Cameras",
      "Action Cameras",
      "Point & Shoot",
      "Security Cameras",
    ],
  },
  {
    name: "Gaming",
    items: [
      "Gaming Consoles",
      "Game Controllers",
      "VR Headsets",
      "Gaming Accessories",
      "Handheld Consoles",
    ],
  },
  {
    name: "Accessories",
    items: [
      "Insulated Bottles",
      "Sports Bottles",
      "Steel Flasks",
      "Glass Bottles",
      "Kids Bottles",
    ],
  },
];

const NavigationDropdowns = () => {
  const [activeDropdown, setActiveDropdown] = useState (null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (index) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <div className="hidden lg:block sticky top-[70px] z-[1030] bg-white border-b shadow-sm">
      <div className="container-fluid mx-auto px-4">
        <nav className="flex items-center  justify-between gap-6 py-1  mx-6 flex-wrap">
          {/* Shop by Category dropdown (external) */}
          <ShopByCategories />

          {/* Category Menus */}
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Main Button */}
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-normal text-gray-800 hover:text-blue-500 transition-colors"
              >
                {category.name}
                <ChevronDown size={14} />
              </button>
              {/* Dropdown */}
              <AnimatePresence>
                {activeDropdown === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute left-0 top-full mt-2 w-56 bg-white border rounded-md shadow-md z-50"
                  >
                    <ul className="py-2">
                      {category.items.map((item, i) => (
                        <li key={i}>
                          <Link
                            href={`/products/${item}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500 transition-colors"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NavigationDropdowns;
