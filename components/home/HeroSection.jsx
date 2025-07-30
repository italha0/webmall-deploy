"use client";
import React from "react";
import Image from "next/image";
import CategoriesSwiper from "./CategoryGrid";
import HeroCarousel from "./HeroCarousel";
import MobileCarousel from "./MobileCarousel";


const HeroSection = () => {
  return (
    <>
      <div className="container mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:flex mt-4 h-[200px] gap-2">
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
          <div className="rounded-xl overflow-hidden " >
            <MobileCarousel />
          </div>

          {/* Mobile Additional Banner */}
          <div className="w-full h-[100px] relative overflow-hidden rounded-xl group cursor-pointer">
            <Image
              src="/mobilebanner.avif"
              alt="mobile banner"
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Categories Section */}
      <div className="container mx-auto px-2 md:mt-7">
        <CategoriesSwiper />
      </div>

      {/* Mobile Additional Banner 2 */}
      <div className="md:hidden container mx-auto">
        <div className="w-full h-[100px] mb-4 relative overflow-hidden rounded-xl group cursor-pointer">
            <Image
              src="/mobilebanner2.avif"
              alt="mobile banner"
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
      </div>
    </>
  );
};

export default HeroSection;
