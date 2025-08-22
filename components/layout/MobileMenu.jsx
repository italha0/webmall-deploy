"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { fetchFromApi } from "@/lib/api";

// Custom hook to fetch categories
const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchFromApi("/api/get_category_list");

        //MGroup categories by parent to create the same structure as your JSON
        const groupedCategories = response.data.reduce((acc, category) => {
          const parentName = category.parent_name || "Other";
          if (!acc[parentName]) {
            acc[parentName] = {
              name: parentName,
              slug: category.parent_name
                ? parentName.toLowerCase().replace(/\s+/g, "-")
                : "other",
              subcategories: [],
            };
          }
          acc[parentName].subcategories.push({
            name: category.name,
            slug: category.slug,
          });
          return acc;
        }, {});

        setCategories(Object.values(groupedCategories));
        setLoading(false);
      } catch (error) {
        console.error("Failed to load categories:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return { categories, loading, error };
};

const MobileMenu = ({ isOpen, onClose }) => {
  const { categories, loading, error } = useCategories();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const router = useRouter();

  const handleCategoryClick = (category) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setBreadcrumb([
        ...breadcrumb,
        { category, subcategory: currentSubcategory },
      ]);
      setCurrentCategory(category);
      setCurrentSubcategory(null);
    } else {
      router.push(
        `/products/${
          category.slug || category.name.toLowerCase().replace(/\s+/g, "-")
        }`
      );
      handleClose();
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    if (subcategory.subcategories && subcategory.subcategories.length > 0) {
      setBreadcrumb([
        ...breadcrumb,
        { category: currentCategory, subcategory },
      ]);
      setCurrentSubcategory(subcategory);
    } else {
      router.push(
        `/products/${
          subcategory.slug ||
          subcategory.name.toLowerCase().replace(/\s+/g, "-")
        }`
      );
      handleClose();
    }
  };

  const handleBack = () => {
    if (breadcrumb.length > 0) {
      const lastItem = breadcrumb[breadcrumb.length - 1];
      setBreadcrumb(breadcrumb.slice(0, -1));
      setCurrentCategory(lastItem.category);
      setCurrentSubcategory(lastItem.subcategory);
    } else {
      setCurrentCategory(null);
      setCurrentSubcategory(null);
    }
  };

  const handleClose = () => {
    setCurrentCategory(null);
    setCurrentSubcategory(null);
    setBreadcrumb([]);
    onClose();
  };

  if (!isOpen) return null;

  // Determine what to show based on navigation state
  let currentItems = [];
  let title = "Categories";

  if (currentSubcategory) {
    currentItems = currentSubcategory.subcategories || [];
    title = currentSubcategory.name;
  } else if (currentCategory) {
    currentItems = currentCategory.subcategories || [];
    title = currentCategory.name;
  } else {
    currentItems = categories;
  }

  const showBack = currentCategory !== null || currentSubcategory !== null;

  if (loading) {
    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
        <div className="fixed top-0 left-0 w-[90%] h-full bg-white z-50">
          <div className="flex items-center justify-end p-4 border-b border-gray-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          <div className="p-4">Loading categories...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
        <div className="fixed top-0 left-0 w-[90%] h-full bg-white z-50">
          <div className="flex items-center justify-end p-4 border-b border-gray-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          <div className="p-4 text-red-500">
            Error loading categories: {error}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleClose}
      />

      {/* Menu Panel */}
      <div className="fixed top-0 left-0 w-[90%] h-full bg-white z-50 transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-end p-4 border-b border-gray-200">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Navigation Header */}
        {showBack && (
          <div className="flex items-center p-4 border-b border-gray-100">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800 mr-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="text-lg font-medium text-gray-700">{title}</span>
          </div>
        )}

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto">
          {currentItems.map((item, index) => {
            const hasSubcategories =
              item.subcategories && item.subcategories.length > 0;
            const isViewAll = item.name.toLowerCase().includes("all");

            return (
              <div key={item.slug || index}>
                <button
                  onClick={() =>
                    currentSubcategory
                      ? handleSubcategoryClick(item)
                      : currentCategory
                      ? handleSubcategoryClick(item)
                      : handleCategoryClick(item)
                  }
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <span
                    className={`text-gray-700 ${
                      isViewAll ? "font-medium" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                  {hasSubcategories && !isViewAll && (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {index < currentItems.length - 1 && (
                  <div className="border-b border-gray-100 mx-4" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
