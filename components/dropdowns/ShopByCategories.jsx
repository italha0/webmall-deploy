"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Menu, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import categoriesData from "@/data/categories.json";

const ShopByCategories = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Set initial category to the first category's slug
  const [selectedCategory, setSelectedCategory] = useState(
    categoriesData.categories[0].slug
  );
  const timeoutRef = useRef(null);

  const openDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  const handleCategoryHover = (categorySlug) => {
    setSelectedCategory(categorySlug);
  };

  const handleSubcategoryClick = (subcategory) => {
    console.log("Selected subcategory:", subcategory);
    setIsOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
    >
      {/* Trigger Button */}
      <button className="flex items-center border-e-2 gap-2 px-4 py-2 text-sm font-semibold hover:bg-gray-200 text-gray-800">
        <Menu size={18} />
        <span>Shop By Categories</span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 bg-white border rounded-md shadow-lg w-[640px]"
          >
            <div className="flex min-h-[400px] divide-x divide-gray-200">
              {/* Left Column - Main Categories */}
              <div className="w-1/2 p-2 overflow-y-auto">
                {categoriesData.categories.map((category) => (
                  <div
                    key={category.slug}
                    onMouseOver={() => handleCategoryHover(category.slug)}
                    className={`flex items-center justify-between px-4 py-2 text-sm rounded-md cursor-pointer ${
                      selectedCategory === category.slug
                        ? "bg-orange-50 text-blue-600 font-semibold"
                        : "text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    <span>{category.name}</span>
                    <ChevronRight size={14} className="text-gray-400" />
                  </div>
                ))}
              </div>

              {/* Right Column - Subcategories */}
              <div className="w-1/2 p-2 overflow-y-auto">
                {selectedCategory && (
                  <>
                    <div className="px-4 py-2 text-sm font-semibold text-gray-500 border-b mb-2">
                      {
                        categoriesData.categories.find(
                          (c) => c.slug === selectedCategory
                        )?.name
                      }
                    </div>
                    {categoriesData.categories
                      ?.find((c) => c.slug === selectedCategory)
                      ?.subcategories?.map((subcategory) => (
                        <Link
                          key={subcategory.slug}
                          href={`/products/${subcategory.slug}`}
                          className="block px-4 py-2 text-sm text-gray-800 rounded-md hover:bg-orange-50 hover:text-blue-600"
                          onClick={() => handleSubcategoryClick(subcategory)}
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopByCategories;
