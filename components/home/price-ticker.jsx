"use client"

import { useState } from "react"
import { TrendingDown, TrendingUp } from "lucide-react"



export function PriceTicker() {
  const [tickerData] = useState([
    {
      name: 'Apple iPad Pro 12.9"',
      currentPrice: 999,
      priceChange: -50,
      percentageChange: -4.8,
      symbol: "IPAD-PRO",
    },
    {
      name: "MacBook Air M3",
      currentPrice: 1099,
      priceChange: -100,
      percentageChange: -8.3,
      symbol: "MBA-M3",
    },
    {
      name: "iPhone 15 Pro Max",
      currentPrice: 1199,
      priceChange: +25,
      percentageChange: +2.1,
      symbol: "IP15-PM",
    },
    {
      name: "AirPods Pro 2nd Gen",
      currentPrice: 199,
      priceChange: -30,
      percentageChange: -13.1,
      symbol: "APP-2G",
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      currentPrice: 1099,
      priceChange: -200,
      percentageChange: -15.4,
      symbol: "SGS24-U",
    },
    {
      name: "Sony WH-1000XM5",
      currentPrice: 299,
      priceChange: -50,
      percentageChange: -14.3,
      symbol: "WH1000XM5",
    },
    {
      name: "Nintendo Switch OLED",
      currentPrice: 299,
      priceChange: -20,
      percentageChange: -6.3,
      symbol: "NSW-OLED",
    },
    {
      name: "Apple Watch Series 9",
      currentPrice: 349,
      priceChange: -50,
      percentageChange: -12.5,
      symbol: "AW-S9",
    },
    {
      name: "Dell XPS 13",
      currentPrice: 899,
      priceChange: +49,
      percentageChange: +5.8,
      symbol: "XPS-13",
    },
    {
      name: "Google Pixel 8 Pro",
      currentPrice: 799,
      priceChange: -100,
      percentageChange: -11.1,
      symbol: "PIX8-P",
    },
  ])

  return (
    <div className="bg-gray-950 border-y border-gray-800 py-4 overflow-hidden relative">
      <div className="flex animate-scroll whitespace-nowrap" style={{ animation: "scroll 20s linear infinite" }}>
        {/* First set of items */}
        {tickerData.map((item, index) => (
          <div key={`first-${index}`} className="inline-flex items-center mx-4 text-sm">
            <span className="text-gray-300 font-mono mr-2">{item.symbol}</span>
            <span className="text-white font-semibold mr-2">${item.currentPrice}</span>
            <div className="flex items-center">
              {item.priceChange >= 0 ? (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              ) : (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              )}
              <span className={`font-mono ${item.priceChange >= 0 ? "text-red-500" : "text-green-500"}`}>
                {item.priceChange >= 0 ? "+" : ""}${item.priceChange}
              </span>
              <span className={`font-mono ml-1 ${item.priceChange >= 0 ? "text-red-500" : "text-green-500"}`}>
                ({item.percentageChange >= 0 ? "+" : ""}
                {item.percentageChange.toFixed(1)}%)
              </span>
            </div>
          </div>
        ))}
        {/* Duplicate set for seamless scrolling */}
        {tickerData.map((item, index) => (
          <div key={`second-${index}`} className="inline-flex items-center mx-4 text-sm">
            <span className="text-gray-300 font-mono mr-2">{item.symbol}</span>
            <span className="text-white font-semibold mr-2">${item.currentPrice}</span>
            <div className="flex items-center">
              {item.priceChange >= 0 ? (
                <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
              )}
              <span className={`font-mono ${item.priceChange >= 0 ? "text-red-500" : "text-green-500"}`}>
                {item.priceChange >= 0 ? "+" : ""}${item.priceChange}
              </span>
              <span className={`font-mono ml-1 ${item.priceChange >= 0 ? "text-red-500" : "text-green-500"}`}>
                ({item.percentageChange >= 0 ? "+" : ""}
                {item.percentageChange.toFixed(1)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
