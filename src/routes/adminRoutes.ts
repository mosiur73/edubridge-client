import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Management",
    items: [
      {
        title: "Statistics", // Analytics page
        url: "/admin/dashboard",
      },
      {
        title: "Users", // Manage users (ban/unban)
        url: "/admin/users",
      },
      {
        title: "All Bookings", // View all session bookings
        url: "/admin/bookings",
      },
      {
        title: "Categories", // Manage subject categories
        url: "/admin/categories",
      },
       {
        title: "Home", 
        url: "/",
      },
    ],
  },
];