"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axiosClient from "@/lib/axiosClient";
import ChangePasswordInput from "@/components/account/ChangePasswordInput";
import ChangeDataProfile from "@/components/account/ChangeDataProfile";
import toast from "react-hot-toast";

export default function ProfileSettings() {
  const [refresh, setRefresh] = useState(false)
  const [profile, setProfile] = useState<{
    "id": number
    "name": string
    "email": string
    "phone": string
    "company_name":string
    "region":string
    "profile_image": string
  }|null>(null)
  const [image, setImage] = useState<string>("");


  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      const formData = new FormData();
      formData.append("_method", "PATCH"); // محاكاة PATCH
      formData.append("profile_image", file); // إضافة الصورة كـ file مش URL
      const api = await axiosClient()
      await api.post("/profile",formData , {
        headers: {
          "Content-Type": "multipart/form-data", // لازم عشان FormData
        } 
      })
      toast.success("Done")
    }
  };

  const getProfile = async () => {
    const api = await axiosClient()
    const res = await api.get("/profile")
    setProfile(res?.data?.data)
    setImage(res?.data?.data?.profile_image || "/icons/settings/user.jpeg")
  }

  useEffect(() => {
    getProfile()
  }, [refresh])
  return (
    <div className="min-h-screen text-gray-700 p-6 max-w-2xl space-y-8">
      {
        profile ? <>
          <div className="flex items-center gap-4">
            <Avatar className="size-20 bg-center bg-contain">
              <AvatarImage src={image} alt="Profile picture" />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <div>
              <Input
                // disabled
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <Label
                htmlFor="image-upload"
                className="bg-primary px-4 py-2 rounded-lg cursor-pointer hover:bg-amber-500 transition-colors"
              >
                Change image
              </Label>
            </div>
          </div>
          <div className="space-y-6">
            <ChangeDataProfile setRefresh={setRefresh} label="Full Name" data={profile.name} keyData="name"/>
            <ChangeDataProfile setRefresh={setRefresh} label="Email" data={profile.email} keyData="email"/>
            <ChangeDataProfile setRefresh={setRefresh} label="Phone" data={profile.phone} keyData="phone"/>
            <ChangeDataProfile setRefresh={setRefresh} label="Region" data={profile.region} keyData="region"/>
            <ChangeDataProfile setRefresh={setRefresh} label="Company Name" data={profile.company_name} keyData="company_name"/>
            <ChangePasswordInput email={profile?.email}/>
            {/* <ChangeDataProfile label="Address" data={profile.address} keyData="address"/> */}


            <div className="space-y-4 pt-6">
              <h2 className="text-xl">Delete Account</h2>
              <p className="text-gray-400">
                Deleting your account is permanent and cannot be undone. This means
                all your data, including [list specific data points, e.g., messages,
                posts, purchase history], will be removed from our system.
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Delete account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete your account?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </> :
        <>loading ..</>
      }
    </div>
  );
}
