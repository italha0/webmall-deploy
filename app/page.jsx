"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, progressPercentage } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import products from "@/data/products.json";
import ProductGrid from "@/components/products/ProductGrid";
import PriceBanner from "@/components/home/ShowCase";
import { LoadingScreen } from "@/components/ui/loading-screen";
import ShowCase from "@/components/home/ShowCase";
import { Tektur } from "next/font/google";
import HeroCarousel from "@/components/home/HeroCarousel";
import MobileCarousel from "@/components/home/MobileCarousel";
export default function Home() {
  const featuredProducts = products.filter((product) => product.featured);
  const newArrivals = products.slice(0, 6);
  const mobileAccessories = products.filter(
    (product) =>
      product.category === "Mobiles" || product.category === "Electronics"
  );

  return (
    <>
      <HeroSection />
      <ShowCase />
      <ProductGrid title="Most Popular" products={products} swiperMode={true} />
      <div className="h-[290px] hidden md:block">
        <HeroCarousel />
      </div>
      <div className="md:hidden">
        <MobileCarousel />
      </div>
      <ProductGrid title="Featured" products={products} swiperMode={true} />
      <ProductGrid title="Trending" products={products} swiperMode={true} />
    </>
  );
}
