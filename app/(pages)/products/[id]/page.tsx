import { Button } from "@/components/ui/button";

import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader } from "@/components/ui/card";
import ProductRating from "@/components/products/ProductRating";
import ProductsSectionClient from "@/components/pages/home/productsSectionClient";
import { ProductType } from "@/@types/api/product";
import AxiosServer from "@/lib/axiosServer";
import MediaProduct from "@/components/product-details/MediaProduct";
import AddToCartProductDetails from "@/components/products/addToCartProductDetails";



export const dynamic = "force-dynamic"

export default async function Page({
  params
}:{
  params: Promise<{
    id: string
  }>
}) {
  const id = (await params).id

  let product: ProductType | null = null;
  let recommended_products: ProductType[] = [];
  try {
    const res = await AxiosServer.get(`/products/${id}`);
    // products
    product = res?.data?.data as ProductType;
    recommended_products = res?.data?.recommended_products;
  } catch (error) {
    console.log(error);
  }
 
   // Show loading spinner while data is being fetched
   if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl">Not Found Product!
          {/* <span className="size-10 bg-primary rounded-full"></span> */}
        </h2>
      </div>
    );
  }

  return product &&(
    <div className="max-w-[95rem] px-4 mx-auto dark:text-white mt-20 space-y-10 mb-10">
      <div className="flex flex-col lg:flex-row gap-4">
        <MediaProduct media={product.media}/>
        <div className="w-full order-3">
          <section className="space-y-4 md:space-y-6">
            <div>
              <h5 className="text-gray-500">{product.category}</h5>
              <h1 className="text-xl sm:text-2xl font-bold md:text-3xl">
                {product.name}
              </h1>
              <div className="flex items-center mt-2 gap-x-1">
                <small className="text-gray-400">{product.rating}</small>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`block size-3 align-middle ${
                        index < product.rating
                          ? "text-yellow-500"
                          : "text-gray-400"
                      } sm:size-4`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-x-2 items-start">
              <span className="text-primary text-lg md:text-2xl font-bold">
                {product.price}
              </span>
              {product.discount_price && (
                <span className="text-gray-400 font-bold">
                  {product.discount_price}%
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-bold">
                Available Quantity
              </h2>
              <p className="text-gray-400">{product.stock} products</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-bold">
                Model Description
              </h2>
              <p className="text-gray-400 w-2/5">
                {product.description}
              </p>
            </div>

            <AddToCartProductDetails product={product}/>
          </section>
        </div>
      </div>

      <div className="max-w-4xl space-y-10 xl:ms-20">
        <Table className="border">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary [&>*]:text-black">
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product?.price_list?.map((item, index) => <TableRow key={index}>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.price_per_one}</TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Supplier Information</h2>
          <Card className="shadow-none">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Image
                    src={product.supplier.logo}
                    className="size-9"
                    alt="user"
                    width={40}
                    height={40}
                  />
                  <Button variant={"link"} className="underline text-black">
                    Digital Market
                  </Button>
                </div>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`block size-3 align-middle ${
                        index < product.supplier.rating
                          ? "text-yellow-500"
                          : "text-gray-400"
                      } sm:size-4`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 text-gray-500">
                <span>On-time delivery rate</span>
                <span>{product.supplier.on_time_delivery_rate}%</span>
                <div className="flex gap-2">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.49 18.79C14.2164 19.2025 13.8449 19.541 13.4087 19.7751C12.9724 20.0092 12.4851 20.1317 11.99 20.1317C11.495 20.1317 11.0076 20.0092 10.5714 19.7751C10.1352 19.541 9.76367 19.2025 9.49002 18.79C5.49002 12.92 5.80002 10.08 5.80002 10.08C5.80002 8.44096 6.45112 6.86905 7.6101 5.71007C8.76907 4.5511 10.341 3.89999 11.98 3.89999C13.6191 3.89999 15.191 4.5511 16.3499 5.71007C17.5089 6.86905 18.16 8.44096 18.16 10.08C18.16 10.08 18.53 12.92 14.49 18.79Z"
                      stroke="#000D26"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 12.07C13.1046 12.07 14 11.1746 14 10.07C14 8.96544 13.1046 8.07001 12 8.07001C10.8954 8.07001 10 8.96544 10 10.07C10 11.1746 10.8954 12.07 12 12.07Z"
                      stroke="#000D26"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{product?.supplier?.location}</span>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
        <div className="space-y-4 max-w-xl">
          <h2 className="text-lg font-bold">Supplier Information</h2>
          <div>
            <h3 className="text-sm flex items-center gap-3 font-bold">
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22.4967C12 22.4967 20.9986 19.4971 20.9986 11.9983"
                  stroke="#121212"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.9986 11.9983V2.99971C20.9986 2.99971 17.9991 1.49994 12 1.49994"
                  stroke="#121212"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.9996 22.4967C11.9996 22.4967 3.00098 19.4971 3.00098 11.9983"
                  stroke="#121212"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.00098 11.9983V2.99971C3.00098 2.99971 6.00051 1.49994 11.9996 1.49994"
                  stroke="#121212"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.9984 5.99927C11.9993 10.4986 10.4995 16.4976 10.4995 16.4976C10.4995 16.4976 8.99977 14.7075 7.5 13.4981"
                  stroke="#121212"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Secure Payments</span>
            </h3>
            <p className="text-gray-500">
              We use advanced encryption to protect your payment information
              throughout checkout.
            </p>
          </div>
          <div>
            <h3 className="text-sm flex items-center gap-3 font-bold">
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 19H6C5.20435 19 4.44129 18.6839 3.87868 18.1213C3.31607 17.5587 3 16.7956 3 16V8C3 7.20435 3.31607 6.44129 3.87868 5.87868C4.44129 5.31607 5.20435 5 6 5H18C18.7956 5 19.5587 5.31607 20.1213 5.87868C20.6839 6.44129 21 7.20435 21 8V12.5M3 10H21M7 15H7.01M11 15H13M16 19H22M16 19L19 16M16 19L19 22"
                  stroke="#121212"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Refund Policy</span>
            </h3>
            <p className="text-gray-500">
              We believe in customer satisfaction. If you need to return an
              item, our clear return policy outlines the process for a full
              refund.
            </p>
          </div>
        </div>
        <div className="space-y-4 max-w-xl">
          <div>
            <h2 className="text-lg font-bold">Customers Reviews</h2>
            <p className="text-primary text-xs">{product.rating} Product rating</p>
          </div>
          <ProductRating reviews={product.reviews} />
        </div>
      </div>
      <ProductsSectionClient
        products={recommended_products}
        title="Recommended Products"
        linkAll={`/category/${product.category}`}
      />
    </div>
  )
}
