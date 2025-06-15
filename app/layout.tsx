"use client";
import { SessionProvider } from "next-auth/react";
import "./global.css";
import React from "react";
import StoreProvider from "./StoreProvider";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <StoreProvider>{children}</StoreProvider>
    </SessionProvider>
  );
}
