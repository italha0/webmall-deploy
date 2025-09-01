import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge, Shield } from "lucide-react";
import Image from "next/image";

import { fetchFromApi } from "@/lib/api";

const CreditCard = () => {
  
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOffers = async () => {
      try {
        const response = await fetchFromApi('/api/get_offers_list');
        setOffers(response.data);

      } catch(error) {
        console.error("failed to load offers :", error);
        setError(error.message);
        
      }
    }
    getOffers();
  }, [])


  const creditCardOffers = [
    {
      bank: "Citi Bank",
      cardType: "Rewards+",
      discount: "5% Extra",
      category: "Headphones",
      retailer: "Amazon",
      color: "bg-blue-600",
      icon: "🏦",
      terms: "Valid on purchases above $100.",
    },
    {
      bank: "Chase",
      cardType: "Freedom",
      discount: "3% Back",
      category: "Electronics",
      retailer: "Noon",
      color: "bg-blue-700",
      icon: "💳",
      terms: "Unlimited 3% cashback on electronics.",
    },
    {
      bank: "AmEx",
      cardType: "Gold",
      discount: "4x Points",
      category: "Tech",
      retailer: "Emax",
      color: "bg-yellow-600",
      icon: "💎",
      terms: "4x points on tech purchases.",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {offers.map((offer, index) => (
        <Card
          key={index}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20"
        >
          <CardContent className="p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded ${offer.color} bg-opacity-20`}>
                  <Image src={`https://webmall.webwork.co.in/${offer.icon}`} alt={offer.title} height={30} width={30}/>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">
                    {offer.title}
                  </h4>
                  <p className="text-xs text-gray-400">{offer.subtitle}</p>
                </div>
              </div>
              {/* <Badge className="bg-gradient-to-r from-green-600 to-green-500 text-white border-green-600/30 text-xs animate-pulse">
                {offer.discount}
              </Badge> */}
            </div>
            <p className="text-xs text-gray-500">{offer.content}</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-green-400">
              <Shield className="h-3 w-3" />
              <span>Verified Partner</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CreditCard;
