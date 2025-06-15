"use client";
import React from "react";
import { SidebarGroup } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import LinkApp from "../global/LinkApp";

export default function AccountSidebarLinks() {
  const pathname = usePathname();
  return (
    <div className="text-sm cursor-pointer previous-orders py-4">
      <SidebarGroup
        className={pathname.includes("/account/overview") ? "active" : ""}
      >
        <LinkApp href="/account/overview">
          Overview
        </LinkApp>
      </SidebarGroup>
      <SidebarGroup
        className={pathname.includes("/account/purchases") ? "active" : ""}
      >
        <LinkApp href="/account/purchases">
          Track Purchases
        </LinkApp>
      </SidebarGroup>
      <SidebarGroup
        className={pathname.includes("/account/support") ? "active" : ""}
      >
        <LinkApp href="/account/support">
          Support
        </LinkApp>
      </SidebarGroup>
      <SidebarGroup
        className={pathname.includes("/account/settings") ? "active" : ""}
      >
        <LinkApp href="/account/settings">
          Settings
        </LinkApp>
      </SidebarGroup>
      <SidebarGroup
        className={pathname.includes("/account/seller") ? "active" : ""}
      >
        <LinkApp href="/account/seller">
          Become a seller
        </LinkApp>
      </SidebarGroup>
    </div>
  );
}
