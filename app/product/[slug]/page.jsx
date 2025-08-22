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
  ShoppingCart,
  Clock,
  Truck,
  Shield,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Store,
  Calendar,
  Eye,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import products from "@/data/products.json";

function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("prices");
  const [priceAlertEmail, setPriceAlertEmail] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const foundProduct = products.find((p) => p.slug === params.slug);
    setProduct(foundProduct || null);
  }, [params.slug]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);

  const sortedOffers = useMemo(() => {
    if (!product?.offers) return [];
    return [...product.offers].sort((a, b) =>
      sortBy === "price"
        ? a.price - b.price
        : sortBy === "source"
        ? a.source.localeCompare(b.source)
        : 0
    );
  }, [product, sortBy]);

  const bestOffer = sortedOffers?.[0];
  const savings = useMemo(() => {
    if (!product?.offers) return 0;
    const maxPrice = Math.max(...product.offers.map((o) => o.price));
    return maxPrice - (bestOffer?.price || 0);
  }, [product, bestOffer]);

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-bold text-gray-200">Product Not Found</h1>
      </div>
    );

  const displayedOffers = showAllOffers
    ? sortedOffers
    : sortedOffers.slice(0, 3);

  const imageUrl = product.images?.[selectedImage] || product.image;

  return (
    <div className="pt-7 min-h-screen bg-black">
      <div className="bg-black border-b">
        <div className="container mx-auto  py-2">
          <div className="flex items-center space-x-2 text-sm text-gray-200">
            <span className="text-blue-600 hover:underline cursor-pointer">
              Home
            </span>
            <span>›</span>
            <span className="text-blue-600 hover:underline cursor-pointer">
              {product.category}
            </span>
            <span>›</span>
            <span className="truncate max-w-xs">{product.name}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto  py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Product Media */}
          <div className="lg:col-span-1 space-y-4">
            {/* Thumbnail */}
            <div
              className="relative aspect-square bg-gray-50 rounded-md overflow-hidden cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-contain p-4 transition-transform duration-200 hover:scale-105"
                priority
              />
            </div>

            {/* Modal for larger view */}
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-5 right-5 text-white hover:text-gray-300"
                >
                  <X size={32} />
                </button>
                <div className="relative w-full max-w-3xl aspect-square">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain max-h-[700px]"
                  />
                </div>
              </div>
            )}

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`shrink-0 w-12 h-12 rounded-sm border transition-colors ${
                      idx === selectedImage
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      width={48}
                      height={48}
                      className="object-contain w-full h-full p-0.5"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Ratings & Views */}
            <div className="bg-black p-3 rounded-md border border-gray-100">
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{product.rating}</span>
                <span className="text-gray-500">
                  ({product.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <Eye className="w-4 h-4" />
                <span>2.3k views today</span>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs gap-1 bg-black text-white"
              >
                <Share2 className="w-3 h-3" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs gap-1 bg-black text-white"
              >
                <BarChart3 className="w-3 h-3" />
                History
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-black text-white text-xs gap-1"
              >
                <Bell className="w-3 h-3" />
                Alert
              </Button>
            </div>
          </div>

          {/* Right Column - Product Info & Pricing */}
          <div className="lg:col-span-2 space-y-4">
            {/* Product Title & Basic Info */}
            <div>
              <h1 className="text-2xl font-bold text-gray-200 mb-1">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-200 mb-3">
                <span className="bg-black px-2 py-1 rounded">
                  {product.category}
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  In Stock
                </span>
                {product.isPopular && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Popular
                  </span>
                )}
              </div>
            </div>

            {/* Price Comparison Card */}
            <div className="bg-black p-4 rounded-md border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-600 flex items-center justify-center">
                    <CheckCircle className="text-white w-2.5 h-2.5" />
                  </span>
                  <span className="text-green-600 text-sm font-medium">
                    Best Price
                  </span>
                </div>
                <span className="text-gray-500 text-xs">
                  from {product.offers?.length || 1} shops
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold text-gray-200">
                  {formatPrice(bestOffer?.price || product.price)}
                </span>
                <span className="text-xs text-gray-500">
                  + {formatPrice(bestOffer?.shipping || 0)} shipping
                </span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Button
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium"
                  onClick={() => window.open(bestOffer?.url, "_blank")}
                >
                  Buy at {bestOffer?.source || "Retailer"}
                </Button>
                <button className="text-gray-500 hover:text-blue-500 text-xs flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  Save
                </button>
              </div>
            </div>

            {/* Variants */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.colors && product.colors.length > 0 && (
                <div className="bg-black p-3 rounded-md border border-gray-200">
                  <h4 className="text-xs font-medium text-gray-500 mb-2">
                    OTHER PRODUCTS
                  </h4>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        className={`shrink-0 w-12 h-12 rounded-sm border transition-colors ${
                          (product.selectedColor || product.colors[0].name) ===
                          color.name
                            ? "border-blue-500"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        title={color.name}
                      >
                        <Image
                          src={color.images[0]}
                          alt={color.name}
                          width={48}
                          height={48}
                          className="object-contain w-full h-full p-0.5"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-black p-3 rounded-md border border-gray-200">
                <h4 className="text-xs font-medium text-gray-500 mb-2">
                  STORAGE
                </h4>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded">
                    6GB + 128GB
                  </button>
                  <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:border-blue-500">
                    8GB + 128GB
                  </button>
                </div>
              </div>
            </div>

            {/* Price Insights */}
            <div className="bg-black p-3 rounded-md border border-gray-200">
              <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Price Insights
              </h4>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-500">Market Average</div>
                  <div className="font-medium">
                    {formatPrice(
                      product.offers && product.offers.length > 0
                        ? product.offers.reduce(
                            (sum, offer) => sum + offer.price,
                            0
                          ) / product.offers.length
                        : product.price
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Price Range</div>
                  <div className="font-medium">
                    {formatPrice(
                      Math.min(
                        ...(product.offers?.map((o) => o.price) || [
                          product.price,
                        ])
                      )
                    )}{" "}
                    -{" "}
                    {formatPrice(
                      Math.max(
                        ...(product.offers?.map((o) => o.price) || [
                          product.price,
                        ])
                      )
                    )}
                  </div>
                </div>
              </div>

              {bestOffer &&
              bestOffer.price <
                product.offers?.reduce((sum, offer) => sum + offer.price, 0) /
                  (product.offers?.length || 1) ? (
                <div className="mt-3 p-2 bg-green-50 rounded text-xs text-green-700">
                  Good deal:{" "}
                  {Math.round(
                    ((product.offers?.reduce(
                      (sum, offer) => sum + offer.price,
                      0
                    ) /
                      (product.offers?.length || 1) -
                      bestOffer.price) /
                      (product.offers?.reduce(
                        (sum, offer) => sum + offer.price,
                        0
                      ) /
                        (product.offers?.length || 1))) *
                      100
                  )}
                  % below average
                </div>
              ) : (
                <div className="mt-3 p-2 bg-yellow-50 rounded text-xs text-yellow-700">
                  Price alert: Consider waiting for better deals
                </div>
              )}
            </div>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="bg-black p-3 rounded-md border border-gray-100">
                <h4 className="font-medium text-sm mb-2">Key Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {product.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-2 sm:p-4">
          <div className="space-y-4 sm:space-y-6">
            {/* Tabs Section */}
            <div className="bg-black rounded-lg shadow-sm border mb-8">
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  {[
                    { id: "prices", label: "Price Comparison", icon: Store },
                    {
                      id: "description",
                      label: "Description",
                      icon: AlertCircle,
                    },
                    { id: "specs", label: "Specifications", icon: Shield },
                    {
                      id: "history",
                      label: "Price History",
                      icon: TrendingUp,
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`px-6 py-3 font-medium whitespace-nowrap flex items-center gap-2 ${
                        activeTab === tab.id
                          ? "border-b-2 border-blue-500 text-blue-600"
                          : "text-gray-200 hover:text-gray-200"
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
                  <div className="px-2 sm:px-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                      <h3 className="text-lg font-semibold">
                        Compare prices from {product.offers?.length || 0} stores
                      </h3>
                      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <span className="text-sm text-gray-200  whitespace-nowrap">
                          Sort by:
                        </span>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="px-3 py-1 border rounded-md bg-black text-sm w-full sm:w-auto"
                        >
                          <option value="price">Price (Low to High)</option>
                          <option value="source">Store Name</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {displayedOffers?.map((offer, index) => (
                        <motion.div
                          key={`${offer.source}-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card
                            className={`${
                              index === 0 ? "ring-2 ring-green-500" : ""
                            } hover:shadow-md transition-shadow bg-black`}
                          >
                            <CardContent className="p-3 sm:p-4">
                              <div className="flex flex-col  sm:flex-row items-start sm:items-center justify-between gap-3">
                                <div className="flex items-start sm:items-center gap-3 w-full">
                                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                                    {offer.logo ? (
                                      <Image
                                        src={offer.logo}
                                        alt={offer.source}
                                        width={32}
                                        height={32}
                                        className="object-contain"
                                      />
                                    ) : (
                                      <Store className="w-5 h-5 text-gray-200" />
                                    )}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h4 className="font-semibold text-base leading-tight line-clamp-1">
                                      {offer.source}
                                    </h4>
                                    <p className="text-sm text-gray-200 leading-tight line-clamp-1 sm:line-clamp-2">
                                      {offer.description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                      <div className="flex items-center gap-1">
                                        <Truck className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                        <span className="text-xs text-gray-500">
                                          {offer.delivery}
                                        </span>
                                      </div>
                                      {offer.isOfficialStore && (
                                        <Badge
                                          variant="secondary"
                                          className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5"
                                        >
                                          Official Store
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="w-full sm:w-auto sm:text-right flex-shrink-0">
                                  <div className="flex sm:flex-col items-end sm:items-end justify-between gap-2 sm:gap-1">
                                    <div className="flex items-center gap-1 sm:justify-end">
                                      {index === 0 && (
                                        <Badge className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5">
                                          Best Price
                                        </Badge>
                                      )}
                                      <div className="text-xl font-bold text-gray-200 whitespace-nowrap">
                                        {formatPrice(offer.price)}
                                      </div>
                                    </div>

                                    {offer.discount && (
                                      <div className="text-sm text-red-500 whitespace-nowrap">
                                        {offer.discount}% OFF
                                      </div>
                                    )}
                                  </div>

                                  <div className="mt-2 sm:mt-3 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        window.open(offer.url, "_blank")
                                      }
                                      className="bg-blue-600 hover:bg-blue-700 text-xs px-2 py-1 h-7 whitespace-nowrap"
                                    >
                                      <ExternalLink className="w-3 h-3 mr-1" />
                                      Buy now
                                    </Button>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                      <Clock className="w-3 h-3 flex-shrink-0" />
                                      <span>Updated 23 hrs ago</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}

                      {sortedOffers.length > 3 && (
                        <Button
                          variant="outline"
                          className="w-full mt-4"
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
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold mb-4">
                      Product Description
                    </h3>
                    <p className="mb-4">
                      {expandedDescription
                        ? product.description
                        : `${product.description.substring(0, 300)}...`}
                    </p>

                    {product.description.length > 300 && (
                      <Button
                        variant="link"
                        className="px-0 text-blue-600"
                        onClick={() =>
                          setExpandedDescription(!expandedDescription)
                        }
                      >
                        {expandedDescription ? "Show Less" : "Read More"}
                      </Button>
                    )}

                    {product.features && product.features.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold text-lg mb-3">
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {product.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "specs" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Specifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.specifications?.map((spec, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between py-3 border-b border-gray-100"
                        >
                          <span className="text-gray-200 font-medium">
                            {spec.name}
                          </span>
                          <span className="text-gray-200 text-right max-w-[60%]">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "history" && (
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Price History</h3>
                      <div className="flex items-center gap-3 mt-2 md:mt-0">
                        <div className="flex items-center gap-1 text-sm">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>Current Price</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Lowest Price</span>
                        </div>
                      </div>
                    </div>

                    {/* Price Analysis */}
                    <Card className="mt-6">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          Price Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="border rounded-lg p-4">
                            <div className="text-sm text-gray-200 mb-1">
                              Current Price
                            </div>
                            <div className="text-xl font-bold">
                              {formatPrice(bestOffer?.price || product.price)}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              Best offer from {bestOffer?.source}
                            </div>
                          </div>

                          <div className="border rounded-lg p-4">
                            <div className="text-sm text-gray-200 mb-1">
                              Average Price
                            </div>
                            <div className="text-xl font-bold">
                              {formatPrice(
                                product.offers?.reduce(
                                  (sum, offer) => sum + offer.price,
                                  0
                                ) / (product.offers?.length || 1)
                              )}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              Across {product.offers?.length || 0} stores
                            </div>
                          </div>

                          <div className="border rounded-lg p-4">
                            <div className="text-sm text-gray-200 mb-1">
                              Price Drop
                            </div>
                            {product.priceHistory &&
                            product.priceHistory.length > 1 ? (
                              <>
                                <div className="text-xl font-bold flex items-center">
                                  {formatPrice(
                                    product.priceHistory[0].price -
                                      product.priceHistory[
                                        product.priceHistory.length - 1
                                      ].price
                                  )}
                                  <ArrowDownRight className="w-5 h-5 text-green-500 ml-1" />
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                  Since{" "}
                                  {
                                    product.priceHistory[
                                      product.priceHistory.length - 1
                                    ].date
                                  }
                                </div>
                              </>
                            ) : (
                              <div className="text-gray-500">
                                No data available
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-6">
                          <h4 className="font-medium mb-2">
                            Price Recommendations
                          </h4>
                          <div className="flex items-center gap-2 text-sm">
                            {bestOffer &&
                            bestOffer.price < product.averagePrice ? (
                              <>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>
                                  This is a good deal! Current price is below
                                  average
                                </span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-4 h-4 text-yellow-500" />
                                <span>
                                  Consider waiting - price is higher than
                                  average
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
