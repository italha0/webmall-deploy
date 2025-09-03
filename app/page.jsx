"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, progressPercentage } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import products from "@/data/products.json";
import ProductGrid from "@/components/products/ProductGrid";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { Tektur } from "next/font/google";
import CategoriesSwiper from "@/components/home/CategoryGrid";
import AnimatedCounter from "@/components/home/AnimatedCounter";
import { Card , CardContent } from "@/components/ui/card";
import { Shield , Badge } from "lucide-react";
import { TrustBadges } from "@/components/home/TrustBadges";
import CreditCard  from "@/components/home/CreditCard";
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
      <TrustBadges />
      <CategoriesSwiper />
      <ProductGrid
        title="Featured Products"
        products={products}
        swiperMode={true}
      />
      <CreditCard />
    </>
  );
}
