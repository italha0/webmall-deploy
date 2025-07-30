"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/products/ProductCard";
import products from "@/data/products.json";

const sampleFilterGroups = [
  {
    title: "Categories",
    key: "categories",
    options: [
      { name: "Smartphones", value: "smartphones", isSelected: false },
      { name: "Tablets", value: "tablets", isSelected: true },
      { name: "Laptops", value: "laptops", isSelected: false },
      { name: "Accessories", value: "accessories", isSelected: false },
      { name: "Smart Watches", value: "smartwatches", isSelected: false },
      { name: "Audio", value: "audio", isSelected: false },
    ],
  },
  {
    title: "Brand",
    key: "brand",
    options: [
      { name: "Apple", value: "apple", isSelected: false },
      { name: "Samsung", value: "samsung", isSelected: true },
      { name: "Xiaomi", value: "xiaomi", isSelected: false },
      { name: "OnePlus", value: "oneplus", isSelected: false },
      { name: "Google", value: "google", isSelected: false },
      { name: "Huawei", value: "huawei", isSelected: false },
      { name: "Oppo", value: "oppo", isSelected: false },
      { name: "Vivo", value: "vivo", isSelected: false },
      { name: "Realme", value: "realme", isSelected: false },
      { name: "Nokia", value: "nokia", isSelected: false },
      { name: "Sony", value: "sony", isSelected: false },
      { name: "LG", value: "lg", isSelected: false },
    ],
  },
  {
    title: "Battery",
    key: "battery",
    options: [
      { name: "3000mAh", value: "3000mah", isSelected: false },
      { name: "4000mAh", value: "4000mah", isSelected: false },
      { name: "5000mAh", value: "5000mah", isSelected: true },
      { name: "6000mAh", value: "6000mah", isSelected: false },
    ],
  },
  {
    title: "Price Range",
    key: "price",
    options: [
      { name: "Under $200", value: "under-200", isSelected: false },
      { name: "$200 - $500", value: "200-500", isSelected: false },
      { name: "$500 - $1000", value: "500-1000", isSelected: true },
      { name: "Over $1000", value: "over-1000", isSelected: false },
    ],
  },
];

const FilterSidebar = ({
  filterGroups = sampleFilterGroups,
  onFilterChange = (groupKey, optionValue) =>
    console.log(groupKey, optionValue),
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
  });
  const [searchTerms, setSearchTerms] = useState({});
  const [showMoreSections, setShowMoreSections] = useState({});

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleShowMore = (key) => {
    setShowMoreSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearchChange = (groupKey, term) => {
    setSearchTerms((prev) => ({ ...prev, [groupKey]: term }));
  };

  const getFilteredOptions = (options, groupKey) => {
    const searchTerm = searchTerms[groupKey] || "";
    return options.filter((option) =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getDisplayedOptions = (options, groupKey) => {
    const filteredOptions = getFilteredOptions(options, groupKey);
    const showMore = showMoreSections[groupKey];
    if (showMore || filteredOptions.length <= 5) return filteredOptions;
    return filteredOptions.slice(0, 5);
  };

  return (
    <div className="bg-white border border-gray-200 rounded text-sm sticky top-32">
      {filterGroups.map(({ title, key, options }) => {
        const filteredOptions = getFilteredOptions(options, key);
        const displayedOptions = getDisplayedOptions(options, key);
        const hasMore = filteredOptions.length > 5;
        const showMore = showMoreSections[key];

        return (
          <div key={key} className="border-b border-gray-200 last:border-b-0">
            <button
              onClick={() => toggleSection(key)}
              className="font-semibold text-gray-900 flex justify-between items-center cursor-pointer w-full px-4 py-3 hover:bg-gray-50"
            >
              <span>{title}</span>
              {expandedSections[key] ? (
                <ChevronUp size={16} className="text-gray-400" />
              ) : (
                <ChevronDown size={16} className="text-gray-400" />
              )}
            </button>

            {expandedSections[key] && (
              <div className="px-4 pb-3">
                {options.length > 10 && (
                  <div className="relative mb-3">
                    <Search
                      size={14}
                      className="absolute left-2 top-1.5 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder={`Search ${title.toLowerCase()}...`}
                      value={searchTerms[key] || ""}
                      onChange={(e) => handleSearchChange(key, e.target.value)}
                      className="text-xs p-1 pl-7 border border-gray-300 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  {displayedOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={option.isSelected}
                        onChange={() => onFilterChange(key, option.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700 text-sm">
                        {option.name}
                      </span>
                    </label>
                  ))}
                </div>

                {hasMore && !searchTerms[key] && (
                  <button
                    onClick={() => toggleShowMore(key)}
                    className="text-blue-600 hover:text-blue-800 text-xs mt-2 font-medium"
                  >
                    {showMore
                      ? "Show less"
                      : `Show ${filteredOptions.length - 5} more`}
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const productList = () => {
  return (
    <div className="min-h-screen  bg-gray-50">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="hidden md:block w-[14rem] flex-shrink-0">
            <FilterSidebar />
          </div>
          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-6"
            >
              <h1 className="text-2xl font-bold text-gray-900 mt-2">
                116 Results were found
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
            >
              <AnimatePresence>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default productList;
