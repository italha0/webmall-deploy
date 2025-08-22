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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {creditCardOffers.map((offer, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20"
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-1.5 rounded ${offer.color} bg-opacity-20`}
                      >
                        <span className="text-sm">{offer.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">
                          {offer.bank}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {offer.cardType}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-green-600 to-green-500 text-white border-green-600/30 text-xs animate-pulse">
                      {offer.discount}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{offer.terms}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-green-400">
                    <Shield className="h-3 w-3" />
                    <span>Verified Partner</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
