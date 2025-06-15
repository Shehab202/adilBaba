import HeaderApp from "@/components/layouts/Header";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


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
  
  if (session) {
    redirect(`/`);
  }
  return (
    <html >
      <head />
      <body>
        <HeaderApp />
        <div className="[&>*]:h-full h-screen min-h-screen">{children}</div>
      </body>
    </html>
  );
}
