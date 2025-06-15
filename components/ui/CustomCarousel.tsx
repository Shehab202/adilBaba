"use client"
import * as React from "react"
import {
  Carousel,
  CarouselContent,
  type CarouselApi,
} from "@/components/ui/carousel"


function CustomCarousel({
children
}:{
    children: React.ReactNode
}) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index)
    }
  }

  return (
    <div className="max-w-screen-3xl my-10 px-4 mx-auto relative">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{ loop: true, direction: "ltr" }}
      >
        <CarouselContent className="flex relative" >
            {children}
        </CarouselContent>  
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
        <div className="py-2 hidden text-center text-sm text-muted-foreground absolute bottom-0 md:bottom-10 start-14">
          <div className="flex justify-center gap-x-2">
            {Array.from({ length: count }).map((_, index) => (
              <span
                key={index}
                className={`size-2 rounded-full cursor-pointer bg-black ${
                  current - 1 === index ? "px-3" : ""
                }`}
                onClick={() => handleDotClick(index)}
              >
              </span>
            ))}
          </div>
        </div>
    </div>
  )
}


export default CustomCarousel