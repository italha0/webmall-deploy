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
  
  const creditCardOffers = [
    {
      bank: "Citi Bank",
      cardType: "Rewards+",
      discount: "5% Extra",
      category: "Headphones",
      retailer: "Amazon",
      color: "bg-blue-600",
      icon: "🏦",
      terms: "Valid on purchases above $100.",
    },
    {
      bank: "Chase",
      cardType: "Freedom",
      discount: "3% Back",
      category: "Electronics",
      retailer: "Noon",
      color: "bg-blue-700",
      icon: "💳",
      terms: "Unlimited 3% cashback on electronics.",
    },
    {
      bank: "AmEx",
      cardType: "Gold",
      discount: "4x Points",
      category: "Tech",
      retailer: "Emax",
      color: "bg-yellow-600",
      icon: "💎",
      terms: "4x points on tech purchases.",
    },
  ];
  
  return (
    <>
      <HeroSection />
      <TrustBadges/>
      <CategoriesSwiper />
      <ProductGrid title="Featured Products" products={products} swiperMode={true} />
      {/* Credit Card Offers - Enhanced */}
      <section className="py-4 sm:py-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold mb-1">
              💳 Exclusive Credit Card Offers
            </h2>
            <p className="text-gray-400 text-sm">
              Maximize savings with exclusive bank offers - Save up to{" "}
              <span className="text-green-400 font-bold">
                <AnimatedCounter value={15} suffix="%" />
              </span>{" "}
              more
            </p>
          </div>
         <CreditCard/>
        </div>
      </section>
    </>
  );
}
