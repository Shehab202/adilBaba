"use client";
import React from "react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import ChatPage, { ChatPageDrawer } from "@/app/(pages)/(chat)/chat/page";

export default function ChatDrawer({
    children
}: {children: React.ReactNode}) {
    const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="mt-20 relative z-auto">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden  top-4 left-4 z-40"
          >fjn
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] z-[409348948320]">
          <div className="py-4">
            <h2 className="text-lg font-semibold mb-4">Messages</h2>
            <Sidebar />
          </div>
        </SheetContent>
      </Sheet>

      <div className="w-80 border-r hidden lg:block">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">Messages</h1>
        </div>
        <Sidebar />
      </div>

      <div className="flex- overflow-auto">
        {/* <ChatPage  /> */}
      </div>
    </div>
  );
}


const Sidebar = function(){
    const chats: any[] = [
        {
          id: "1",
          name: "Digital Market",
          lastMessage: "You're very welco...",
          avatar: "/placeholder.svg",
          timestamp: "15 Min",
        },
        {
          id: "2",
          name: "Fashion store",
          lastMessage: "white shirt is availa...",
          avatar: "/placeholder.svg",
          timestamp: "12:36 PM",
        },
        {
          id: "3",
          name: "Hardware house",
          lastMessage: "Your order is compl...",
          avatar: "/placeholder.svg",
          timestamp: "12:36 PM",
        },
      ];
  return(
    <ScrollArea className="h-[calc(100vh-73px)]">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="flex items-center gap-3 p-4 cursor-pointer hover:bg-accent transition-colors"
        >
          <Avatar>
            <AvatarImage src={chat.avatar} alt={chat.name} />
            <AvatarFallback>{chat.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">{chat.name}</h2>
              <span className="text-xs text-muted-foreground">
                {chat.timestamp}
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {chat.lastMessage}
            </p>
          </div>
        </div>
      ))}
    </ScrollArea>
  )};