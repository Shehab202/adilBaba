import { CategoriesType } from "@/@types/api/categories";
import CategoriesSection from "@/components/pages/home/categoriesSection";
import AxiosServer from "@/lib/axiosServer";
import React from "react";

export default async function page() {
  let categories: CategoriesType[] = [];
  try {
    const res = await AxiosServer.get("/categories");
    // categories
    categories = res?.data?.data as CategoriesType[];
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <CategoriesSection
        categories={categories}
        title="Categories"
        // linkAll={`/categories`}
      />
    </div>
  );
}
