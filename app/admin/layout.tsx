"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import AdminSidebar from "./components/admin-sidebar"
import { validateToken } from "../lib/api"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  
  // Skip auth check for login page
  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    const checkAuth = async () => {
      // Skip auth check if we're already on the login page
      if (isLoginPage) {
        setIsAuthenticated(false)
        return
      }

      const token = localStorage.getItem("portfolio-admin-token")
      if (!token) {
        router.replace("/admin/login")
        return
      }

      try {
        const isValid = await validateToken(token)
        if (!isValid) {
          localStorage.removeItem("portfolio-admin-token")
          router.replace("/admin/login")
        } else {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Auth validation error:", error)
        localStorage.removeItem("portfolio-admin-token")
        router.replace("/admin/login")
      }
    }

    checkAuth()
  }, [router, isLoginPage, pathname])

  if (isAuthenticated === null && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    )
  }

  if (isLoginPage) {
    return <>{children}</>
  }
  return (
    <div className="bg-white min-h-screen">
      <SidebarProvider>
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  )
}