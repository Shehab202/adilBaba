import HeroSection from "@/components/pages/home/HeroSection";
import ProductSection from "@/components/pages/home/productsSection";
import CategoriesSection from "@/components/pages/home/categoriesSection";
import SubHeader from "@/components/layouts/SubHeader";
import AxiosServer from "@/lib/axiosServer";
import { BannerType } from "@/@types/api/home";
import { CategoriesType } from "@/@types/api/categories";
import { ProductType } from "@/@types/api/product";

export const dynamic = "force-dynamic"


export default async function Page() {
  let home: {
    banners: BannerType[];
    featured_categories: CategoriesType[];
    todays_deals: ProductType[];
    new_products: ProductType[];
    best_sellers: ProductType[];
    big_sale: ProductType[];
    
  } = {
    banners: [],
    featured_categories: [],
    todays_deals: [],
    new_products: [],
    best_sellers: [],
    big_sale:[]
  };
  try {
    const res = await AxiosServer.get("/home");
    // banners
    home.banners = res?.data?.banners as BannerType[];
    // categories
    home.featured_categories = res?.data
      ?.featured_categories as CategoriesType[];
      // products
    home.todays_deals = res?.data?.todays_deals as ProductType[];
    home.new_products = res?.data?.new_products as ProductType[];
    home.best_sellers = res?.data?.best_sellers as ProductType[];
    home.big_sale = res?.data?.big_sale as ProductType[];
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <main>
        <SubHeader />
        {home?.banners && home?.banners?.length > 0 && (
          <HeroSection banners={home.banners} />
        )}
        <div>
          {home?.featured_categories &&
            home?.featured_categories?.length > 0 && (
              <CategoriesSection
                categories={home.featured_categories}
                title="Shop From Top Categories"
                linkAll={`/categories`}
                isHome
              />
            )}
        </div>
        <div>
          {home?.todays_deals && home?.todays_deals?.length > 0 && (
            <ProductSection
              products={home.todays_deals}
              title="Today"
              linkAll={`/products`}
            />
          )}
          {home?.new_products && home?.new_products?.length > 0 && (
            <ProductSection
              products={home.new_products}
              title="New Products"
              linkAll={`/products`}
            />
          )}
          {home?.best_sellers && home?.best_sellers?.length > 0 && (
            <ProductSection
              products={home.best_sellers}
              title="Best Sellers"
              linkAll={`/products`}
            />
          )}
          {home?.big_sale && home?.big_sale?.length > 0 && (
            <ProductSection
              products={home.big_sale}
              title="Big Sale"
              linkAll={`/products`}
            />
          )}
        </div>
      </main>
      {/* <Footer/> */}
    </>
  );
}
