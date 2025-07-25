import React from "react";
import ProductListPage from "@/components/products/ProductListPage";
import products from "@/data/products.json";
import Categories from "@/data/categories.json";

export async function generateStaticParams() {
  const params = [];

  for (const category of Categories.categories) {

    params.push({ slug: category.slug });
    
    for (const sub of category.subcategories || []) {
      params.push({ slug: sub.slug });
    }
  }

  return params;
}

const Page = ({ params }) => {
  const { slug } = params;
  return <ProductListPage slug={slug} />;
};

export default Page;
