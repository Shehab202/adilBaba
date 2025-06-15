import { CategoriesType } from "@/@types/api/categories";
import CategoryCard from "@/components/categories/category";
import IconLeftAndRight from "@/components/global/IconLeftAndRight";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { splitArrayInHalf, splitTitleInHalf } from "@/utils/splitArrayInHalf";
import Link from "next/link";
import React from "react";


interface CategoriesSectionProps {
  title: string;
  categories: CategoriesType[];
  linkAll?: string;
  isHome?: boolean
}

export default async function CategoriesSection({
  title,
  categories,
  linkAll,
  isHome = false
}: CategoriesSectionProps) {
  const [firstHalf, secondHalf] = splitArrayInHalf(categories as any);
  const [firstTitle, secondTitle] = splitTitleInHalf(title);
  return (
    <section className="py-12 bg-white dark:bg-gray-800 dark:text-white">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between text-start border-b border-b-gray-200">
          <h2 className="text-lg sm:text-2xl md:text-3xl text-gray-400 border-b-2 border-primary flex gap-x-2 pb-2">
            <span>{firstTitle}</span>
            <span className="text-primary">
              {secondTitle}
            </span>
          </h2>
          {linkAll && <div className="flex items-center text-xs md:text-base">
            <Link
              href={linkAll}
              className="flex items-center hover:text-primary text-gray-500"
            >
              <span>View All</span>
             <IconLeftAndRight className="size-6 text-primary"/>
            </Link>
          </div>}
        </div>
        {isHome ? <>
          <Carousel className="mt-8">
            <CarouselContent>
              {firstHalf.map((category: CategoriesType) => (
                <CarouselItem key={category.id} className="basis-1/7">
                  <CategoryCard category={category} isHome={isHome} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <Carousel>
              <CarouselContent>
                {secondHalf.map((category: CategoriesType) => (
                  <CarouselItem key={category.id} className="basis-1/7">
                    <CategoryCard category={category} isHome={isHome}/>
                  </CarouselItem>
                ))}
              </CarouselContent>
          </Carousel>
        </> : <>
        <div className="mt-10 flex flex-wrap justify-center">
          {categories.map((category: CategoriesType) => (
            <div key={category.id} className="basis-1/6">
              <CategoryCard category={category}/>
            </div>
            ))}
        </div>
        </>}
      </div>
    </section>
  );
}
