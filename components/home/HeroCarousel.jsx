"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "@/app/globals.css";

const bannerSlides = [
  {
    id: 1,
    image: "/Banner4.gif",
  },
  {
    id: 2,
    image: "/Banner2.png",
  },
  {
    id: 3,
    image: "/Banner3.png",
  },
  {
    id: 4,
    image: "/Banner1.png",
  },
];

const HeroCarousel = ({className=""}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleDotClick = (index) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
    }
  };

  return (
    <div className={`${className} relative w-full  px-2`}>
      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className="hidden md:block absolute top-1/2 left-4 z-20 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      <button
        ref={nextRef}
        className="absolute hidden md:block top-1/2 right-4 z-20 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full  overflow-hidden"
      >
        {bannerSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`relative w-full h-full bg-gradient-to-r flex items-center justify-center overflow-hidden`}
            >

              {/* Image Section */}
              <div className="flex-1 relative h-full hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20"></div>
                
                
                <Image
                  src={slide.image}
                  fill
                  alt="banner"
                  className="object-cover object-right"
                />
               
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-12 bg-white shadow-lg"
                : "w-8 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
