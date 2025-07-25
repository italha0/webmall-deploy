"use client";
import React from "react";
import Image from "next/image";
import CategoriesSwiper from "./CategoryGrid";
import HeroCarousel from "./HeroCarousel";

const HeroSection = () => {
  return (
    <>
      <div className="container mx-auto px-2 mt-14">
        {/* Desktop Layout */}
        <div className="hidden md:flex mt-4 h-[197px] gap-2">
          {/* Main Banner Carousel - Takes up 70% width */}
          <div className="w-[70%] h-full">
            <HeroCarousel />
          </div>

          <div className="w-[30%] flex flex-row h-full">
            <div className="w-[calc(100%-8px)] relative  overflow-hidden group cursor-pointer">
              <Image
                src="/rightbanner.png"
                alt="Backpack Store"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden mt-4">
          {/* Mobile Main Banner */}
          <div className="h-[200px] mb-4 rounded-xl overflow-hidden">
            <HeroCarousel />
          </div>

          {/* Mobile Additional Banner */}
          <div className="w-full h-[100px] mb-4 relative overflow-hidden rounded-xl group cursor-pointer">
            <Image
              src="/mobilebanner.avif"
              alt="mobile banner"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent">
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <h4 className="text-white text-lg font-bold">Special Offers</h4>
                <p className="text-white/90 text-sm">Up to 50% Off</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-2 mt-8">
        <CategoriesSwiper />
      </div>

      {/* Mobile Additional Banner 2 */}
      <div className="md:hidden container mx-auto px-2">
        <div className="w-full h-[80px] my-4 relative overflow-hidden rounded-xl group cursor-pointer">
          <Image
            src="/mobilebanner2.avif"
            alt="mobile banner 2"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent">
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <span className="bg-white text-purple-600 px-3 py-1 rounded-full text-xs font-bold">
                NEW ARRIVALS
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
