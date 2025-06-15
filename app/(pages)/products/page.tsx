import { ProductType } from "@/@types/api/product";
import ProductSection from "@/components/pages/home/productsSection";
import AxiosServer from "@/lib/axiosServer";
import React from "react";

export const dynamic = "force-dynamic"

export default async function page() {
  let products: ProductType[] = [];
  try {
    const res = await AxiosServer.get(`/products`);
    // products
    products = res?.data?.data as ProductType[];
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <ProductSection products={products} isCarousel={false} title={`Products`} />
    </div>
  );
}
