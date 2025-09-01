"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { fetchFromApi } from "@/lib/api";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination , Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CategoriesSwiper = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

    useEffect(() => {
      const getCategories = async () => {
        try {
          const response = await fetchFromApi("/api/get_category_list");
          setCategories(response.data);
        } catch (error) {
          console.error("Failed to load categories:", error);
          setError(error.message);
        }
      };
  
      getCategories();
    }, []);
  
  // const categories = [
  //   { id: 3, slug: "Mobile Accessories", image: "/category3.avif" },
  //   { id: 4, slug: "Microphones", image: "/category4.png" },
  //   { id: 6, slug: "Earphones", image: "/category5.png" },
  //   { id: 9, slug: "Smart Watch", image: "/category3.avif" },
  //   { id: 10, slug: "Camera", image: "/category2.png" },
  //   { id: 13, slug: "Mobile Accessories", image: "/category3.avif" },
  //   { id: 14, slug: "Microphones", image: "/category4.png" },
  //   { id: 16, slug: "Earphones", image: "/category5.png" },
  //   { id: 18, slug: "Fans", image: "/category7.png" },
  //   { id: 19, slug: "Smart Watch", image: "/category3.avif" },
  //   { id: 20, slug: "Camera", image: "/category2.png" },
  //   { id: 23, slug: "Mobile Accessories", image: "/category3.avif" },
  //   { id: 24, slug: "Microphones", image: "/category4.png" },
  //   { id: 26, slug: "Earphones", image: "/category5.png" },
  //   { id: 29, slug: "Smart Watch", image: "/category3.avif" },
  //   { id: 30, slug: "Camera", image: "/category2.png" },
  // ];

  return (
    <div className="container mx-auto bg-black py-3 overflow-x-auto  scrollbar scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-200">
      <div className="relative">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          loop={true}
          spaceBetween={2}
          slidesPerView={5}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 6 },
            1024: { slidesPerView: 10 },
          }}
          className="!px-4"
        >
          {categories
            .filter((category) => category.show_on_homepage == 1)
            .map((category) => (
              <SwiperSlide key={category.id}>
                <Link
                  href={`/products/${category.slug}`}
                  className="flex items-center text-center"
                >
                  <div className="w-[70px] h-[70px] md:w-[110px] md:h-[140px] mb-2  sm:pt-11 overflow-hidden flex items-center justify-center">
                    <Image
                      src={`https://webmall.webwork.co.in/${category.image}`}
                      alt={category.slug}
                      fill
                      className="object-contain w-full h-full"
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategoriesSwiper;
