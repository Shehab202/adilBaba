import { ProductType } from "@/@types/api/product";
import ProductsSectionWithSidebar from "@/components/pages/home/productsSectionWithSidebar";
import AxiosServer from "@/lib/axiosServer";
import React from "react";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let products: ProductType[] = [];
  try {
    const res = await AxiosServer.get(`/products?category=${id}`);
    // products
    products = res?.data?.data as ProductType[];
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <ProductsSectionWithSidebar products={products} isCarousel={false} title={`Products of ${id} category`} />
    </div>
  );
}
