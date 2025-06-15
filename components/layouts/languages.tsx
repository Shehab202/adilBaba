"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Earth } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LanguageList() {
  const router = useRouter();
  const languages = ["en"]
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-x-2 w-full whitespace-nowrap items-center  rounded-md p-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">
          <Earth className="size-8 md:size-5" />
          <span>Languages</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuLabel>Languages</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {languages.map((lng) => (
            <DropdownMenuItem
              className="cursor-pointer"
              key={lng}
              onClick={() => router.push("/" + lng)}
            >
              {lng}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
