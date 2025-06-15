import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { CartItem, deleteCartItem } from "@/store/features/cartSlice";
import { useAppDispatch } from "@/store/hooks";

interface ProductProps {
  product:CartItem
  isChecked: boolean;
  // image: string;
  onCheckChange?: (isChecked: boolean) => void;
  // toggleWishlist?: () => void;
}


const ProductInCart: React.FC<ProductProps> = ({
  product,
  // currency,
  // isFavorite,
  isChecked,
  // image,
  onCheckChange,
  // toggleWishlist,
}) => {

  const dispatch = useAppDispatch();
 
  return (
    <div className="flex items-start p-4 border rounded-lg shadow-sm space-x-4">
      <Checkbox
        checked={isChecked}
        onCheckedChange={onCheckChange}
        className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
      />
      <div className="flex flex-col md:flex-row w-full gap-4">
        <Image
          src={product.image}
          width={200}
          height={200}
          alt="Product"
          className="h-52 md:h-48 w-full md:w-48"
        />
        <div className="w-full flex items-start">
          <div className="flex-1 md:h-40 flex flex-col md:justify-between space-y-3 md:space-y-2 lg:py-3">
            <h2 className="text-sm lg:text-lg font-semibold">{product.name}</h2>
            <p className="text-xs md:text-sm text-primary underline cursor-pointer">
              {product.supplier}
            </p>
            <Select>
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder={`${product.quantity}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a count</SelectLabel>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <SelectItem key={item} value={`${item}`}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="text-lg flex flex-col items-end md:justify-between md:h-36 font-semibold text-primary">
            <div className="flex">
              {/* <Button
                variant={"ghost"}
                onClick={toggleWishlist}
                className={`group ${isFavorite ? "text-red-500" : "text-gray-500"}`}
                size="icon"
              >
                <Heart className={`group-hover:fill-red-500 group-hover:stroke-red-500 ${isFavorite ? "fill-red-500" : "stroke-gray-500"}`} />
              </Button> */}
              <Button onClick={() => dispatch(deleteCartItem(product.id))} variant={"ghost"} className="text-red-500" size="icon">
                <Trash2 />
              </Button>
            </div>
            <div>
              {product.price}$
              {/* {currency} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProductInCart