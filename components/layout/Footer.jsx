import React from "react";
import { Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#383838] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-4 lg:space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                width={150}
                height={50}
                alt="footer logo"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your one-stop shop for quality products, exceptional service, and
              fast delivery.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <MapPin size={16} className="flex-shrink-0" />
                <span>Andheri West, Mumbai</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Mail size={16} className="flex-shrink-0" />
                <span>info@webmall.ae</span>
              </div>
            </div>
          </div>

          {/* Categories - Enhanced for Mobile */}
          <div className="hidden md:block space-y-3 lg:space-y-4">
            <h3 className="text-base lg:text-lg font-semibold text-white border-b border-gray-600 pb-2 lg:border-b-0 lg:pb-0">
              Categories
            </h3>
            <ul className="grid grid-cols-2 gap-2 lg:block lg:space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors text-sm py-1 px-2 lg:px-0 rounded bg-gray-700 lg:bg-transparent text-center lg:text-left"
                >
                  Electronics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors text-sm py-1 px-2 lg:px-0 rounded bg-gray-700 lg:bg-transparent text-center lg:text-left"
                >
                  Home Appliance
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Links - Enhanced for Mobile */}
          <div className="hidden md:block space-y-3 lg:space-y-4">
            <h3 className="text-base lg:text-lg font-semibold text-white border-b border-gray-600 pb-2 lg:border-b-0 lg:pb-0">
              Useful Links
            </h3>
            <ul className="grid grid-rows-2 gap-2 lg:block lg:space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors text-sm py-1 px-2 lg:px-0 rounded bg-gray-700 lg:bg-transparent text-center lg:text-left"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors text-sm py-1 px-2 lg:px-0 rounded bg-gray-700 lg:bg-transparent text-center lg:text-left"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors text-sm py-1 px-2 lg:px-0 rounded bg-gray-700 lg:bg-transparent text-center lg:text-left"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors text-sm py-1 px-2 lg:px-0 rounded bg-gray-700 lg:bg-transparent text-center lg:text-left"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info - Enhanced for Mobile */}
          <div className="space-y-4 lg:space-y-4">
            <h3 className="text-base lg:text-lg font-semibold text-white border-b border-gray-600 pb-2 lg:border-b-0 lg:pb-0">
              Contact Us
            </h3>
            <div className="space-y-4">
              {/* Hotline */}
              <div className="bg-gray-700 lg:bg-transparent p-3 lg:p-0 rounded-lg">
                <p className="text-gray-300 text-xs lg:text-sm mb-2">
                  Hotline 24/7:
                </p>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-gray-300 flex-shrink-0" />
                  <span className="text-white font-medium text-sm lg:text-base">
                    +91 888 104 2340
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gray-700 lg:bg-transparent p-3 lg:p-0 rounded-lg lg:border-t lg:border-gray-600 lg:pt-3">
                <p className="text-gray-300 text-xs lg:text-sm mb-2">
                  Email Address:
                </p>
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-gray-300 flex-shrink-0" />
                  <span className="text-white text-sm lg:text-base">
                    info@webmall.ae
                  </span>
                </div>
              </div>

              {/* Download App */}
              <div className="bg-gray-700 lg:bg-transparent p-3 lg:p-0 rounded-lg lg:border-t lg:border-gray-600 lg:pt-3">
                <p className="text-gray-300 text-xs lg:text-sm mb-3">
                  Download App:
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a href="#" className="inline-block">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      width={50}
                      height={50}
                      className="h-8 lg:h-10 w-auto"
                    />
                  </a>
                  <a href="#" className="inline-block">
                    <Image
                      width={50}
                      height={50}
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                      alt="Download on the App Store"
                      className="h-8 lg:h-10 w-auto"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Enhanced for Mobile */}
      <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
            {/* Copyright */}
            <div className="text-gray-300 text-xs lg:text-sm text-center lg:text-left">
              ©2025 Webmall All rights reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
