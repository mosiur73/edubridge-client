import * as React from "react"

import { SearchForm } from "@/components/layout/search-form"
import { VersionSwitcher } from "@/components/layout/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Route } from "@/types"
import { Roles } from "@/constants/role"
import { adminRoutes } from "@/routes/adminRoutes"
import { studentRoutes } from "@/routes/studentRoutes"
import { tutorRoutes } from "@/routes/tutorRoutes"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Tutor",
          url: "/dashboard/tutor",
        },
        {
          title: "profile",
          url: "/dashboard/profile",
        },
      ],
    },
   
  
  
  ],
}

export function AppSidebar({
  user,
   ...props 
  }: {
    user: {role: string} & React.ComponentProps<typeof Sidebar>}) {
    
      let routes : Route[] = []

      switch (user.role){
        case Roles.admin: 
        routes=adminRoutes;
        break;
        case Roles.student: 
        routes=studentRoutes;
        break;
        case Roles.tutor: 
        routes=tutorRoutes;
        break;

        default:
          routes= [];
          break
      }
  return (
    <Sidebar {...props}>
      <SidebarHeader> 
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
       
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
