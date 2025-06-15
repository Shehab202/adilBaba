import { BannerType } from "@/@types/api/home";
import { CarouselItem } from "@/components/ui/carousel";
import CustomCarousel from "@/components/ui/CustomCarousel";
import Image from "next/image";
import React from "react";


export default function HeroSection({
  banners
}:{
  banners: BannerType[]
}) { 
  return (
    <>
    <CustomCarousel >
      {banners.map((banner, index) => <CarouselItem key={index}>
      <div className="w-full">
        <div
          style={{
            background: "linear-gradient(90deg, #F3B852 0%, #FBE7C5 100%)",
          }}
          className="rounded-2xl h-32 md:h-80 md:pt-0 relative overflow-hidden ms-4"
        >
          {/* <div className="flex md:items-center pt-5">
              <div className="flex flex-col md:justify-between ms-10 space-y-2 md:space-y-7">
                  <h2 className="text-xs">{banner.content}</h2>
                  <h1 className="text-xs md:text-xl font-bold">{banner.title}</h1>
                  <p className="font-bold">UP to 40% OFF</p>
                  <Svg1 />
              </div>
          </div> */}
          {/* <div className="relative h-72 flex justify-center md:items-center p-5">
            <Svg2/>
            <Image
              className="size-20 md:size-auto md:h-full relative z-[1]"
              src={"/icons/watch.png"}
              width={300}
              height={300}
              alt=""
            />
            <Svg3/>
          </div> */}
            <Image className="relative z-[1] h-full w-full" src={banner.content + ""}
                width={1000}
                height={400}
                alt=""/>
        </div>
      </div>
      </CarouselItem>)}
    </CustomCarousel>
    </>
  );
}






const Svg1 = () => (
  <svg
                    width="69"
                    height="8"
                    viewBox="0 0 69 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="35" cy="4" r="4" fill="#121212" />
                    <circle cx="50" cy="4" r="4" fill="#121212" />
                    <circle cx="65" cy="4" r="4" fill="#121212" />
                    <rect width="24" height="8" rx="4" fill="#121212" />
                </svg>
)


const Svg2 = () => (
  <svg
            width={472}
            height={161}
            className="hidden lg:block absolute top-0 start-5"
            viewBox="0 0 472 161"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx={232}
              cy={-79}
              r="239.5"
              fill="url(#paint0_linear_999_134)"
              stroke="url(#paint1_linear_999_134)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_999_134"
                x1={-8}
                y1={-79}
                x2={472}
                y2={-79}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F3B852" />
                <stop offset={1} stopColor="#FBE7C5" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_999_134"
                x1={-8}
                y1={-79}
                x2={472}
                y2={-79}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F3B852" />
                <stop offset={1} stopColor="#FBE7C5" />
              </linearGradient>
            </defs>
          </svg>
)


const Svg3 = () => (<svg
  className="hidden lg:block absolute bottom-0 start-5 z-0"
  width="148"
  height="61"
  viewBox="0 0 148 61"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M147.5 73.5C147.5 113.814 114.596 146.5 74 146.5C33.4039 146.5 0.5 113.814 0.5 73.5C0.5 33.1864 33.4039 0.5 74 0.5C114.596 0.5 147.5 33.1864 147.5 73.5Z"
    fill="url(#paint0_linear_999_136)"
    stroke="url(#paint1_linear_999_136)"
  />
  <defs>
    <linearGradient
      id="paint0_linear_999_136"
      x1="0"
      y1="73.5"
      x2="148"
      y2="73.5"
      gradientUnits="userSpaceOnUse"
    >
      <stop stopColor="#F3B852" />
      <stop offset="1" stopColor="#FBE7C5" />
    </linearGradient>
    <linearGradient
      id="paint1_linear_999_136"
      x1="0"
      y1="73.5"
      x2="148"
      y2="73.5"
      gradientUnits="userSpaceOnUse"
    >
      <stop stopColor="#F3B852" />
      <stop offset="1" stopColor="#FBE7C5" />
    </linearGradient>
  </defs>
</svg>)