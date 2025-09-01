"use client";
import React from "react";
import { Product } from "@/types";
import Image from "next/image";// Make sure your Product type supports offers

const ProductRowCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
      {/* Left - Image & Info */}
      <div className="flex gap-4 items-center flex-1">
        <Image
         src={product.image}
         alt={product.name}
         fill
          className="w-20 h-20 object-contain rounded"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h2>
          <p className="text-blue-600 font-bold">
            {product.currency} {product.lowestPrice}
          </p>
          <p className="text-sm text-gray-500">
            compare {product.offers?.length} online shops
          </p>
        </div>
      </div>

      {/* Right - Offers */}
      <div className="flex flex-wrap gap-2">
        {product.offers.slice(0, 3).map((offer, index) => (
          <a
            key={index}
            href={offer.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded border text-sm hover:bg-gray-100 transition"
          >
            <Image
              src={offer.storeLogo}
                    alt={offer.storeName}
                    fill
              className="w-5 h-5 object-contain"
            />
            <span className="text-gray-800 font-medium">
              {offer.price} {product.currency}
            </span>
            <span className="ml-2 text-green-600 font-semibold">Go →</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductRowCard;
