"use client";

import { Shield, Lock, Award, CheckCircle, Star, Users } from "lucide-react";

export function TrustBadges() {
  const badges = [
    { icon: Shield, text: "SSL Secured", color: "text-green-400" },
    { icon: Award, text: "Verified Retailers", color: "text-blue-400" },
    { icon: CheckCircle, text: "Price Guarantee", color: "text-green-400" },
    { icon: Star, text: "4.9/5 Rating", color: "text-yellow-400" },
    { icon: Users, text: "50k+ Users", color: "text-purple-400" },
    { icon: Lock, text: "Safe Checkout", color: "text-green-400" },
  ];

  return (
    <section className="py-2 bg-gray-950 border-y border-gray-800 mb-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 sm:gap-8 overflow-x-auto">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-2 min-w-fit">
              <badge.icon className={`h-4 w-4 ${badge.color}`} />
              <span className="text-xs text-gray-300 whitespace-nowrap">
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
