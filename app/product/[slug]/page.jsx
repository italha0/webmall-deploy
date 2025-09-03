"use client";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  X,
  Share2,
  TrendingUp,
  Bell,
  ExternalLink,
  Clock,
  Truck,
  Shield,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Store,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchFromApi } from "@/lib/api";

const getPlatformName = (url) => {
  if (!url) return "Retailer";
  try {
    const hostname = new URL(url).hostname;
    const parts = hostname.replace("www.", "").split(".");
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  } catch (e) {
    return "Retailer";
  }
};

function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("prices");
  const [sortBy, setSortBy] = useState("price");
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- MODIFIED STATE ---
  // We now track selected options for each attribute (e.g., { Color: 'red', Size: 'Free Size' })
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    if (!params.slug) return;
    const getProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchFromApi(
          `/api/get_product_by_slug/${params.slug}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to load product:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [params.slug]);

  // --- NEW: Data Transformation for Variations ---
  // This hook processes the variations array once and groups options by attribute.
  // The output will be like: { Color: ['red', 'blue', 'black'], Size: ['Free Size', 'Dimension', 'small'] }
  const variationOptions = useMemo(() => {
    if (!product?.variations) return {};
    const options = {};
    product.variations.forEach((variation) => {
      for (const [key, value] of Object.entries(variation.variation_details)) {
        if (!options[key]) {
          options[key] = new Set();
        }
        options[key].add(value);
      }
    });

    const finalOptions = {};
    for (const key in options) {
      finalOptions[key] = Array.from(options[key]);
    }
    return finalOptions;
  }, [product]);

  // --- NEW: Effect to Initialize Default Selections ---
  // When the product data loads, this sets the first available option for each attribute as the default.
  useEffect(() => {
    if (product && Object.keys(variationOptions).length > 0) {
      const initialOptions = {};
      for (const type in variationOptions) {
        initialOptions[type] = variationOptions[type][0];
      }
      setSelectedOptions(initialOptions);
    }
  }, [product, variationOptions]);

  // --- MODIFIED: Find Active Variation based on Selected Options ---
  // This finds the full variation object that matches the current user selections.
  const activeVariation = useMemo(() => {
    if (!product?.variations || Object.keys(selectedOptions).length === 0)
      return null;
    return product.variations.find((v) => {
      return Object.entries(selectedOptions).every(
        ([key, value]) => v.variation_details[key] === value
      );
    });
  }, [product, selectedOptions]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);

  // --- MODIFIED: This now depends on `activeVariation` ---
  const sortedOffers = useMemo(() => {
    if (!activeVariation?.platforms) return [];

    const offers = activeVariation.platforms.map((p) => ({
      source: getPlatformName(p.url),
      price: parseFloat(p.selling_price),
      url: p.url,
      discount: p.discount,
      description: `Discount of ${p.discount}% on this platform.`,
      delivery: "Standard Delivery",
      logo: null,
    }));

    return [...offers].sort((a, b) =>
      sortBy === "price"
        ? a.price - b.price
        : sortBy === "source"
        ? a.source.localeCompare(b.source)
        : 0
    );
  }, [activeVariation, sortBy]);

  const bestOffer = sortedOffers?.[0];

  const averagePrice = useMemo(() => {
    if (!sortedOffers || sortedOffers.length === 0) return 0;
    const total = sortedOffers.reduce((sum, offer) => sum + offer.price, 0);
    return total / sortedOffers.length;
  }, [sortedOffers]);

  // --- NEW: Handler for selecting a variation option ---
  const handleOptionSelect = (type, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading product details...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        Error: {error}
      </div>
    );
  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <h1 className="text-xl font-bold text-gray-200">Product Not Found</h1>
      </div>
    );

  const displayedOffers = showAllOffers
    ? sortedOffers
    : sortedOffers.slice(0, 3);

  const getImageUrl = (path) => {
    if (!path) return "/placeholder.png";
    const BASE_URL = "https://webmall.webwork.co.in/";
    return `${BASE_URL}${path}`;
  };

  const allImages =
    product.all_images?.map((img) => getImageUrl(img.image)) || [];
  const imageUrl = allImages[selectedImage] || getImageUrl(product.main_image);

  return (
    <div className="mt-14 min-h-screen bg-black text-gray-200">
      {/* ... Breadcrumb and other unchanged JSX ... */}
      <div className="bg-black border-b border-gray-700">
        <div className="container mx-auto py-2">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span className="text-blue-500 hover:underline cursor-pointer">
              Home
            </span>
            <span>›</span>
            <span className="text-blue-500 hover:underline cursor-pointer">
              {product.categories?.[0]?.name || "Category"}
            </span>
            <span> › </span>
            <span className="truncate max-w-xs">{product.name}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Product Media */}
          <div className="lg:col-span-1 space-y-4">
            <div
              className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden cursor-pointer border border-gray-700"
              onClick={() => setIsModalOpen(true)}
            >
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-contain p-4 transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-5 right-5 text-white hover:text-gray-300 z-10"
                >
                  <X size={32} />
                </button>
                <div className="relative w-full max-w-4xl h-full max-h-[90vh]">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}

            {allImages && allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`shrink-0 w-16 h-16 rounded-md border-2 transition-colors bg-gray-900 ${
                      idx === selectedImage
                        ? "border-blue-500"
                        : "border-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      width={64}
                      height={64}
                      className="object-contain w-full h-full p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info & Pricing */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400 mb-4">
                <span className="bg-gray-800 px-2.5 py-1 rounded-full">
                  {product.categories?.[0]?.name}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  In Stock
                </span>
              </div>
            </div>

            {/* --- MODIFIED: Variations Section --- */}
            {Object.keys(variationOptions).length > 0 && (
              <div className="bg-black p-4 rounded-lg border border-gray-700 space-y-4">
                {Object.entries(variationOptions).map(([type, options]) => (
                  <div key={type}>
                    <h4 className="text-sm font-medium text-gray-400 mb-2 capitalize">
                      Select {type}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleOptionSelect(type, option)}
                          className={`px-4 py-2 text-sm rounded-md transition-colors border ${
                            selectedOptions[type] === option
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-gray-800 border-gray-600 hover:bg-gray-700"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Price Comparison Card */}
            {activeVariation ? (
              bestOffer ? (
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  {/* ... Best Offer JSX ... */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-600 text-white">
                        Best Price
                      </Badge>
                    </div>
                    <span className="text-gray-400 text-xs">
                      from {sortedOffers.length} shops
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-bold text-white">
                      {formatPrice(bestOffer.price)}
                    </span>
                    {bestOffer.discount && (
                      <span className="text-md text-red-500">
                        {bestOffer.discount}% OFF
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md text-base font-semibold"
                      onClick={() => window.open(bestOffer.url, "_blank")}
                    >
                      Go to {bestOffer.source}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center">
                  <p className="text-gray-400">
                    No price offers available for this variation.
                  </p>
                </div>
              )
            ) : (
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center">
                <p className="text-gray-400">
                  This combination is not available.
                </p>
              </div>
            )}

            {/* Price Insights */}
            {sortedOffers.length > 0 && (
              <div className="bg-black p-4 rounded-lg border border-gray-700">
                {/* ... Price Insights JSX ... */}
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Price Insights
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Market Average</div>
                    <div className="font-semibold text-lg text-white">
                      {formatPrice(averagePrice)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Price Range</div>
                    <div className="font-semibold text-lg text-white">
                      {formatPrice(sortedOffers[sortedOffers.length - 1].price)}{" "}
                      - {formatPrice(sortedOffers[0].price)}
                    </div>
                  </div>
                </div>
                {bestOffer && bestOffer.price < averagePrice ? (
                  <div className="mt-4 p-2.5 bg-green-900/50 rounded text-sm text-green-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Good deal: This price is{" "}
                    {Math.round(
                      ((averagePrice - bestOffer.price) / averagePrice) * 100
                    )}
                    % below average.
                  </div>
                ) : (
                  <div className="mt-4 p-2.5 bg-yellow-900/50 rounded text-sm text-yellow-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Price alert: Consider waiting for better deals.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {/* ... Tabs Section and other unchanged JSX ... */}
        <div className="bg-black rounded-lg shadow-sm border border-gray-700">
          <div className="border-b border-gray-700">
            <div className="flex overflow-x-auto">
              {[
                { id: "prices", label: "Price Comparison", icon: Store },
                { id: "description", label: "Description", icon: AlertCircle },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`px-6 py-4 font-medium whitespace-nowrap flex items-center gap-2 text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-400 hover:text-white border-b-2 border-transparent"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="p-6">
            {/* ... Rest of the JSX remains the same */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
