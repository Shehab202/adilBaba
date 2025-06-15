"use client";

import * as React from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

export default function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = React.useState("card");
  const [propertyTypes, setPropertyTypes] = React.useState("Business");
  const [isReady, setIsReady] = React.useState(false);
  const [address, setAddress] = React.useState("Cairo, Egypt");

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-6 h-6 -ms-1" />
          <h2 className="text-xl font-semibold">Shipping Address</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 3H7C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3Z"
                stroke="#121212"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 12.2101L10.69 14.4001L15.5 9.6001"
                stroke="#121212"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2>Saved Address</h2>
          </div>
          <RadioGroup
            value={address}
            onValueChange={setAddress}
            className="space-y-1 ps-2"
          >
            {[
              { id: 1, label: "Cairo, Egypt" },
              { id: 2, label: "Minya, Egypt" },
            ].map((method) => (
              <div key={method.id} className="flex w-full items-center gap-x-4">
                <MapPin className="size-3" />
                <Label
                  className={cn(
                    "flex items-center w-full justify-between cursor-pointer",
                    address === method.label && "text-primary"
                  )}
                >
                  <div className="flex items-center gap-2">{method.label}</div>
                  <RadioGroupItem
                    value={method.label}
                    className={cn(
                      "text-lg border border-gray-300",
                      paymentMethod === method.label &&
                        "text-primary border-primary [&>span>svg]:text-xl"
                    )}
                  />
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Select defaultValue="egypt">
              <SelectTrigger id="region">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇪🇬</span>
                    Egypt
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="egypt">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇪🇬</span>
                    Egypt
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Nasr City Floor 3"
              className="py-[1.40rem]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="building">Apartment, Building, Floor</Label>
            <Input
              id="building"
              placeholder="Nasr City Floor 3"
              className="py-[1.40rem]"
            />
          </div>

          <RadioGroup
            value={propertyTypes}
            onValueChange={setPropertyTypes}
            className="flex flex-wrap gap-2 select-none"
          >
            {["Business", "Factory", "Warehouse", "Residential"].map((type) => (
              <Label key={type}
                className={cn(
                  "flex items-center justify-between p-4 border border-gray-300 rounded-full cursor-pointer",
                  propertyTypes === type && "border-yellow-500"
                )}
              >
                {type}
                <RadioGroupItem className="sr-only" value={type} />
              </Label>
            ))}
          </RadioGroup>
          <p className="flex items-center gap-x-2">
            <Checkbox />
            <span className="text-sm">Set as default shipping address</span>
          </p>
          <Button
            onClick={() => setIsReady(true)}
            className="w-full bg-primary hover:bg-primary text-black font-medium py-6"
          >
            Continue to payment
          </Button>
        </div>

        {isReady && (
          <Card className="p-0 space-y-4 border-none shadow-none">
            <h2 className="text-xl font-semibold flex items-center gap-2 pt-8 border-t border-gray-200">
              <Image
                src="/icons/payment/dolar.png"
                className="size-5"
                width={50}
                height={50}
                alt="alt"
              />{" "}
              Payment Method
            </h2>

            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-2"
            >
              {[
                {
                  id: "card",
                  label: "Credit / Debit Card",
                  img: "/icons/payment/card.png",
                },
                {
                  id: "fawry",
                  label: "Fawry",
                  img: "/icons/payment/fawry.png",
                },
                {
                  id: "instapay",
                  label: "Insta Pay",
                  img: "/icons/payment/instapay.png",
                },
                {
                  id: "orange",
                  label: "Orange Money",
                  img: "/icons/payment/orange-money.png",
                },
                {
                  id: "vodafone",
                  label: "Vodafone Cash",
                  img: "/icons/payment/vodafone.png",
                },
                {
                  id: "etisalat",
                  label: "Etisalat Cash",
                  img: "/icons/payment/etisalat.png",
                },
              ].map((method) => (
                <div key={method.id} className="flex w-full items-center">
                  <Image
                    src={method.img}
                    className="size-5"
                    width={50}
                    height={50}
                    alt="alt"
                  />
                  <Label
                    className={cn(
                      "flex items-center w-full justify-between p-4 cursor-pointer",
                      paymentMethod === method.id && "text-primary"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {method.label}
                    </div>
                    <RadioGroupItem
                      value={method.id}
                      className={cn(
                        "text-lg border border-gray-300",
                        paymentMethod === method.id &&
                          "text-primary border-primary [&>span>svg]:text-xl"
                      )}
                    />
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-6">
              Pay Now
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
