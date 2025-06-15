import HeaderApp from "@/components/layouts/Header";
import FooterApp from "@/components/layouts/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as ToastApp } from "react-hot-toast";
import { getServerSession } from "next-auth";
import NextTopLoader from "nextjs-toploader";
import { ChatPageDrawer } from "./(chat)/chat/page";
import { authOptions } from "@/utils/authOptions";


export async function generateMetadata() {
  return {
    title: "AdelBaba Store",
    content:
      "A playground to explore new Next.js 13/14 app directory features such as nested layouts, instant loading states, streaming, and component level data fetching.",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    // redirect("/auth/login");
  }
  return (
    <html>
      <head />
      <body>
        <NextTopLoader color="var(--primary)" />
        <div className="relative z-[48484817878]">
          <Toaster />
          <ToastApp />
        </div>
        <HeaderApp />
        {children}
        <ChatPageDrawer />
        <FooterApp />
      </body>
    </html>
  );
}
