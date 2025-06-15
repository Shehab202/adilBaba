import { CategoriesType } from "@/@types/api/categories";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

export interface categoryCardProps {
  category: CategoriesType
  isHome?: boolean
}

const CategoryCard: React.FC<categoryCardProps> = ({category, isHome }) => {
  return (
    <Link href={`/categories/${category?.id}/`}>
      <article className="relative ">
        <div className="flex items-start justify-between">
          <div className={`w-full ${isHome ? "p-4 md:p-8" : "p-4"} flex flex-col justify-center items-center space-y-2`}>
            <Avatar className="size-20 md:size-28 p-4 ring-2 !ring-[#F4B854]">
              <AvatarImage src={category?.image} alt={category?.name} />
            </Avatar>
            {/* <div className="mb-8 border border-primary rounded-full p-4 size-16 md:size-28 bg-gray-100 flex justify-center items-center">
              <Image
                height={200}
                width={200}
                className="object-center object-cover size-24"
                src={category?.image}
                alt={category?.name}
              />
            </div> */}
            <div className="text-center">
              <h2 className="text-base text-gray-600 mb-2">{category?.name}</h2>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CategoryCard;
