"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AlertApp from "@/components/auth/AlertApp";

export default function ProfileSettings() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen text-gray-700 py-6 max-w-2xl space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="full-name" className="text-base">
            Full Name
          </Label>
          <div className="flex gap-4">
            <Input id="full-name" placeholder="Mohamed Omar" defaultValue="" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company" className="text-base">
            Company Name
          </Label>
          <div className="flex gap-4">
            <Input
              id="company"
              type="text"
              placeholder="EGYfood"
              defaultValue=""
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-base">
            Number Phone
          </Label>
          <div className="flex gap-4">
            <Input
              id="phone"
              type="text"
              placeholder="0123456789"
              defaultValue=""
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-base">Platforms you are selling on</Label>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-full bg-white text-gray-500">
                <SelectValue
                  placeholder="Platforms you are selling on"
                  className="py-4"
                />
              </SelectTrigger>
              <SelectContent className="text-gray-500">
                <SelectGroup>
                  <SelectLabel>Platforms</SelectLabel>
                  <SelectItem value="amazon">
                    <span>Amazon</span>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-base">Trading Company</Label>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-full bg-white text-gray-500">
                <SelectValue placeholder="Trading Company" className="py-4" />
              </SelectTrigger>
              <SelectContent className="text-gray-500">
                <SelectGroup>
                  <SelectLabel>Trading</SelectLabel>
                  <SelectItem value="trading-company">
                    <span>Trading Company</span>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-base">Food and Beverages</Label>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-full bg-white text-gray-500">
                <SelectValue
                  placeholder="Food and Beverages"
                  className="py-4"
                />
              </SelectTrigger>
              <SelectContent className="text-gray-500">
                <SelectGroup>
                  <SelectLabel>Food</SelectLabel>
                  <SelectItem value="Food-and-Beverages">
                    <span>Food and Beverages</span>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="w-full" size={"lg"} onClick={() => setIsOpen(true)}>Send a request</Button>
        <AlertApp
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          text="Success!"
          msg="Your Request was sent successfully"
        />
      </div>
    </div>
  );
}
