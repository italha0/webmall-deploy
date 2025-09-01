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
// I assume fetchFromApi is a utility function you've created.
import { fetchFromApi } from "@/lib/api";

// Helper function to get a clean platform name from a URL
const getPlatformName = (url) => {
  if (!url) return "Retailer";
  try {
    const hostname = new URL(url).hostname;
    const parts = hostname.replace("www.", "").split(".");
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  } catch (e) {
    return "Retailer"; // Fallback for invalid URLs
  }
};

function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("prices");
  const [sortBy, setSortBy] = useState("price");
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!params.slug) return;

    const getProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch a single product by its slug
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

  const selectedVariation = useMemo(() => {
    return product?.variations?.[selectedVariationIndex];
  }, [product, selectedVariationIndex]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);

  const sortedOffers = useMemo(() => {
    if (!selectedVariation?.platforms) return [];

    // Map platform data to a structure similar to the old 'offers'
    const offers = selectedVariation.platforms.map((p) => ({
      source: getPlatformName(p.url),
      price: parseFloat(p.selling_price),
      url: p.url,
      discount: p.discount,
      description: `Discount of ${p.discount}% on this platform.`, // Placeholder description
      delivery: "Standard Delivery", // Placeholder
      logo: null, // You might need to map platform_id to a logo URL
    }));

    return [...offers].sort((a, b) =>
      sortBy === "price"
        ? a.price - b.price
        : sortBy === "source"
        ? a.source.localeCompare(b.source)
        : 0
    );
  }, [selectedVariation, sortBy]);

  const bestOffer = sortedOffers?.[0];

  const averagePrice = useMemo(() => {
    if (!sortedOffers || sortedOffers.length === 0) return 0;
    const total = sortedOffers.reduce((sum, offer) => sum + offer.price, 0);
    return total / sortedOffers.length;
  }, [sortedOffers]);

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

  // Construct full image URLs if they are relative paths
  const getImageUrl = (path) => {
    if (!path) return "/placeholder.png"; // A fallback image
    // Replace with your actual base URL if needed
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    return `${BASE_URL}/${path}`;
  };

  const allImages =
    product.all_images?.map((img) => getImageUrl(img.image)) || [];
  const imageUrl = allImages[selectedImage] || getImageUrl(product.main_image);

  return (
    <div className="pt-7 min-h-screen bg-black text-gray-200">
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

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs gap-1.5 bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
              >
                <Share2 className="w-3.5 h-3.5" /> Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs gap-1.5 bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
              >
                <Bell className="w-3.5 h-3.5" /> Price Alert
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs gap-1.5 bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
              >
                <Heart className="w-3.5 h-3.5" /> Save
              </Button>
            </div>
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

            {/* Variations */}
            {product.variations && product.variations.length > 0 && (
              <div className="bg-black p-4 rounded-lg border border-gray-700">
                <h4 className="text-sm font-medium text-gray-400 mb-3">
                  Available Variations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.variations.map((variation, index) => (
                    <button
                      key={variation.id}
                      onClick={() => setSelectedVariationIndex(index)}
                      className={`px-4 py-2 text-sm rounded-md transition-colors border ${
                        index === selectedVariationIndex
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-800 border-gray-600 hover:bg-gray-700"
                      }`}
                    >
                      {variation.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Comparison Card */}
            {bestOffer ? (
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
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
            )}

            {/* Price Insights */}
            {sortedOffers.length > 0 && (
              <div className="bg-black p-4 rounded-lg border border-gray-700">
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

        {/* Tabs Section */}
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
            {activeTab === "prices" && (
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                  <h3 className="text-xl font-semibold">
                    Compare prices from {sortedOffers.length} stores
                  </h3>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-sm text-gray-400 whitespace-nowrap">
                      Sort by:
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1.5 border border-gray-600 rounded-md bg-gray-800 text-sm w-full sm:w-auto focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="price">Price (Low to High)</option>
                      <option value="source">Store Name</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {displayedOffers?.map((offer, index) => (
                    <motion.div
                      key={`${offer.source}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        className={`hover:shadow-lg transition-shadow bg-gray-900 border-gray-700 ${
                          index === 0 ? "ring-2 ring-green-500" : ""
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Store className="w-6 h-6 text-gray-400" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-semibold text-lg text-white truncate">
                                  {offer.source}
                                </h4>
                                <div className="flex items-center gap-1.5 mt-1">
                                  <Truck className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                  <span className="text-xs text-gray-400">
                                    {offer.delivery}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between gap-2 pl-0 md:pl-4">
                              <div className="text-right">
                                <div className="text-xl font-bold text-white whitespace-nowrap">
                                  {formatPrice(offer.price)}
                                </div>
                                {offer.discount && (
                                  <div className="text-sm text-red-500 whitespace-nowrap">
                                    {offer.discount}% OFF
                                  </div>
                                )}
                              </div>
                              <Button
                                size="sm"
                                onClick={() => window.open(offer.url, "_blank")}
                                className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1.5 h-8 whitespace-nowrap"
                              >
                                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                                Buy now
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                  {sortedOffers.length > 3 && (
                    <Button
                      variant="outline"
                      className="w-full mt-6 bg-gray-800 border-gray-600 hover:bg-gray-700"
                      onClick={() => setShowAllOffers(!showAllOffers)}
                    >
                      {showAllOffers ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-2" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-2" />
                          Show All {sortedOffers.length} Offers
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            )}

            {activeTab === "description" && (
              <div className="prose prose-invert max-w-none text-gray-300">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Product Description
                </h3>
                <p>
                  {expandedDescription
                    ? product.description
                    : `${product.description.substring(0, 300)}${
                        product.description.length > 300 ? "..." : ""
                      }`}
                </p>

                {product.description.length > 300 && (
                  <Button
                    variant="link"
                    className="px-0 text-blue-500 hover:text-blue-400"
                    onClick={() => setExpandedDescription(!expandedDescription)}
                  >
                    {expandedDescription ? "Show Less" : "Read More"}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
