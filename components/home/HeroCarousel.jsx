"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { fetchFromApi } from "@/lib/api"; 

const HeroCarousel = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [banners, setBanners] = useState([]);

useEffect(() => {
  const getBanners = async () => {
    try {
      const response = await fetchFromApi("/api/get_banner_list");
      setBanners(response.data);
    } catch (error) {
      console.error("Failed to load banners:", error);
      // Fallback to default banners
      setBanners([
        {
          id: 1,
          file: "/Banner4.gif",
          image: "/Banner4.gif",
        }
      ]);
    } 
  };

  getBanners();
}, []);

  const handleDotClick = (index) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden hidden md:block">
      {/* Custom Nav Buttons */}
      <button
        ref={prevRef}
        className="hidden md:block absolute top-1/2 left-6 z-20 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-1 rounded-full hover:bg-white hover:scale-110 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        ref={nextRef}
        className="hidden md:block absolute top-1/2 right-6 z-20 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-1 rounded-full hover:bg-white hover:scale-110 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={1000}
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
        className="w-full h-full"
      >
        {/* Change this in your HeroCarousel component */}
        {banners.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={slide.file || slide.image} // Handle both API response and fallback
                fill
                alt="banner"
                className="object-cover"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-10 bg-white shadow-lg"
                : "w-6 bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
