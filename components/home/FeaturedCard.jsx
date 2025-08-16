"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "./AnimatedCounter";

export default function FeaturedCard({ products, cycleInterval = 5000 }) {
  const featuredProducts = products.filter((product) => product.featured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (featuredProducts.length <= 1) return;
    const timer = setInterval(() => {
      setIsFading(true); 

      // Wait for the fade-out transition to complete before changing the product
      setTimeout(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % featuredProducts.length
        );
        setIsFading(false); // Trigger the fade-in effect
      }, 500); // This duration should match the CSS transition duration
    }, cycleInterval);

    // Cleanup function: clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [featuredProducts.length, cycleInterval]);

  // If there are no featured products, render nothing
  if (featuredProducts.length === 0) {
    return null;
  }

  // Get the product to display based on the current index
  const product = featuredProducts[currentIndex];

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>

      <div className="hidden lg:block">
        <div className="relative">
          <div className="max-w-[21rem] min-h-[400px] ms-48 mt-4 bg-[#1E1E1E] rounded-2xl p-6 border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 relative">
            {/* Floating Overlay Badge */}
            <div
              className="absolute -top-3 -right-3 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full flex items-center shadow-lg"
              style={{ animation: "float 1.5s ease-in-out infinite" }}
            >
              HOT DEALS! <span className="ml-1">🔥</span>
            </div>

            {/* Fading container for dynamic content */}
            <div
              className={`transition-opacity duration-500 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            >
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-yellow-400 text-black font-bold">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  TRENDING
                </Badge>
                <Badge className="bg-blue-600 text-white">
                  Save ${product.originalPrice - product.price}
                </Badge>
              </div>

              {/* Product Image */}
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-[200px] object-contain rounded-lg mb-4"
                key={product.id} // Add key to help React differentiate images
              />

              {/* Product Title */}
              <h3 className="text-xl font-bold mb-2 text-white h-14">
                {product.name}
              </h3>

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-yellow-400">
                    <AnimatedCounter value={product.price} prefix="$" />
                  </span>
                  <span className="text-lg text-gray-500 line-through ml-2">
                    <AnimatedCounter value={product.originalPrice} prefix="$" />
                  </span>
                </div>
                <Badge variant="secondary" className="bg-gray-700 text-white">
                  BestBuy
                </Badge>
              </div>
            </div>

            {/* CTA - Kept outside the fading div so it doesn't flash */}
            <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 transition-all duration-200">
              View Deal
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
