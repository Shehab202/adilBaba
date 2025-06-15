import { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

export interface categoryCardProps {
  id: number;
  image: string | StaticImageData;
  name: string;
  isHome?: boolean
}

const CategoryCardForHeader: React.FC<categoryCardProps> = ({ id, image, name, isHome}) => {
  return (
    <Link href={`/sub-categories/${id}`} className="">
      <article className="relative ">
        <div className="flex items-start justify-between">
          <div className={`w-full flex flex-col justify-center items-center space-y-3`}>
            <Avatar className="size-16 p-2">
              <AvatarImage src={image as string} alt={name} />
            </Avatar>
            <div className="text-center">
              <h2 className="text-base text-gray-600 mb-2">{name}</h2>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CategoryCardForHeader;
