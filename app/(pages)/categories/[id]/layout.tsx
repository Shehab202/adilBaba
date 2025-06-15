import FilterINsidebar from "@/components/categories/filterINsidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { FaFilter } from "react-icons/fa";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="relative">
      <SidebarProvider>
        {/* start sidebar */}
        <Sidebar className="md:sticky xl:w-72 flex flex-col items-center border-none">
          <div className="h-full flex flex-col items-center bg-white px-4 md:pt-16">
            <SidebarContent className="w-full lg:w-4/5 border ps-4 mt-5 bg-transparent">
              <SidebarHeader>
                <h1 className="text-center text-lg md:text-xl text-primary font-bold">
                  {id}
                </h1>
              </SidebarHeader>
              <SidebarGroup>
                <h4 className="font-bold">Filter</h4>
              </SidebarGroup>
              <SidebarGroup>
                {/* <h4 className="font-bold">Filter</h4> */}
                <FilterINsidebar />
              </SidebarGroup>
              {/* <SidebarGroup /> */}
            </SidebarContent>
          </div>
          <SidebarFooter />
        </Sidebar>
        {/* end sidebar */}
        <main className="w-full">
          <div className="p-4 pb-0 flex justify-between md:hidden items-center">
            <h4 className="text-gray-700">Filter</h4>
            <SidebarTrigger>
              <FaFilter className="size-7 text-primary" />
            </SidebarTrigger>
          </div>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
