"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ShopByCategories from "./ShopByCategories";
import { fetchFromApi } from "@/lib/api";

const NavigationDropdowns = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchFromApi("/api/get_category_list");
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load categories:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  const handleMouseEnter = (index) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };
  // Group categories by parent to create the dropdown structure
  const groupedCategories = categories.reduce((acc, category) => {
    const parentName = category.parent_name || "Other";
    if (!acc[parentName]) {
      acc[parentName] = {
        name: parentName,
        slug: category.parent_name
          ? category.parent_name.toLowerCase().replace(/\s+/g, "-")
          : "other",
        subcategories: [],
      };
    }
    acc[parentName].subcategories.push({
      name: category.name,
      slug: category.slug,
    });
    return acc;
  }, {});

  const mainCategories = Object.values(groupedCategories);

  if (loading)
    return (
      <div className="hidden lg:block sticky top-[70px] right-0 left-0 z-[1030] bg-white border-b shadow-sm h-12"></div>
    );

  if (error)
    return (
      <div className="hidden lg:block sticky top-[70px] right-0 left-0 z-[1030] bg-white border-b shadow-sm h-12 text-red-500 p-2">
        Error: {error}
      </div>
    );

  return (
    <div className="hidden lg:block sticky top-[70px] right-0 left-0 z-[1030] bg-white border-b shadow-sm">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between gap-2 py-1 mx-6 flex-wrap">
          <ShopByCategories />

          {/* Category Menus - Use the grouped categories */}
          {mainCategories.slice(0, 8).map((category, index) => (
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
