"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HeartIcon } from "lucide-react";
import { Button } from "../ui/button";
import { addToCart } from "@/store/features/cartSlice";
import { Color, ProductType } from "@/@types/api/product";
import ColorsProduct from "@/components/product-details/ColorsProduct";
import { addToWishlist, deleteWishlistItem, fetchWishlist, isProductInWishlist } from "@/store/features/wishlistSlice";

export default function AddToCartProductDetails({
  product,
}: {
  product: ProductType;
}) {
    const [color, setColor] = React.useState<Color>(product.colors[0]);
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = React.useState(1);
  const { items} = useAppSelector(
    (state) => state.wishlist
  );
  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);

  // إضافة منتج
  const handleAddToCart = () => {
    dispatch(
      addToCart({ product_id: product.id, product_variation_id: color.id, quantity})
    );
    
  };
  return (
    <>
      <ColorsProduct colors={product.colors} setColor={setColor} color={color}/>

      <div className="space-y-2">
        <h2 className="text-lg md:text-xl font-bold">Quantity To Buy</h2>
        <Select onValueChange={(value) => setQuantity(parseInt(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="1" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(10)].map((_, index) => (
              <SelectItem key={index} value={(index + 1).toString()}>
                {index + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600">
          Deliver to <span className="underline">EG</span>
        </p>
      </div>

      <div className="flex items-center justify-between gap-x-4">
        <Button onClick={handleAddToCart} 
          type="button"
          className="w-full px-4 py-2 bg-primary text-white rounded-md"
        >
          Add to cart
        </Button>
        {isProductInWishlist(product.id, items) ? <Button onClick={()=> dispatch(deleteWishlistItem(product.id))} variant="outline" className="border-red-500">
          <HeartIcon className="fill-red-500 stroke-red-500"/>
        </Button>: 
        <Button onClick={()=> dispatch(addToWishlist({
          product_id: product.id
        }))} variant="outline" className="border-primary">
          <HeartIcon />
        </Button>
        }
      </div>
    </>
  );
}
