"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Briefcase, Code, Layers } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export default function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Projects",
      path: "/admin/projects",
      icon: Layers,
    },
    {
      title: "Experience",
      path: "/admin/experience",
      icon: Briefcase,
    },
    {
      title: "Skills",
      path: "/admin/skills",
      icon: Code,
    },
  ]

  return (
    <Sidebar variant="inset" className="border-r border-gray-700">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ADMIN</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.path} tooltip={item.title}>
                    <Link href={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
