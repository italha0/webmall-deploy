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
  { id: 1, image: "/banner3.png" },
  { id: 2, image: "/banner2.png" },
  { id: 3, image: "/banner1.png" },
  { id: 4, image: "/banner4.gif" },
];

const HeroCarousel = () => {
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
    <div className="relative w-full aspect-[16/9] lg:aspect-[16/3] px-2">
      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className="hidden md:block absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        ref={nextRef}
        className="absolute hidden md:block top-1/2 right-2 z-10 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        loop={true}
        effect="fade"
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
        className="w-full h-full"
      >
        {bannerSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Image
              src={slide.image}
              fill
              alt="banner"
              className="relative w-full h-full rounded-xl md:rounded-none"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-8 bg-blue-400"
                : "w-6 bg-white bg-opacity-70 hover:bg-opacity-90"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
export default HeroCarousel;
