"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TrendingDown, TrendingUp, Heart , ExternalLink } from "lucide-react";



const ProductCard = ({ product }) => {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "INR",
    }).format(price);

  const isDiscountNegative = product.discount < 0;
  const discountColor = isDiscountNegative ? "text-red-600" : "text-green-600";
  const discountIcon = isDiscountNegative ? (
    <TrendingDown className="w-3.5 h-3.5" />
  ) : (
    <TrendingUp className="w-3.5 h-3.5" />
  );

  return (
    <div className="relative w-full bg-black border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-2 flex flex-col gap-3 rounded-lg">
      {/* Top Icons */}
      <div className="absolute top-2 left-2 z-10">
        <div
          className={`flex items-center border border-gray-300 rounded overflow-hidden text-xs font-semibold px-2 py-0.5 bg-black ${discountColor}`}
        >
          <span>{product.discount}%</span>
          <span className="ml-1">{discountIcon}</span>
        </div>
      </div>
      <div className="absolute top-2 right-2 z-10 text-gray-500 hover:text-red-500 transition">
        <button>
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Product Image */}
      <Link
        href={`/product/${product.slug}`}
        className="relative w-full h-[140px] flex items-center justify-center group overflow-hidden"
      >
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={180}
          height={180}
          className="object-contain  max-h-full transition-transform duration-200 group-hover:scale-105"
        />
      </Link>

      {/* Product Title */}
      <Link
        href={`/product/${product.slug}`}
        className="text-center text-sm font-medium text-gray-200 line-clamp-1 "
      >
        {product.name}
      </Link>

      {/* Best Price (external link) */}
      <a
        href={product.bestPriceLink || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1 text-sm font-semibold text-green-500 hover:underline"
      >
        Price
        <ExternalLink className="w-4 h-4" />: {formatPrice(product.price)}
      </a>

      {/* Comparison Table */}
      <div className="border-t border-b py-2 space-y-1 text-sm">
        {product.offers.slice(0, 2).map((offer, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between border-b last:border-b-0 hover:bg-gray-800 px-1 rounded transition"
          >
            <div className="flex items-center gap-2">
              <Image
                src={offer.logo}
                alt={offer.source}
                width={18}
                height={18}
              />
              <span className="text-gray-200 text-xs">{offer.source}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-gray-200 text-sm font-medium">
                {formatPrice(offer.price)}
              </span>
              {offer.delivery && (
                <span className="text-[9px] text-gray-500 line-clamp-1">
                  {offer.delivery}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View Prices Button */}
      <Link
        href={`/product/${product.slug}`}
        className="mt-auto block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-md transition"
      >
        View All Prices
      </Link>
    </div>
  );
};

export default ProductCard;
