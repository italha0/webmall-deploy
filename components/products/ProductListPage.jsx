"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/products/ProductCard";
import products from "@/data/products.json";
import ProductToolbar from "./ProductSearch";

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [brand, setBrand] = useState("All Brands");
  const [sortOrder, setSortOrder] = useState("Price: Low to High");

  const filteredAndSortedProducts = useMemo(() => {
    let result = products;

    // 1. Filtering Logic
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      // Corrected Code
      result = result.filter((product) => {
        const nameMatch = (product.name?.toLowerCase() || "").includes(
          lowerCaseQuery
        );
        const brandMatch = (product.brand?.toLowerCase() || "").includes(
          lowerCaseQuery
        );
        const categoryMatch = (product.category?.toLowerCase() || "").includes(
          lowerCaseQuery
        );
        return nameMatch || brandMatch || categoryMatch;
      });
    }
    if (category !== "All Categories") {
      result = result.filter((product) => product.category === category);
    }
    if (brand !== "All Brands") {
      result = result.filter((product) => product.brand === brand);
    }

    // 2. Sorting Logic
    const sortedResult = [...result];
    if (sortOrder === "Price: Low to High") {
      sortedResult.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "Price: High to Low") {
      sortedResult.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "Alphabetical (A-Z)") {
      sortedResult.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sortedResult;
  }, [searchQuery, category, brand, sortOrder]);

  const categories = [
    "All Categories",
    ...new Set(products.map((p) => p.category)),
  ];
  const brands = ["All Brands", ...new Set(products.map((p) => p.brand))];

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto">
        <ProductToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={category}
          setSelectedCategory={setCategory}
          categories={categories}
          selectedBrand={brand}
          setSelectedBrand={setBrand}
          brands={brands}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          resultCount={filteredAndSortedProducts.length}
        />

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
            >
              <AnimatePresence>
                {filteredAndSortedProducts.map((product) => (
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

export default ProductList;
