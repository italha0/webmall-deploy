"use client";

import Image from "next/image";
import { ChevronRight, Zap, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FeaturedCard from "./FeaturedCard"
import products from "@/data/products.json"


function HeroSection() {
  return (
    <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] mt-14 flex items-start justify-center overflow-hidden bg-[#121212] text-white">
      <div className="relative z-20 container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="text-left">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-blue-600 text-white">
              <Zap className="h-3 w-3 mr-1" />
              FLASH DEAL
            </Badge>
            <Badge className="bg-yellow-400 text-black font-bold">
              <Clock className="h-3 w-3 mr-1" />
              04:23:45
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white">
            Save Up To <span className="text-yellow-400">40%</span>
            <br />
            On Electronics
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-6">
            Compare prices from{" "}
            <span className="text-yellow-400 font-bold">50+ retailers</span>{" "}
            instantly.
            <br />
            Find the lowest prices guaranteed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-200">
              Start Saving Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-yellow-400 text-black hover:bg-yellow-400 hover:text-black px-8 py-3 text-lg transition-all duration-200"
            >
              Browse Deals
            </Button>
          </div>

          {/* Static Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-400">50K+</div>
              <div className="text-xs text-gray-400">Happy Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-xs text-gray-400">Retailers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">$2.5M</div>
              <div className="text-xs text-gray-400">Saved Total</div>
            </div>
          </div>
        </div>

        {products
          .filter((p) => p.featured)
          .map((p) => (
            <FeaturedCard key={p.id} products={products} cycleInterval={4000} />
          ))}
      </div>
    </section>
  );
}

export default HeroSection;
