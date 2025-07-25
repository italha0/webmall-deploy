"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ShowCase = () => {
  const [timeLeft, setTimeLeft] = useState(18 * 60 + 22); // 18h 22m in minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  const formatTime = (mins) => {
    const hours = String(Math.floor(mins / 60)).padStart(2, "0");
    const minutes = String(mins % 60).padStart(2, "0");
    return `${hours}h : ${minutes}m`;
  };

  const moreShopItems = [
    {
      title: "Grocery",
      desc: "Top deals, wide selection",
      image: "/showcase1.avif",
    },
    {
      title: "Bestsellers",
      desc: "Shop our top picks",
      image: "/showcase2.avif",
    },
    {
      title: "New arrivals",
      desc: "The latest, curated for you",
      image: "/showcase2.avif",
    },
    {
      title: "Mahali",
      desc: "Support local businesses",
      image: "/showcase1.avif",
    },
  ];

  const megaDeals = [
    {
      tag: "Baby Transport deals",
      name: "UPPAbaby Rumbleseat V2",
      oldPrice: 1299,
      price: 777,
      image: "/iphone2.avif",
    },
    {
      tag: "Video Games deals",
      name: "HYPERX Cloud III – Wired Headset",
      oldPrice: 264,
      price: 234,
      image: "/earpod2.avif",
    },
    {
      tag: "Smartphones deals",
      name: "Samsung Galaxy S24 FE 8GB 512GB",
      oldPrice: 2299,
      price: 1879,
      image: "/watch1.avif",
    },
    {
      tag: "Monitors deals",
      name: "LG 24” Full HD IPS Monitor",
      oldPrice: 299,
      price: 259,
      image: "/tablet3.avif",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-8">
        {/* Section 1: More reasons to shop */}
        <div className="hidden md:block">
          <h4 className="text-2xl font-bold mb-4 text-gray-500">
            More reasons to shop
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {moreShopItems.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm p-3">
                <Image
                  src={item.image}
                  width={400}
                  height={400}
                  alt={item.title}
                  className="rounded-lg w-full object-contain h-48"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Mega deals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-500">Mega deals</h2>
            <div className="text-xs bg-black text-white px-2 py-1 rounded-md">
              ⏱ {formatTime(timeLeft)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {megaDeals.map((deal, i) => (
              <div key={i} className="bg-white rounded-lg p-2 shadow-sm">
                <span className="text-xs text-yellow-500 font-semibold">
                  {deal.tag}
                </span>
                <Image
                  src={deal.image}
                  width={200}
                  height={200}
                  alt={deal.name}
                  className="mx-auto h-24 object-contain"
                />
                <p className="text-sm mt-2 truncate">{deal.name}</p>
                <div className="flex gap-2 mt-1 items-baseline">
                  <span className="line-through text-gray-400 text-sm">
                    ${deal.oldPrice}
                  </span>
                  <span className="text-lg font-bold text-black">
                    ${deal.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: In focus */}
        <div className="flex-col gap-4 items-center justify-center">
          <div className="rounded-xl overflow-hidden ">
            <Image
              src="/ad2.avif"
              width={400}
              height={300}
              alt="Elevate your style"
            />
          </div>
          <div className="rounded-xl overflow-hidden pt-5">
            <Image
              src="/ad1.avif"
              width={400}
              height={300}
              alt="Splash Event"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowCase;
