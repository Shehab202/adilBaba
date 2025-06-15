"use client";
import React, { useEffect, useState } from "react";
import ProductInCart from "@/components/cart/productInCart";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import AlertCart from "@/components/cart/AlertCart";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteCartItem, fetchCart } from "@/store/features/cartSlice";
import { RootState } from "@/store/store";

export default function Page() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state: RootState) => state.cart);
  const [productsInCart, setProductsInCart] = useState<
    {
      isChecked: boolean;
      id: number;
      image: string;
      name: string;
      supplier: string;
      price: string;
      discount_price: string;
      color: string;
      quantity: number;
    }[]
  >([]);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  useEffect(() => {
    const u = items.map((e) => {
      return { ...e, isChecked: false };
    });
    setProductsInCart(u);
  }, [items]);

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const selectedItemsCount = productsInCart.filter(
    (product) => product.isChecked
  ).length;

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setProductsInCart((prevProducts) =>
      prevProducts.map((product) => ({
        ...product,
        isChecked: !selectAll,
      }))
    );
  };

  const handleProductSelect = (id: number, isChecked: boolean) => {
    setProductsInCart((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, isChecked } : product
      )
    );
  };

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>حدث خطأ: {error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-lg md:text-xl">Shopping Cart</h1>
        {productsInCart.filter((product) => product.isChecked).length > 0 && (
          <Button
            disabled={productsInCart.length === 0}
            variant={"link"}
            className={`text-red-600 underline`}
            onClick={() => setIsOpenAlert(true)}
          >
            Empty Cart
          </Button>
        )}
      </div>
      <div className="flex gap-x-4 items-center p-4 border border-gray-200">
        <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
        <h3>All Items ({selectedItemsCount})</h3>
      </div>
      <div>
        <div className="space-y-4">
          {productsInCart.map((product) => (
            <ProductInCart
              key={product.id}
              product={product}
              isChecked={product.isChecked}
              onCheckChange={(isChecked) =>
                handleProductSelect(product.id, isChecked)
              }
              // toggleWishlist={() => handleToggleWishlist(product.id)}
            />
          ))}
        </div>
      </div>
      <AlertCart
        isOpen={isOpenAlert}
        setIsOpen={setIsOpenAlert}
        msg="Are you sure you want to delete everything in cart ?"
        text="Empty Cart"
        btnText="No, go back"
        btnText2="Yes, delete"
        action={() => {
          productsInCart.map((product) => {
            if (product.isChecked) {
              dispatch(deleteCartItem(product.id));
            }
          });
          setProductsInCart([]);
          setIsOpenAlert(false);
        }}
      />
    </div>
  );
}
