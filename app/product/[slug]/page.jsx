import React from 'react'
import ProductPage from '@/components/products/ProductPage'
import products from "@/data/products.json";

// ✅ required for static export
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

const page = ({params}) => {
  const { slug } = params;
  return <ProductPage slug={slug} />;
}

export default page
