"use client";

import Image from "next/image";
import { ChevronRight, Zap, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function HeroSection() {
  return (
    <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-50 to-white">
      <div className="relative z-20 container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="text-left">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-blue-600 text-white">
              <Zap className="h-3 w-3 mr-1" />
              FLASH DEAL
            </Badge>
            <Badge className="bg-yellow-400 text-blue-900 font-bold">
              <Clock className="h-3 w-3 mr-1" />
              04:23:45
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-blue-900">
            Save Up To <span className="text-yellow-500">40%</span>
            <br />
            On Electronics
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 mb-6">
            Compare prices from{" "}
            <span className="text-yellow-500 font-bold">50+ retailers</span>{" "}
            instantly.
            <br />
            Find the lowest prices guaranteed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-200">
              Start Saving Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white px-8 py-3 text-lg transition-all duration-200"
            >
              Browse Deals
            </Button>
          </div>

          {/* Static Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-500">50K+</div>
              <div className="text-xs text-gray-500">Happy Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">500+</div>
              <div className="text-xs text-gray-500">Retailers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-500">$2.5M</div>
              <div className="text-xs text-gray-500">Saved Total</div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="max-w-sm  min-h-[500px] ms-40 bg-white rounded-2xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-yellow-400 text-blue-900 font-bold">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  TRENDING
                </Badge>
                <Badge className="bg-blue-600 text-white">Save $100</Badge>
              </div>

              <Image
                src="/earpod2.avif"
                alt="Featured Product"
                width={400}
                height={300}
                className="w-full h-[300px] object-cover rounded-lg mb-4"
              />

              <h3 className="text-xl font-bold mb-2 text-blue-900">
                Wireless Earbuds
              </h3>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-yellow-500">
                    $999
                  </span>
                  <span className="text-lg text-gray-500 line-through ml-2">
                    $1299
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  BestBuy
                </Badge>
              </div>

              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 transition-all duration-200">
                View Deal
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
