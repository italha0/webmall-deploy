"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import  Image  from "next/image";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import CategoriesSwiper from "./CategoryGrid";
import HeroCarousel from './HeroCarousel'


const HeroSection = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="mt-10 md:mt-12 flex justify-center">
          <HeroCarousel className="max-w-[948px]" />
          <Image
            src="/bannerright.png"
            alt="rightbanner"
            width={200}
            height={0}
            className="hidden md:block"
          />
          <Image
            src="/rightbanner.png"
            alt="rightbanner"
            width={200}
            height={0}
            className="hidden md:block"
          />
        </div>
      </div>
      <div className="w-full h-[94px] p-4 md:hidden">
        <Image
          src="/mobilebanner.avif"
          alt="mobile banner"
          width={0}
          height={0}
          className="w-full h-auto"
        />
      </div>

      <CategoriesSwiper />
      <div className="w-full h-[64px] p-4 md:hidden mb-8">
        <Image
          src="/mobilebanner2.avif"
          alt="mobile banner"
          width={0}
          height={0}
          className="w-full h-auto"
        />
      </div>
    </>
  );
};

export default HeroSection;
