import React from 'react'
import Image from "next/image";
import { Card, CardContent } from '@/components/ui/card';

const img = "/icons/auth/bg.jpeg";



export default async function layout({
    children,
}: {
    children: React.ReactNode,
}) {

  return (
    <div
    className={`relative lg:h-[85vh] bg-center bg-cover px-4`}
    style={{ backgroundImage: `url(${img})` }}
  >
    <div className="bg-black/70 z-0 w-full h-full absolute inset-0"></div>
    <div className="relative z-10 flex justify-center items-center w-full h-full py-10">
      <div className="h-full w-full flex flex-col space-y-5 items-center justify-center">
        <Card className="w-full md:max-w-4xl md:mx-auto py-5 md:p-10 border-primary">
          <CardContent className="flex flex-col md:flex-row gap-y-5 gap-x-10 items-center">
            <div className="flex justify-center items-center w-full">
              <Image
                src="/icons/auth/lock.png"
                className="size-24 md:size-52"
                width={400}
                height={400}
                alt="otp"
              />
            </div>
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  )
}
