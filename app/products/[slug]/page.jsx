import React from "react";
import ProductListPage from "@/components/products/ProductListPage";

// Fetch categories from API instead of local JSON for generateStaticParams
export async function generateStaticParams() {
  try {
    // Replace with your actual API call
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get_category_list`
    );
    const categories = await response.json();

    const params = [];

    // Handle both categories and subcategories
    categories.forEach((category) => {
      params.push({ slug: category.slug });

      if (category.subcategories) {
        category.subcategories.forEach((subcategory) => {
          params.push({ slug: subcategory.slug });
        });
      }
    });

    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Set revalidation time (optional)
export const revalidate = 3600; // Revalidate every hour

const Page = ({ params }) => {
  const { slug } = params;

  return <ProductListPage slug={slug} />;
};

export default Page;
