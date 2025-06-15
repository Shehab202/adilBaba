import { ProductType } from '@/@types/api/product';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface ProductCardProps {
  product: ProductType
  isCarousel?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isCarousel=true
}) => {
  return (
    <Link href={`/products/${product?.id}/`}>
      <article className="relative">
        <div className={`${"aspect-square" } overflow-hidden items-center h-32
         md:h-52 w-full bg-gray-100`}>
          <img
            height={500} width={500}
            className="group-hover:scale-125 w-full h-full object-contain transition-all duration-300"
            src={product?.image}
            alt={product?.name}
          />
        </div>
        {/* {product?.sale && (
          <div className="absolute top-0 m-1 rounded-full bg-white">
            <p className="text-[10px] rounded-full bg-primary-500 p-1 font-bold uppercase tracking-wide text-primary sm:px-3 sm:py-1">
              Sale
            </p>
          </div>
        )} */}
        <div className="mt-4 flex items-start justify-between">
          <div>
            <h4 className="text-xs sm:text-sm text-gray-500">
              <Link href={`/categories/${product?.category}`} title={product?.name} className="cursor-pointer text-gray-400">
                {product?.category}
              </Link>
            </h4>
            <h3 className="font-semibold text-xs sm:text-base md:text-lg text-gray-500">
              <span className="cursor-pointer">{product?.name}</span>
            </h3>
          </div>
          <div className="text-end flex flex-col items-end">
            <div className="flex items-end">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`block h-3 w-3 align-middle ${
                    index < (product?.rating || 4) ? 'text-yellow-500' : 'text-gray-400'
                  } sm:h-4 sm:w-4`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className='flex gap-x-2 items-center'>
              {/* {product?.oldPrice && (
                <del className="mt-px text-xs sm:font-semibold text-gray-400 sm:text-sm">
                  {product?.oldPrice}
                </del>
              )} */}
              <p className="text-xs sm:text-sm md:text-base text-primary font-bold">
                {product?.price}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;