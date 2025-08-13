"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchFromApi } from "@/lib/api";

const ShopByCategories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchFromApi("/api/get_category_list");

        // Group categories by parent to create the same structure as your JSON
        const groupedCategories = response.data.reduce((acc, category) => {
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
        setCategories(mainCategories);

        // Set initial selected category to the first category's slug
        if (mainCategories.length > 0) {
          setSelectedCategory(mainCategories[0].slug);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to load categories:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    getCategories();
  }, []);

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

  if (loading) {
    return (
      <div className="relative">
        <button className="flex items-center border-e-2 gap-2 px-4 py-2 text-sm font-semibold hover:bg-gray-500 text-gray-100">
          <Menu size={18} />
          <span>Find By Categories</span>
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative">
        <button className="flex items-center border-e-2 gap-2 px-4 py-2 text-sm font-semibold hover:bg-gray-500 text-gray-200">
          <Menu size={18} />
          <span>Find By Categories</span>
        </button>
        <div className="text-red-500 text-sm mt-1">
          Error loading categories
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
    >
      {/* Trigger Button */}
      <button className="flex items-center border-e-2 gap-2 px-4 py-2 text-sm font-semibold text-gray-200">
        <Menu size={18} />
        <span>Find By Categories</span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 bg-black border rounded-md shadow-lg w-[640px]"
          >
            <div className="flex min-h-[400px] divide-x divide-gray-200">
              {/* Left Column - Main Categories */}
              <div className="w-1/2 p-2 overflow-y-auto">
                {categories.map((category) => (
                  <div
                    key={category.slug}
                    onMouseOver={() => handleCategoryHover(category.slug)}
                    className={`flex items-center justify-between px-4 py-2 text-sm rounded-md cursor-pointer ${
                      selectedCategory === category.slug
                        ? "bg-gray-900 text-blue-600 font-semibold"
                        : "text-gray-200 hover:bg-gray-900"
                    }`}
                  >
                    <span>{category.name}</span>
                    <ChevronRight size={14} className="text-white " />
                  </div>
                ))}
              </div>

              {/* Right Column - Subcategories */}
              <div className="w-1/2 p-2 overflow-y-auto">
                {selectedCategory && (
                  <>
                    <div className="px-4 py-2 text-sm font-semibold text-gray-200 border-b mb-2">
                      {
                        categories.find((c) => c.slug === selectedCategory)
                          ?.name
                      }
                    </div>
                    {categories
                      ?.find((c) => c.slug === selectedCategory)
                      ?.subcategories?.map((subcategory) => (
                        <Link
                          key={subcategory.slug}
                          href={`/products/${subcategory.slug}`}
                          className="block px-4 py-2 text-sm text-gray-200 rounded-md hover:bg-gray-900 hover:text-blue-600 capitalize"
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
