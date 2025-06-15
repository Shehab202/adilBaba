"use client";
import AlertApp from "@/components/auth/AlertApp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AxiosApp from "@/lib/axios";
import toast from "react-hot-toast";

// Validation Schema باستخدام Yup
const validationSchema = Yup.object({
  identifier: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  reset_token: Yup.string().required("Reset token is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New Password is required"),
  password_confirmation: Yup.string()
    // @ts-ignore
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function ResetPasswordForm() {
  const [isOpen, setIsOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      identifier: "",
      reset_token: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await AxiosApp.post("/reset-password", {
          identifier: values.identifier,
          reset_token: values.reset_token,
          password: values.password,
          password_confirmation: values.password_confirmation,
        });

        if (response.status === 200 || response.status === 201) {
          setIsOpen(true); // فتح الـ Alert عند النجاح
          toast.success("Password changed successfully!");
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Failed to reset password. Please try again.";
        toast.error(errorMessage);
        console.error("Error resetting password:", error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-center space-y-3 w-full text-center"
    >
      <h2 className="text-xl md:text-3xl font-bold">Reset Password</h2>
      <p className="text-gray-500">Enter your new password</p>

      {/* Identifier (Email) */}
      <div className="grid gap-2 w-full text-start">
        <div className="flex items-center">
          <Label htmlFor="identifier" className="text-primary md:text-base">
            Email
          </Label>
        </div>
        <Input
          id="identifier"
          type="email"
          className="bg-white py-6 text-black"
          placeholder="test@example.com"
          {...formik.getFieldProps("identifier")}
        />
        {formik.errors.identifier && formik.touched.identifier && (
          <p className="text-red-500 text-sm">{formik.errors.identifier}</p>
        )}
      </div>

      {/* Reset Token */}
      <div className="grid gap-2 w-full text-start">
        <div className="flex items-center">
          <Label htmlFor="reset-token" className="text-primary md:text-base">
            Reset Token
          </Label>
        </div>
        <Input
          id="reset-token"
          type="text"
          className="bg-white py-6 text-black"
          placeholder="5560261"
          {...formik.getFieldProps("reset_token")}
        />
        {formik.errors.reset_token && formik.touched.reset_token && (
          <p className="text-red-500 text-sm">{formik.errors.reset_token}</p>
        )}
      </div>

      {/* New Password */}
      <div className="grid gap-2 w-full text-start">
        <div className="flex items-center">
          <Label htmlFor="new-password" className="text-primary md:text-base">
            New Password
          </Label>
        </div>
        <Input
          id="new-password"
          type="password"
          className="bg-white py-6 text-black"
          placeholder="*********"
          {...formik.getFieldProps("password")}
        />
        {formik.errors.password && formik.touched.password && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}
      </div>

      {/* Confirm New Password */}
      <div className="grid gap-2 w-full text-start">
        <div className="flex items-center">
          <Label
            htmlFor="confirm-new-password"
            className="text-primary md:text-base"
          >
            Confirm New Password
          </Label>
        </div>
        <Input
          id="confirm-new-password"
          type="password"
          className="bg-white py-6 text-black"
          placeholder="*********"
          {...formik.getFieldProps("password_confirmation")}
        />
        {formik.errors.password_confirmation && formik.touched.password_confirmation && (
          <p className="text-red-500 text-sm">{formik.errors.password_confirmation}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full py-6 md:text-lg"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Submitting..." : "Submit"}
      </Button>

      {/* Alert on Success */}
      <AlertApp
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text={"Success!"}
        msg={"Your password was changed successfully."}
        url={`/auth/sign-in`}
        btnText={"Login Now"}
      />
    </form>
  );
}