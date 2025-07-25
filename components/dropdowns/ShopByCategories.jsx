"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Menu, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categoriesWithSubs = {
  Mobiles: [
    "Smartphones",
    "Feature Phones",
    "Foldable Phones",
    "Gaming Phones",
    "Refurbished Phones",
  ],
  "Mobile Accessories": [
    "Cases & Covers",
    "Screen Protectors",
    "Chargers",
    "Power Banks",
    "Cables & Adapters",
    "Earphones",
    "Bluetooth Headsets",
  ],
  Laptops: [
    "Gaming Laptops",
    "Business Laptops",
    "Student Laptops",
    "Ultrabooks",
    "2-in-1 Laptops",
  ],
  "Laptop Accessories": [
    "Bags & Sleeves",
    "Cooling Pads",
    "External Keyboards",
    "Mice",
    "Docking Stations",
  ],
  Televisions: [
    "Smart TVs",
    "4K Ultra HD TVs",
    "Android TVs",
    "QLED TVs",
    "OLED TVs",
  ],
  Appliances: [
    "Refrigerators",
    "Washing Machines",
    "Microwave Ovens",
    "Air Conditioners",
    "Water Purifiers",
    "Vacuum Cleaners",
  ],
  "Audio Devices": [
    "Bluetooth Speakers",
    "Soundbars",
    "Home Theaters",
    "Headphones",
    "Wireless Earbuds",
  ],
  Wearables: [
    "Smartwatches",
    "Fitness Bands",
    "Kids Smartwatches",
    "Smart Rings",
  ],
  Cameras: [
    "DSLR Cameras",
    "Mirrorless Cameras",
    "Point & Shoot Cameras",
    "Action Cameras",
    "Security Cameras",
  ],
  Gaming: [
    "Consoles",
    "Gaming Laptops",
    "Controllers",
    "Gaming Chairs",
    "VR Headsets",
  ],
  "Home & Kitchen": [
    "Microwaves",
    "Cooktops",
    "Blenders & Mixers",
    "Water Heaters",
    "Air Purifiers",
    "Fans & Coolers",
  ],
  Fashion: [
    "Men's Clothing",
    "Women's Clothing",
    "Shoes",
    "Watches",
    "Bags & Wallets",
  ],
  Beauty: ["Hair Care", "Skin Care", "Makeup", "Fragrances", "Grooming Tools"],
};

const ShopByCategories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Earphones");
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

  const handleCategoryHover = (category) => {
    setSelectedCategory(category);
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
      <button className="flex items-center border-e-2  gap-2 px-4 py-2 text-sm font-semibold  hover:bg-gray-200  text-gray-800">
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
              {/* Left Column */}
              <div className="w-1/2 p-2 overflow-y-auto">
                {Object.keys(categoriesWithSubs).map((category) => (
                  <div
                    key={category}
                    onMouseOver={() => handleCategoryHover(category)}
                    className={`flex items-center justify-between px-4 py-2 text-sm rounded-md cursor-pointer
                      ${
                        selectedCategory === category
                          ? "bg-orange-50 text-blue-600 font-semibold"
                          : "text-gray-800 hover:bg-gray-100"
                      }`}
                  >
                    <span>{category}</span>
                    <ChevronRight size={14} className="text-gray-400" />
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="w-1/2 p-2 overflow-y-auto">
                {selectedCategory && categoriesWithSubs[selectedCategory] && (
                  <>
                    <div className="px-4 py-2 text-sm font-semibold text-gray-500 border-b mb-2">
                      {selectedCategory}
                    </div>
                    {categoriesWithSubs[selectedCategory].map((subcategory) => (
                      <Link
                        key={subcategory}
                        href={`/products/${subcategory}`}
                        className="block px-4 py-2 text-sm text-gray-800 rounded-md hover:bg-orange-50 hover:text-blue-600"
                      >
                        {subcategory}
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
