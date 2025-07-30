import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const MobileCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef(null);
  const autoPlayRef = useRef(null);
  const touchStartTimeRef = useRef(0);

    const banners = [
      { id: 1, image: "/mobilecarousel1.avif" },
      { id: 2, image: "/ad1.avif" },
      { id: 3, image: "/mobilecarousel2.avif" },
    ];

  const totalSlides = banners.length;

  // Improved auto-play with cleanup
  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);
  }, [totalSlides]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isAutoPlaying) startAutoPlay();
    return stopAutoPlay;
  }, [isAutoPlaying, startAutoPlay, stopAutoPlay]);

  // Touch/Mouse event handlers with velocity detection
  const handleStart = (clientX) => {
    setIsDragging(true);
    setDragStart(clientX);
    setDragOffset(0);
    touchStartTimeRef.current = Date.now();
    stopAutoPlay();
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  };

  const handleEnd = () => {
    if (!isDragging) return;

    const touchDuration = Date.now() - touchStartTimeRef.current;
    const velocity = Math.abs(dragOffset) / touchDuration;
    const threshold = velocity > 0.3 ? 30 : 80; // Dynamic threshold based on swipe speed

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      } else {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    setIsAutoPlaying(true);
  };

  // Event handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientX);
  };

  // Calculate transform with spring effect
  const getTransform = () => {
    if (!containerRef.current) return `translateX(0%)`;

    const containerWidth = containerRef.current.offsetWidth;
    const baseTransform = -currentIndex * 100;
    const dragPercentage = (dragOffset / containerWidth) * 100;

    // Apply easing when dragging
    const easedDrag = isDragging ? dragPercentage * 0.7 : 0;

    return `translateX(calc(${baseTransform}% + ${easedDrag}%))`;
  };

  // Navigation controls
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(true);
  };

  return (
    <div className="relative w-full bg-white overflow-hidden h-[182px]">
      {/* Main Carousel Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden bg-gray-100 rounded-lg"
        style={{ paddingBottom: "45.33%" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchEnd={handleEnd}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onMouseMove={(e) => {
          if (isDragging) handleMove(e.clientX);
        }}
      >
        {/* Slides Container */}
        <div
          className="absolute inset-0 flex transition-transform duration-300 ease-out"
          style={{
            transform: getTransform(),
            cursor: isDragging ? "grabbing" : "grab",
            transition: isDragging
              ? "none"
              : "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className="relative flex-shrink-0 w-full h-full"
              onClick={(e) => {
                if (isDragging || Math.abs(dragOffset) > 10) {
                  e.preventDefault();
                  return;
                }
                // Handle banner click
              }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={banner.image}
                  alt={`Banner ${index + 1}`}
                  fill
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-blue-500 w-4" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileCarousel;
