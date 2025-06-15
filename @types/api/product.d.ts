type ProductStatusType = "active" | "inactive";
// export interface ProductType {

//     // TODO : الحجات دي من عندي يعني لكن الباك معملهاش
//   image:string,
//   price: number,
//   oldPrice: number,
//   category: any,
//   rating: number,
//   sale: boolean,

//   // new 
//   id: number;
//   name: string;
//   image: string;
//   description: string;
//   specifications: string;
//   price: string;
//   cost_price: string;
//   discount_price: string;
//   stock: number;
//   min_order_quantity: number;
//   max_order_quantity: number | null;
//   sku: string;
//   barcode: string;
//   status: string;
//   is_featured: number;
//   created_at: string;
//   updated_at: string;
// }

export interface ProductType {
  id: number
  name: string
  image: string
  description: string
  specifications: string
  price: string
  cost_price: string
  discount_price: string
  stock: number
  min_order_quantity: number
  max_order_quantity: any
  sku: string
  barcode: string
  supplier: Supplier
  category: string
  rating: number
  media: Media[]
  reviews: Reviews
  colors: Color[]
  price_list: PriceList[]
}

export interface Supplier {
  id: number
  on_time_delivery_rate: number
  rating: number
  location: string
  logo: string
  return_policy: any
}

export interface Media {
  id: number
  type: string
  url: string
  order: number
  alt_text: string
  caption: string
}

export interface Reviews {
  "2": number
  "3": number
  "5": number
  "4": number
  "1": number
}

export interface Color {
  id: number
  product_id: number
  color_name: string
  color_code: string
  stock: number
  price_adjustment: string
  created_at: string
  updated_at: string
}

export interface PriceList {
  id: number
  quantity: number
  price_per_one: string
}
