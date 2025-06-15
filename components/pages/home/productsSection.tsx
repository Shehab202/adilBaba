import { ProductType } from "@/@types/api/product";
import IconLeftAndRight from "@/components/global/IconLeftAndRight";
import ProductCard from "@/components/products/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { splitTitleInHalf } from "@/utils/splitArrayInHalf";
import Link from "next/link";
import React from "react";
interface ProductSectionProps {
  title: string;
  linkAll?: string;
  products?: ProductType[];
  isCarousel?: boolean;
}

export default async function ProductSection({
  title,
  linkAll,
  products,
  isCarousel = true,
}: ProductSectionProps) {
  const [firstTitle, secondTitle] = splitTitleInHalf(title);

  return (
    <section className="py-12 bg-white dark:bg-gray-800 dark:text-white">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between text-start border-b border-b-gray-200">
          <h2 className="text-lg sm:text-2xl md:text-3xl text-gray-400 border-b-2 border-primary flex pb-2 gap-x-2">
            <span>{firstTitle}</span>
            <span className="text-primary">{secondTitle}</span>
          </h2>
          {linkAll && (
            <div className="inline-block pb-2 items-center text-xs md:text-base">
              <Link
                href={linkAll}
                className="flex items-center hover:text-primary text-gray-500"
              >
                <span>View All</span>
                <IconLeftAndRight className="size-6 text-primary" />
              </Link>
            </div>
          )}
        </div>
        {isCarousel ? (
          <Carousel className="mt-8">
            <CarouselContent>
              {products &&
                products?.length > 0 &&
                products?.map((product: any, index: any) => (
                  <CarouselItem key={index} className="basis-1/2 lg:basis-1/4">
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products &&
              products?.length > 0 &&
              products?.map((item: ProductType) => (
                <div key={item.id}>
                  <ProductCard isCarousel={isCarousel} product={item} />
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
