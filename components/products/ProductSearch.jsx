"use client";
import React from "react";
import { Search, LayoutGrid, List } from "lucide-react";
import { useMemo } from "react";

// A reusable styled select dropdown
const CustomSelect = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none w-full bg-[#1c2532] border border-gray-600 text-white py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
    >
      {options.map((option, index) => (
        <option key={`${option}-${index}`} value={option}>
          {option}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
      <svg
        className="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
);

const ProductToolbar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  selectedBrand,
  setSelectedBrand,
  brands,
  sortOrder,
  setSortOrder,
  view,
  setView,
  resultCount,
}) => {
  const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Alphabetical (A-Z)",
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-4 mt-16">
        {/* Search Bar */}
        <div className="relative flex-grow w-[100%] md:w-[50%]">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search products, brands, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1c2532] border border-gray-600 rounded-lg py-2.5 pl-11 pr-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
        </div>

        {/* Filters & Sort */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:flex md:flex-row gap-4 w-full md:w-auto">
          <CustomSelect
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categories}
          />
          <CustomSelect
            value={selectedBrand}
            onChange={setSelectedBrand}
            options={brands}
          />
          <CustomSelect
            value={sortOrder}
            onChange={setSortOrder}
            options={sortOptions}
          />
        </div>
      </div>
      <div className="my-4 text-sm text-gray-400">
        Showing {resultCount} of 8 products
      </div>
    </div>
  );
};

export default ProductToolbar;
