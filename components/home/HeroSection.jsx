"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FeaturedCard from "./FeaturedCard";
import AnimatedCounter from "./AnimatedCounter";
import { getProductList } from "@/lib/api"; // Adjust the import path to your api.js file
function HeroSection() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndProcessProducts = async () => {
      try {
        const response = await getProductList();
        // Assuming the API returns an object with a `data` array
        const apiProducts = response.data || [];

        // 1. Filter for products that have a "Featured" tag
        const filtered = apiProducts.filter((p) =>
          p.tags?.some((tag) => tag.name === "Featured")
        );

        // 2. Transform the data into the simple structure FeaturedCard expects
  const transformed = filtered.map((product) => {
          let lowestPrice = Infinity;
          let originalPriceForLowest = 0;

          // Find the best price (lowest selling_price) across all variations
          product.variations?.forEach((variation) => {
            variation.platforms?.forEach((platform) => {
              const sellingPrice = parseFloat(platform.selling_price);
              if (sellingPrice < lowestPrice) {
                lowestPrice = sellingPrice;
                originalPriceForLowest = parseFloat(platform.actual_price);
              }
            });
          });

          // Build a safe absolute image URL similar to ProductCard logic
          let base =
            process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
            process.env.NEXT_PUBLIC_API_BASE_URL ||
            "https://webmall.webwork.co.in";
          if (/\/api\b/i.test(base)) {
            // strip /api... if present because images usually live at root
            base = base.split(/\/api/i)[0];
          }
          base = base.replace(/\/$/, "");
          let img = product.main_image || product.image || "";
          if (img && !/^https?:\/\//i.test(img)) {
            img = `${base}/${img.replace(/^\/+/, "")}`;
          }

          return {
            id: product.id,
            name: product.name,
            image: img,
            price: lowestPrice === Infinity ? 0 : lowestPrice,
            originalPrice: originalPriceForLowest || lowestPrice,
          };
        });

        setFeaturedProducts(transformed);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessProducts();
  }, []);

  return (
    <section className="relative  mt-[5rem] flex items-start justify-center overflow-hidden bg-[#121212] text-white">
      <div className="relative z-20 container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Content (No changes here) */}
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
            Save Up To{" "}
            <span className="text-yellow-400">
              <AnimatedCounter value={40} suffix="%" />
            </span>
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
              className="border-2 border-yellow-400 text-black bg-yellow-400 hover:text-black px-8 py-3 text-lg transition-all duration-200"
            >
              Browse Deals
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                <AnimatedCounter value={50} suffix="K+" />
              </div>
              <div className="text-xs text-gray-400">Happy Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                <AnimatedCounter value={500} suffix="+" />
              </div>
              <div className="text-xs text-gray-400">Retailers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                <AnimatedCounter value={2.5} prefix="$" suffix="M" />
              </div>
              <div className="text-xs text-gray-400">Saved Total</div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <FeaturedCard
          products={featuredProducts}
          cycleInterval={4000}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}

export default HeroSection;
