"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const ProductCard = ({ product }) => {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);

  const isDiscountNegative = product.discount < 0;
  const discountColor = isDiscountNegative ? "text-red-600" : "text-green-500";
  const discountIcon = isDiscountNegative ? (
    <TrendingDown className="w-3.5 h-3.5" />
  ) : (
    <TrendingUp className="w-3.5 h-3.5" />
  );

  // ✅ Find the lowest price offer
  const lowestOffer = product.offers?.reduce((prev, curr) =>
    prev.price < curr.price ? prev : curr
  );

  return (
    <Card className="relative w-full bg-[#192130] border border-gray-500 shadow-sm hover:shadow-md transition-all duration-300 p-2 flex flex-col gap-3 rounded-lg">
      {/* Discount Badge */}
      <div className="absolute top-2 left-2 z-10">
        <div
          className={`flex items-center border border-gray-300 rounded overflow-hidden text-xs font-semibold px-2 py-0.5 bg-black ${discountColor}`}
        >
          <span>{product.discount}%</span>
          <span className="ml-1">{discountIcon}</span>
        </div>
      </div>

      <CardHeader className="p-0">
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
            className="object-contain max-h-full transition-transform duration-200 group-hover:scale-105"
          />
        </Link>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 p-0 text-gray-200">
        {/* Category & Rating */}
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-gray-800 text-gray-300">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="font-medium">{product.rating}</span>
            <span className="text-gray-400">({product.reviews})</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-semibold line-clamp-1">{product.name}</h3>

        {/* Price & Lowest Offer Source */}
        {lowestOffer && (
          <div className="flex items-center gap-2">
            <span className="text-green-500 font-bold text-lg">
              {formatPrice(lowestOffer.price)}
            </span>
            <span className="ml-auto flex items-center gap-1  text-xs px-2 py-0.5 rounded">
              {lowestOffer.logo ? (
                <Image
                  src={lowestOffer.logo}
                  alt={lowestOffer.source}
                  width={16}
                  height={16}
                  className="object-contain"
                />
              ) : null}
              {lowestOffer.source}
            </span>
          </div>
        )}
        {/* Views & Sold */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>👁 987 views</span>
          <span>🛒 34 sold</span>
        </div>
        <div className="flex items-center gap-2 text-xs bg-gray-800 p-2 rounded">
          <span>💳</span>
          <span>
            <span className="font-medium text-green-500">3% Back</span> w/ Chase
          </span>
        </div>
      </CardContent>

      <CardFooter className="mt-auto p-0">
        {/* View Prices Button */}
        <Link
          href={`/product/${product.slug}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-md transition"
        >
          View All {product.offers?.length || 0} Prices
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
