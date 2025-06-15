"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const img = '/icons/auth/bg.jpeg';

const validationSchema = Yup.object({
  region: Yup.string().required("Region is required"),
  name: Yup.string().min(2, "Too short!").required("Name is required"),
  company_name: Yup.string(),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
});

export default function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      region: "",
      name: "",
      company_name: "",
      email: "",
      password: "",
      terms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await signIn('register',  {
          name: values.name,
          region: values.region,
          company_name: values.company_name || undefined, // Optional field
          email: values.email,
          password: values.password,
          redirect: false, 
        });

        if (result?.error) {
          setError(result.error);
        } else {
          router.push(`/`);
          toast.success("Account created successfully!");
          // window.location.href = '/';
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || "Something went wrong!";
        setError(errorMessage);
        console.error("Error during registration:", err);
      }
    },
  });

  return (
    <div className={`relative lg:h-[85vh] bg-center bg-cover px-4`} style={{ backgroundImage: `url(${img})` }}>
      <div className="bg-black/70 z-0 w-full h-full absolute inset-0"></div>
      <div className="relative z-10 flex justify-center items-center w-full h-full py-10">
        <div className="h-full w-full flex flex-col space-y-5 items-center justify-center">
          <h2 className="text-xl md:text-3xl text-white font-bold">Create account</h2>
          <Card className="w-full md:max-w-xl md:mx-auto bg-transparent text-white pt-6 border-primary">
            <CardContent>
              <form onSubmit={formik.handleSubmit} className="grid gap-4">
                {/* Region Select */}
                <div>
                  <Select onValueChange={(value) => formik.setFieldValue("region", value)}>
                    <SelectTrigger className="w-full bg-white text-gray-500">
                      <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                    <SelectContent className="text-gray-500">
                      <SelectGroup>
                        <SelectLabel>Region</SelectLabel>
                        <SelectItem value="Egypt">🇪🇬 Egypt</SelectItem>
                        <SelectItem value="Morocco">🇲🇦 Morocco</SelectItem>
                        <SelectItem value="Iraq">🇮🇶 Iraq</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {formik.errors.region && formik.touched.region && (
                    <p className="text-red-500 text-sm">{formik.errors.region}</p>
                  )}
                </div>

                {/* Name & Company Name */}
                <div className="flex gap-x-4">
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="name" className="text-primary md:text-base">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Abdur-Rahman Saad"
                      className="bg-white py-6 text-black"
                      {...formik.getFieldProps("name")}
                    />
                    {formik.errors.name && formik.touched.name && (
                      <p className="text-red-500 text-sm">{formik.errors.name}</p>
                    )}
                  </div>
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="company-name" className="text-primary md:text-base flex">
                      Company Name (optional)
                    </Label>
                    <Input
                      id="company-name"
                      type="text"
                      placeholder="Webbing Agency"
                      className="bg-white py-6 text-black"
                      {...formik.getFieldProps("company_name")}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-primary md:text-base">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="aaass@example.org"
                    className="bg-white py-6 text-black"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-primary md:text-base">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className="bg-white py-6 text-black"
                    placeholder="*********"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="text-red-500 text-sm">{formik.errors.password}</p>
                  )}
                  <Link href="#" className="ml-auto inline-block text-sm underline text-primary">Forgot password?</Link>
                </div>

                {/* Terms and Conditions */}
                <div className="flex gap-x-2 items-start">
                  <Checkbox
                    id="terms"
                    className="md:mt-2 size-5"
                    checked={formik.values.terms}
                    onCheckedChange={(checked) => formik.setFieldValue("terms", checked)}
                  />
                  <label htmlFor="terms" className="text-xs md:text-lg font-medium leading-none">
                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                  </label>
                </div>
                {formik.errors.terms && formik.touched.terms && (
                  <p className="text-red-500 text-sm">{formik.errors.terms}</p>
                )}

                {/* Submit Button */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full py-6 md:text-lg">Sign up</Button>
              </form>

              {/* Sign-in Link */}
              <div className="mt-4 text-center text-sm">
                Do you have an account?{" "}
                <Link href="#" className="underline text-primary">Sign in</Link>
              </div>

              {/* Social Sign-up */}
              <div className="flex flex-col items-center space-y-2 mt-4">
                <p className="text-primary">Or sign up with</p>
                <div className="flex gap-x-4">
                  <Link href="#" className="p-4 bg-white rounded-md">
                    <img src="/icons/social/google.png" alt="google" className="size-5 inline-block" />
                  </Link>
                  <Link href="#" className="p-4 bg-white rounded-md">
                    <img src="/icons/social/facebook.png" alt="facebook" className="size-5 inline-block" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}




// import Link from "next/link";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// const img = '/icons/auth/bg.jpeg';

// const validationSchema = Yup.object({
//   country: Yup.string().required("Country is required"),
//   name: Yup.string().min(2, "Too short!").required("Name is required"),
//   companyName: Yup.string(),
//   email: Yup.string().email("Invalid email address").required("Email is required"),
//   password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//   terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
// });

// export default function SignupForm() {
//   const router = useRouter()
//   const [error, setError] = useState('');

//   const formik = useFormik({
//     initialValues: {
//       country: "",
//       name: "",
//       companyName: "",
//       email: "",
//       phone: "",
//       password: "",
//       terms: false,
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         const result = await signIn('register', {
//           name: values.name,
//           email: values.email,
//           password: values.password,
//           phone: values.phone,
//           company_name: values.companyName,
//           redirect: false, 
//         });        
//         if (result?.error) {
//           setError(result.error);
//         } else {
//           router.push(`/`);
//           toast.success('Account created successfully!');
//           // window.location.href = '/';
//         }
//       } catch (err) {
//         console.log(err);
//         setError('Something went wrong!');
//       }
//     },
//   });

//   return (
//     <div className={`relative lg:h-[85vh] bg-center bg-cover px-4`} style={{ backgroundImage: `url(${img})` }}>
//       <div className="bg-black/70 z-0 w-full h-full absolute inset-0"></div>
//       <div className="relative z-10 flex justify-center items-center w-full h-full py-10">
//         <div className="h-full w-full flex flex-col space-y-5 items-center justify-center">
//           <h2 className="text-xl md:text-3xl text-white font-bold">Create account</h2>
//           <Card className="w-full md:max-w-xl md:mx-auto bg-transparent text-white pt-6 border-primary">
//             <CardContent>
//               <form onSubmit={formik.handleSubmit} className="grid gap-4">
//                 {/* Country Select */}
//                 <div>
//                   <Select onValueChange={(value) => formik.setFieldValue("country", value)}>
//                     <SelectTrigger className="w-full bg-white text-gray-500">
//                       <SelectValue placeholder="Select a country" />
//                     </SelectTrigger>
//                     <SelectContent className="text-gray-500">
//                       <SelectGroup>
//                         <SelectLabel>Country</SelectLabel>
//                         <SelectItem value="egypt">🇪🇬 Egypt</SelectItem>
//                         <SelectItem value="morocco">🇲🇦 Morocco</SelectItem>
//                         <SelectItem value="iraq">🇮🇶 Iraq</SelectItem>
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                   {formik.errors.country && formik.touched.country && (
//                     <p className="text-red-500 text-sm">{formik.errors.country}</p>
//                   )}
//                 </div>

//                 {/* Name & Company Name */}
//                 <div className="flex gap-x-4">
//                   <div className="grid gap-2 w-full">
//                     <Label htmlFor="name" className="text-primary md:text-base">Name</Label>
//                     <Input
//                       id="name"
//                       type="text"
//                       placeholder="Mariam"
//                       className="bg-white py-6 text-black"
//                       {...formik.getFieldProps("name")}
//                     />
//                     {formik.errors.name && formik.touched.name && (
//                       <p className="text-red-500 text-sm">{formik.errors.name}</p>
//                     )}
//                   </div>
//                   <div className="grid gap-2 w-full">
//                     <Label htmlFor="company-name" className="text-primary md:text-base flex">
//                       Company Name (optional)
//                     </Label>
//                     <Input
//                       id="company-name"
//                       type="text"
//                       placeholder="Tech Company"
//                       className="bg-white py-6 text-black"
//                       {...formik.getFieldProps("companyName")}
//                     />
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div className="grid gap-2">
//                   <Label htmlFor="email" className="text-primary md:text-base">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="mariam@gmail.com"
//                     className="bg-white py-6 text-black"
//                     {...formik.getFieldProps("email")}
//                   />
//                   {formik.errors.email && formik.touched.email && (
//                     <p className="text-red-500 text-sm">{formik.errors.email}</p>
//                   )}
//                 </div>

//                 {/* Phone */}
//                 <div className="grid gap-2">
//                   <Label htmlFor="phone" className="text-primary md:text-base">Phone</Label>
//                   <Input
//                     id="phone"
//                     type="text"
//                     placeholder="+20 123 456 789"
//                     className="bg-white py-6 text-black"
//                     {...formik.getFieldProps("phone")}
//                   />
//                   {formik.errors.phone && formik.touched.phone && (
//                     <p className="text-red-500 text-sm">{formik.errors.phone}</p>
//                   )}
//                 </div>

//                 {/* Password */}
//                 <div className="grid gap-2">
//                   <Label htmlFor="password" className="text-primary md:text-base">Password</Label>
//                   <Input
//                     id="password"
//                     type="password"
//                     className="bg-white py-6 text-black"
//                     placeholder="*********"
//                     {...formik.getFieldProps("password")}
//                   />
//                   {formik.errors.password && formik.touched.password && (
//                     <p className="text-red-500 text-sm">{formik.errors.password}</p>
//                   )}
//                   <Link href="#" className="ml-auto inline-block text-sm underline text-primary">Forgot password?</Link>
//                 </div>

//                 {/* Terms and Conditions */}
//                 <div className="flex gap-x-2 items-start">
//                   <Checkbox
//                     id="terms"
//                     className="md:mt-2 size-5"
//                     checked={formik.values.terms}
//                     onCheckedChange={(checked) => formik.setFieldValue("terms", checked)}
//                   />
//                   <label htmlFor="terms" className="text-xs md:text-lg font-medium leading-none">
//                     By creating an account, you agree to our Terms of Service and Privacy Policy.
//                   </label>
//                 </div>
//                 {formik.errors.terms && formik.touched.terms && (
//                   <p className="text-red-500 text-sm">{formik.errors.terms}</p>
//                 )}

//                 {/* Submit Button */}
//                 {error && <p className="text-red-500 text-sm">{error}</p>}
//                 <Button type="submit" className="w-full py-6 md:text-lg">Sign up</Button>
//               </form>

//               {/* Sign-in Link */}
//               <div className="mt-4 text-center text-sm">
//                 Do you have an account?{" "}
//                 <Link href="#" className="underline text-primary">Sign in</Link>
//               </div>

//               {/* Social Sign-up */}
//               <div className="flex flex-col items-center space-y-2 mt-4">
//                 <p className="text-primary">Or sign up with</p>
//                 <div className="flex gap-x-4">
//                   <Link href="#" className="p-4 bg-white rounded-md">
//                     <img src="/icons/social/google.png" alt="google" className="size-5 inline-block" />
//                   </Link>
//                   <Link href="#" className="p-4 bg-white rounded-md">
//                     <img src="/icons/social/facebook.png" alt="facebook" className="size-5 inline-block" />
//                   </Link>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
