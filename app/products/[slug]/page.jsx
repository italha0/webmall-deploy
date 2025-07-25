import React from "react";
import ProductListPage from "@/components/products/ProductListPage";
import products from "@/data/products.json";

// ✅ required for static export
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

const page = ({ params }) => {
  const { slug } = params;
  return <ProductListPage slug={slug} />;
};

export default page;
