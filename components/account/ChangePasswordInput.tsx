"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";
import AxiosApp from "@/lib/axios";
import axiosClient from "@/lib/axiosClient";

export default function ChangePasswordInput({ email }: { email: string }) {
  const [passwords, setPasswords] = useState({
    current_password: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changePassword = async () => {
    // التأكد من إن الحقول مش فاضية
    if (!passwords.current_password || !passwords.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosClient();
      await res.post("/profile", {
        _method: "PATCH",
        current_password: passwords.current_password,
        password: passwords.password,
        password_confirmation:  passwords.password
      });

      toast.success("Password changed successfully!");
      setPasswords({ current_password: "", password: "" }); // إعادة تعيين الحقول
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to change password. Please try again.";
      toast.error(errorMessage);
      console.error("Error changing password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-xl">Change Password</Label>
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex gap-4 w-full">
          <div className="w-full">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              name="current_password"
              type="password"
              placeholder="********"
              value={passwords.current_password}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              name="password"
              type="password"
              placeholder="********"
              value={passwords.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button
          variant="link"
          className="underline"
          onClick={changePassword}
          disabled={loading || !passwords.current_password || !passwords.password}
        >
          {loading ? "Changing..." : "Change"}
        </Button>
      </div>
      <div className="flex items-center mt-2">
        <span>Can&apos;t remember your password? </span>
        {/* <LinkApp href="/auth/forgot-password">
          <Button variant="link" className="underline">
            Reset your password
          </Button>
        </LinkApp> */}
      </div>
    </div>
  );
}