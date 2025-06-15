"use client";
import { signIn } from 'next-auth/react';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LinkApp from "@/components/global/LinkApp";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const img = '/icons/auth/bg.jpeg'


export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await signIn('login', {
        email,
        password,
        redirect: false, 
      });
      console.log(result);
      
      
      if (result?.error) {
        setError(result.error);
      } else {
        router.push(`/`);
        toast.success('Login successfully!');
        // window.location.href = '/';
      }
    } catch (err) {
        console.log(err);
      setError('Something went wrong!');
    }
  };

  return (
    <div className={`relative lg:h-[85vh] bg-center bg-cover px-4`} style={{ backgroundImage: `url(${img})` }}>
      <div className="bg-black/70 z-0 w-full h-full absolute inset-0"></div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 w-full h-full py-10">
        <div className="h-full flex items-center justify-center">
          <div className="text-lg md:text-5xl md:w-3/4 space-y-10">
            <p className="text-white">
              Discover Millions of Products. From everyday essentials to hard-to-find treasures
            </p>
            <p className="text-primary font-bold">join us today!</p>
          </div>
        </div>
        <div className="h-full flex items-center justify-center">
          <Card className="w-full md:w-3/5 md:mx-auto bg-transparent text-white pt-6 border-primary">
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-primary md:text-base">
                      Email / Phone no.
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="mariam@gmail.com"
                      className="bg-white py-6 text-black"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password" className="text-primary md:text-base">
                        Password
                      </Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      className="bg-white py-6 text-black"
                      placeholder="*********"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <LinkApp href="/auth/forgot-password"
                      className="ml-auto inline-block text-sm underline text-primary"
                    >
                      Forgot password?
                    </LinkApp>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button type="submit" className="w-full py-6 md:text-lg">
                    Sign in
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account ?{" "}
                <LinkApp href="/auth/sign-up" className="underline text-primary">
                  Create account
                </LinkApp>
              </div>
              <div className="flex flex-col items-center space-y-2 mt-4">
                <p className="text-primary">Or sign in With</p>
                <div className="flex gap-x-4">
                  <LinkApp href="/" className="p-4 bg-white rounded-md">
                    <img
                      src="/icons/social/google.png"
                      alt="google"
                      className="size-5 inline-block"
                    />
                  </LinkApp>
                  <LinkApp href="/" className="p-4 bg-white rounded-md">
                    <img
                      src="/icons/social/facebook.png"
                      alt="facebook"
                      className="size-5 inline-block"
                    />
                  </LinkApp>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
