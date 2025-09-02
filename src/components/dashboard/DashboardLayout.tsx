"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  Calendar,
  ChevronRight,
  ClipboardList,
  Home,
  Menu,
  Scissors,
  Settings,
  Users,
  LogOut,
  MonitorSmartphone,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children = <div className="p-6">Dashboard Content</div>,
}: DashboardLayoutProps) {
  const [isKioskMode, setIsKioskMode] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Appointments", href: "/appointments", icon: Calendar },
    { name: "Barbers", href: "/barbers", icon: Scissors },
    { name: "Clients", href: "/clients", icon: Users },
    { name: "Services", href: "/services", icon: ClipboardList },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const handleModeToggle = () => {
    setIsKioskMode(!isKioskMode);
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-zinc-900 border-r border-zinc-800">
          <div className="flex items-center justify-center h-16 px-4">
            <h1 className="text-xl font-bold text-red-600">BARBERSHOP</h1>
          </div>
          <div className="px-3 mt-6">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md group",
                      isActive
                        ? "bg-red-900/50 text-red-500"
                        : "text-zinc-300 hover:bg-zinc-800 hover:text-white",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0",
                        isActive
                          ? "text-red-500"
                          : "text-zinc-400 group-hover:text-zinc-300",
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="mt-auto p-4">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MonitorSmartphone className="h-5 w-5 text-zinc-400" />
                    <span className="text-sm font-medium">Kiosk Mode</span>
                  </div>
                  <Switch
                    checked={isKioskMode}
                    onCheckedChange={handleModeToggle}
                    className="data-[state=checked]:bg-red-600"
                  />
                </div>
              </CardContent>
            </Card>
            <div className="mt-4">
              <div className="flex items-center p-2 -mx-2 rounded-md hover:bg-zinc-800 cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                    alt="Admin"
                  />
                  <AvatarFallback className="bg-red-900">AD</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-zinc-500">admin@barbershop.com</p>
                </div>
                <LogOut className="ml-auto h-5 w-5 text-zinc-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute top-4 left-4 z-10"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-64 p-0 bg-zinc-900 border-r border-zinc-800"
        >
          <div className="flex items-center justify-center h-16 px-4 border-b border-zinc-800">
            <h1 className="text-xl font-bold text-red-600">BARBERSHOP</h1>
          </div>
          <div className="px-3 py-6">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md group",
                      isActive
                        ? "bg-red-900/50 text-red-500"
                        : "text-zinc-300 hover:bg-zinc-800 hover:text-white",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0",
                        isActive
                          ? "text-red-500"
                          : "text-zinc-400 group-hover:text-zinc-300",
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="px-4 mt-auto">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MonitorSmartphone className="h-5 w-5 text-zinc-400" />
                    <span className="text-sm font-medium">Kiosk Mode</span>
                  </div>
                  <Switch
                    checked={isKioskMode}
                    onCheckedChange={handleModeToggle}
                    className="data-[state=checked]:bg-red-600"
                  />
                </div>
              </CardContent>
            </Card>
            <div className="mt-4">
              <div className="flex items-center p-2 -mx-2 rounded-md hover:bg-zinc-800 cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                    alt="Admin"
                  />
                  <AvatarFallback className="bg-red-900">AD</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-zinc-500">admin@barbershop.com</p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden bg-zinc-950">
        {/* Top header */}
        <header className="bg-zinc-900 border-b border-zinc-800 shadow-md">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <div className="flex items-center md:hidden">
              <h1 className="ml-10 text-xl font-bold text-red-600">
                BARBERSHOP
              </h1>
            </div>
            <div className="flex items-center ml-auto">
              <div className="hidden md:flex items-center mr-4 space-x-2">
                <div className="flex items-center space-x-3">
                  <MonitorSmartphone className="h-5 w-5 text-zinc-400" />
                  <span className="text-sm font-medium">Kiosk Mode</span>
                </div>
                <Switch
                  checked={isKioskMode}
                  onCheckedChange={handleModeToggle}
                  className="data-[state=checked]:bg-red-600"
                />
              </div>
              <Separator
                orientation="vertical"
                className="hidden md:block h-8 mx-4 bg-zinc-700"
              />
              <div className="hidden md:flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                    alt="Admin"
                  />
                  <AvatarFallback className="bg-red-900">AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-zinc-500">admin@barbershop.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {isKioskMode ? (
            <div className="h-full bg-black">
              {/* Kiosk Interface will be rendered here */}
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <h2 className="text-3xl font-bold text-red-600 mb-6">
                  Kiosk Mode Active
                </h2>
                <p className="text-lg text-zinc-300 mb-8">
                  The client-facing kiosk interface is now active.
                </p>
                <Button
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-900/20"
                  onClick={handleModeToggle}
                >
                  Return to Admin Mode
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 md:p-6">{children}</div>
          )}
        </main>
      </div>
    </div>
  );
}
