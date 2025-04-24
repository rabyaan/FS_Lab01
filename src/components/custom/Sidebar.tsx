"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { GraduationCap, Home, Users } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname(); 

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Students",
      icon: Users,
      href: "/student/list",
      active: pathname === "/student/list",
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-900">Student Portal</h1>
        </div>
      </div>
      <div className="flex-1 px-3">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-100",
                route.active ? "bg-gray-100 text-blue-600" : "text-gray-600"
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 