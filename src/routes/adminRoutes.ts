import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Management",
    items: [
      {
        title: "Admin Dashboard", 
        url: "/admin-dashboard",
      },
      {
        title: "Users Management", 
        url: "/admin-dashboard/users",
      },
      {
        title: "All Bookings", 
        url: "/admin-dashboard/bookings",
      },
      {
        title: "Categories", 
        url: "/admin-dashboard/categories",
      },
       {
        title: "Home", 
        url: "/",
      },
    ],
  },
];