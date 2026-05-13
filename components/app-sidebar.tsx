"use client"

import * as React from "react"
import {
  IconLayoutDashboard,
  IconChartBar,
  IconWallet,
  IconUser,
  IconSettings,
  IconCreditCard,
  IconUsers,
  IconFileText,
  IconBuildingBank
} from "@tabler/icons-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"

const navItems = {
  user: [
    { title: "Overview", url: "/dashboard/user", icon: IconLayoutDashboard },
    { title: "Credit Score", url: "/dashboard/user/credit", icon: IconChartBar },
    { title: "Subscriptions", url: "/dashboard/user/payments", icon: IconCreditCard },
    { title: "Wallet", url: "/dashboard/user/wallet", icon: IconWallet },
    { title: "Profile", url: "/dashboard/user/profile", icon: IconUser },
    { title: "Settings", url: "/dashboard/user/settings", icon: IconSettings },
  ],
  institution: [
    { title: "Overview", url: "/dashboard/institution", icon: IconLayoutDashboard },
    { title: "Bulk Scoring", url: "/dashboard/institution/scoring", icon: IconChartBar },
    { title: "API Integrations", url: "/dashboard/institution/api", icon: IconFileText },
    { title: "Payments", url: "/dashboard/institution/payments", icon: IconCreditCard },
    { title: "Clients", url: "/dashboard/institution/clients", icon: IconUsers },
    { title: "Settings", url: "/dashboard/institution/settings", icon: IconSettings },
  ],
  admin: [
    { title: "Overview", url: "/admin", icon: IconLayoutDashboard },
    { title: "Users", url: "/admin/users", icon: IconUsers },
    { title: "Institutions", url: "/admin/institutions", icon: IconBuildingBank },
    { title: "System Logs", url: "/admin/logs", icon: IconFileText },
    { title: "Analytics", url: "/admin/analytics", icon: IconChartBar },
    { title: "Settings", url: "/admin/settings", icon: IconSettings },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { user: authUser, logout } = useAuth()
  const [institutionName, setInstitutionName] = React.useState<string | null>(null)
  
  let role = "user" as keyof typeof navItems
  if (pathname.includes("/dashboard/institution")) {
    role = "institution"
  } else if (pathname.includes("/admin")) {
    role = "admin"
  }

  React.useEffect(() => {
    if (role === "institution") {
      import("@/lib/api-client").then(({ apiClient }) => {
        apiClient<{ data: { institution: { name: string } } }>("/api/v1/institution/profile")
          .then(res => setInstitutionName(res.data.institution.name))
          .catch(() => {});
      });
    }
  }, [role]);

  const items = navItems[role]
  const user = {
    name: institutionName || authUser?.name || (role === "user" ? "Client" : role === "institution" ? "Institution" : "Admin"),
    email: authUser?.email || "mosaic@example.com",
    avatar: undefined, 
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <div className="h-8 w-8 rounded-lg bg-[#00FF00] flex items-center justify-center">
             <span className="font-bold text-black">M</span>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold text-[#00FF00]">Mosaic Africa</span>
            <span className="truncate text-xs text-zinc-400">Enterprise</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={pathname === item.url} tooltip={item.title} render={<Link href={item.url} />}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                    <AvatarFallback className="rounded-lg bg-zinc-800 text-zinc-400">{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                  <IconSettings className="ml-auto size-4" />
                </SidebarMenuButton>
              } />
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem onClick={logout}>
                   Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
