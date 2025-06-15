import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="max-w-6xl space-y-4">
      {[...new Array(7)].map((item, index) => (
        <Card key={index} className="flex flex-col lg:flex-row relative shadow-none">
          <Button
            variant={"link"}
            className="absolute top-4 md:top-0 end-4 md:end-0 lg:text-red-500 lg:underline hover:no-underline font-[600] bg-red-500 lg:bg-transparent text-white"
          >
            Cancel Order
          </Button>
          <CardHeader className="p-3 overflow-hidden">
            <Image
              src="https://s3-alpha-sig.figma.com/img/3eb3/05d1/73e7488a3905e8dcfb271c66454e5a70?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WvSMooJU73Zuffe6M7xWtrpFJgtIbjbZPjwY8GXiEZx0peGPKBZP7InIkcNvlLqDwnk6xCKI6YvlzchEL~6x0c63TX2cBy60Asqayry52VM7AqZP178L09QgkYEdgL8lpYCPV6VIJytNam1e7kLJpQ1XZ896MuLE0TENjl46UjO9W9Fx-TlumtQ4mJj~uqhBnlfXVMASvSmf8xzAApfAVPD0dSj0CHy5YZ4L1MGgyseCbrT~1fMN7DdBxV~TmEUPjsu1FBai835wH96pm4zEJzc3oxsfi6CpMTJTeWLifmTl98peAbYrUUMemPx9s2vWNoImuHBMznW6ZuUTtJUrcA__"
              className="rounded-lg w-full h-72 lg:w-52 lg:h-64"
              alt="alt"
              width={100}
              height={100}
            />
          </CardHeader>
          <CardContent className="p-3 space-y-4">
            <div className="space-y-2">
              <h1 className="text-lg font-[600]">Plants Decoration Set</h1>
              <p>
                Code: <span>6543217890</span>
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col rounded-lg border">
                <div className="py-3 px-4 rounded-lg border-b text-primary font-[500] text-lg">
                  Delivery Status
                </div>
                <div className="p-5 flex gap-x-2 text-gray-600">
                  {Math.floor(Math.random() * 2) === 1 ? <StatusDeliveryError /> : <StatusDeliverySuccess />}
                </div>
              </div>
              <div className="flex flex-col rounded-lg border">
                <div className="py-3 px-4 rounded-lg border-b text-primary font-[500] text-lg">
                  Payment Status
                </div>
                <div className="p-5 flex gap-x-2 text-gray-600">
                {Math.floor(Math.random() * 2) === 1 ? <StatusPaymentError /> : <StatusPaymentSuccess />}
                </div>
              </div>
            </div>
            <div className="text-lg text-gray-600">
              Order Date: <time>{new Date().toLocaleDateString("en-GB").replace(/\//g, "/")}</time>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button
        size={"xl"}
        className="p-4 text-lg bg-gray-100 rounded-lg w-full shadow-none"
      >
        View All
      </Button>
    </div>
  );
}

const StatusDeliveryError = () => (
  <>
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 9.5L14.5 14.5"
        stroke="#BB1818"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 9.5L9.5 14.5"
        stroke="#BB1818"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 3H7C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3Z"
        stroke="#BB1818"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span>Delayed</span>
  </>
);

const StatusPaymentError = () => (
  <>
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="#1D75CC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 15L12 12V6"
        stroke="#1D75CC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span>Pending</span>
  </>
);

const StatusDeliverySuccess = () => (
  <>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="#1D75CC"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 15L12 12V6"
        stroke="#1D75CC"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <span>In Progress</span>
  </>
);

const StatusPaymentSuccess = () => (
  <>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 3H7C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3Z"
        stroke="#14D433"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.5 12.2101L10.69 14.4001L15.5 9.6001"
        stroke="#14D433"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <span>Paid</span>
  </>
);
