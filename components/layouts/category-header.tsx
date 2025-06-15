"use client"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React, { useEffect, useState } from "react"
import LinkApp from "../global/LinkApp"
import { Button } from "../ui/button"
import IconLeftAndRight from "../global/IconLeftAndRight"
import CategoryCardForHeader from "../categories/CategoryCardForHeader"
import { usePathname } from "next/navigation"
import AxiosApp from "@/lib/axios"
import { CategoriesType } from "@/@types/api/categories"

export function CategoryHeader() {
  const pathname = usePathname();
    const isHome = pathname.split("/").length === 1 || pathname === "/";
    const [categories, setCategories] = useState<CategoriesType[]>([])
    const [subCategoriesId, setSubCategoriesId] = useState<number>(1)
    const [subCategories, setSubCategories] = useState<CategoriesType[]>([])
    const fetchCategories = async () => {
      try {
        const response = await AxiosApp.get("/categories");
        const data = response?.data?.data
        setCategories(data);
        return data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
      }
    }
    const fetchSubCategories = async () => {
      try {
        const response = await AxiosApp.get(`/categories/${subCategoriesId}/subcategories`);
        const data = response?.data?.data
        setSubCategories(data);
        return data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
      }
    }
    useEffect(() => {
      fetchCategories()
    }, [])
    useEffect(() => {
      fetchSubCategories()
    }, [subCategoriesId])
    return (
      <NavigationMenu className={`z-50 relative hidden lg:block w-[95vw] max-w-full`} dir="ltr">
        <NavigationMenuList className="flex">
          <NavigationMenuItem className="">
            <NavigationMenuTrigger className={` ${!isHome && '!text-black'}`}>All Categories</NavigationMenuTrigger>
            <NavigationMenuContent className="flex gap-4 p-4 md:w-[95vw]">
              <div className="w-[300px]">
                {categories.map((item, index) => <Button onClick={() => setSubCategoriesId(item.id)} onMouseEnter={() => setSubCategoriesId(item.id)} key={index} variant={'ghost'} className="w-full flex justify-between h-14 rounded-none">
                  <span>{item.name}</span>
                  <IconLeftAndRight className="!size-7 text-gray-400"/>
                </Button>)}
              </div>
              <div className="flex flex-wrap gap-x-5">
                {subCategories && subCategories.length > 0 && subCategories.map((item, index) =>  
                    <CategoryCardForHeader key={index} id={item.id} image={item.image} name={item.name} isHome={isHome}/>
                )}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {categories && categories.length > 0 && categories.slice(0, 5).map(item => <NavigationMenuItem key={item.id}>
            <LinkApp href={`/categories/${item.id}`} >
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${!isHome && '!text-black'}`}>
                {item.name}
              </NavigationMenuLink>
            </LinkApp>
          </NavigationMenuItem>)}
        </NavigationMenuList>
      </NavigationMenu>
    )
  }
  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  })
  ListItem.displayName = "ListItem"