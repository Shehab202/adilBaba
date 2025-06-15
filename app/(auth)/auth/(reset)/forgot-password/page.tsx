"use client";
import AlertApp from "@/components/auth/AlertApp";
import LinkApp from "@/components/global/LinkApp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AxiosAuth from "@/lib/axiosAuth";


export default function ForgotPasswordForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<{
    status: boolean
    text: string
    msg: string
  }|null>();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await AxiosAuth.post('/forgot-password', {
          identifier: values.email,
        })
        if (result.status === 200) {
          setStatus({
            status: true,
            text: "Success",
            msg: result?.data?.message
          });
          setIsOpen(true);
        }
      } catch (err: any) {
        setStatus({
          status: false,
          text: "Error",
          msg: err?.response?.data?.message
        });
        setIsOpen(true);
      }
    }
  });

  return (
    <div className="flex flex-col items-center space-y-7 w-full text-center">
      <h2 className="text-xl md:text-3xl font-bold">Forgot Password</h2>
      <p className="text-gray-500">
        Please Enter Your Email Address or Phone No. To Receive a Verification
        Code
      </p>
      <form onSubmit={formik.handleSubmit} className="grid gap-2 w-full text-start">
        <Label htmlFor="email" className="text-primary md:text-base">
          Email / Phone no.
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="mariam@gmail.com"
          className="bg-white py-6 text-black"
          {...formik.getFieldProps("email")}
          required
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
        <LinkApp
         
          href="/auth/sign-in"
          className="ml-auto inline-block text-sm underline text-primary"
        >
          Sign in?
        </LinkApp>
        <Button type="submit" className="w-full py-6 md:text-lg">
          Reset Password
        </Button>
      </form>
     {isOpen && status && <AlertApp
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        status={status?.status}
        text={status?.text} 
        msg={status?.msg} 
        url={`/auth/otp?email=${formik.values.email}`}
        btnText={"OTP Page"} 
      />}
    </div>
  );
}
