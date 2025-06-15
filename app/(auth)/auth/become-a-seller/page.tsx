"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { sendBecomeSellerRequest, clearSellerState } from "@/lib/features/sellerSlice";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AlertApp from "@/components/auth/AlertApp";
import toast from "react-hot-toast";

const img = "/icons/auth/bg.jpeg";

export default function BecomeSellerForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, successMessage, error } = useSelector((state: RootState) => state.seller);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company_name: "",
    category: "",
    company_type: "",
    platform: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await dispatch(sendBecomeSellerRequest(formData));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Request sent successfully");
      setIsOpen(true);
      dispatch(clearSellerState());
    } else {
      toast.error("Failed to send request");
    }
  };

  return (
    <div
      className="relative lg:h-[85vh] bg-center bg-cover px-4"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="bg-black/70 z-0 w-full h-full absolute inset-0"></div>

      <div className="relative z-10 flex justify-center items-center w-full h-full py-10">
        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-5 items-center justify-center">
          <h2 className="text-xl md:text-3xl text-white font-bold">Become a Seller</h2>
          <Card className="w-full md:max-w-xl bg-transparent text-white pt-6 border-primary">
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-primary">Full Name</Label>
                  <Input id="name" type="text" placeholder="Mohamed Omar"
                    className="bg-white py-6 text-black" required
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company_name" className="text-primary">Company Name</Label>
                  <Input id="company_name" type="text" placeholder="EGYfood"
                    className="bg-white py-6 text-black"
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-primary">Phone number</Label>
                  <Input id="phone" type="tel" placeholder="0123456789"
                    className="bg-white py-6 text-black" required
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="platform" className="text-primary">Platforms you are selling on</Label>
                  <Select onValueChange={value => handleSelectChange("platform", value)}>
                    <SelectTrigger className="w-full bg-white text-gray-500">
                      <SelectValue placeholder="Amazon" />
                    </SelectTrigger>
                    <SelectContent className="text-gray-500">
                      <SelectGroup>
                        <SelectLabel>Platforms</SelectLabel>
                        <SelectItem value="amazon">Amazon</SelectItem>
                        <SelectItem value="express">Express</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="company_type" className="text-primary">Company Type</Label>
                  <Select onValueChange={value => handleSelectChange("company_type", value)}>
                    <SelectTrigger className="w-full bg-white text-gray-500">
                      <SelectValue placeholder="Trading Company" />
                    </SelectTrigger>
                    <SelectContent className="text-gray-500">
                      <SelectGroup>
                        <SelectLabel>Company Type</SelectLabel>
                        <SelectItem value="any">Any</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category" className="text-primary">Main category</Label>
                  <Select onValueChange={value => handleSelectChange("category", value)}>
                    <SelectTrigger className="w-full bg-white text-gray-500">
                      <SelectValue placeholder="Food and Beverages" />
                    </SelectTrigger>
                    <SelectContent className="text-gray-500">
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="food">Food</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" disabled={loading} className="w-full py-6 md:text-lg">
                  {loading ? "Sending..." : "Send a request"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

      <AlertApp
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text="Success!"
        msg="Your Request was sent successfully."
      />
    </div>
  );
}
