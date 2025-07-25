"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ShopByCategories from "./ShopByCategories";
import categoriesData from "@/data/categories.json";

// Extract the categories array from the imported data
const categories = categoriesData.categories;

const NavigationDropdowns = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
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
        <nav className="flex items-center justify-between gap-6 py-1 mx-6 flex-wrap">
          {/* Shop by Category dropdown (external) */}
          <ShopByCategories />

          {/* Category Menus */}
          {categories.map((category, index) => (
            <div
              key={category.slug}
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
                      {category.subcategories?.map((subcategory) => (
                        <li key={subcategory.slug}>
                          <Link
                            href={`/products/${subcategory.slug}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500 transition-colors"
                          >
                            {subcategory.name}
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
