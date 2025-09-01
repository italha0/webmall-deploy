"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import "swiper/css";
import "swiper/css/navigation";
import { fetchFromApi } from "@/lib/api";

const ProductGrid = ({
  title = "Featured Products",
  showTitle = true,
  showViewAll = true,
  swiperMode = true,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchFromApi("/api/get_products_list");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load products:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="py-4 bg-black">
      <div className="container mx-auto">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-100">
              {title}
            </h2>

            {showViewAll && (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-700 p-0"
                >
                  View All
                  <Eye className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
        {swiperMode ? (
          <div className="relative ">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={10}
              slidesPerView={1.6}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5.5 },
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              className="pb-4 gap-6"
            >
              {products.map((product, index) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Custom Navigation */}
            <button
              ref={prevRef}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 border border-gray-200 hover:border-blue-500"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-blue-500" />
            </button>

            <button
              ref={nextRef}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 border border-gray-200 hover:border-blue-500"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 hover:text-blue-500" />
            </button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
          >
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        )}
        {products.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-500">
              We couldn't find any products matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
