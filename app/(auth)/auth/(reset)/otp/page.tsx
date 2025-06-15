"use client";
import AlertApp from "@/components/auth/AlertApp";
import { Button } from "@/components/ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import AxiosAuth from "@/lib/axiosAuth";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<string|null>(null);
  const [status, setStatus] = useState<{
    status: boolean
    text: string
    msg: string
  }|null>();

  const email = useSearchParams()

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await AxiosAuth.post('/verify-otp', {
        identifier: email.get('email'),
        otp_code: value
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
    
  };
  return (
    <form onSubmit={submit} className="flex flex-col items-center space-y-2 md:space-y-7 w-full text-center">
      <h2 className="text-xl md:text-3xl font-bold">Reset Password</h2>
      <p className="text-gray-500 text-xs md:text-base">
        Please Enter The OTP Code Sent To{" "}
        <span className="underline">{email}</span>
      </p>
      <div dir="ltr">
        <InputOTP onChange={(e) => setValue(e)} maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
          <InputOTPGroup>
            <InputOTPSlot className="size-12 md:size-16 text-lg" index={0} />
            <InputOTPSlot className="size-12 md:size-16 text-lg" index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot className="size-12 md:size-16 text-lg" index={2} />
            <InputOTPSlot className="size-12 md:size-16 text-lg" index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button type="submit" disabled={!value?.length || value?.length < 4} className="w-full py-4 md:py-6 md:text-lg">
        Send a request
      </Button>
      {status && <AlertApp 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        status={status?.status}
        text={status?.text} 
        msg={status?.msg} 
       
        url={`/auth/reset-password`}
        btnText={"Reset Password"} 
      />}

    </form>
  );
}
