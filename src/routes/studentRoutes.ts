import { Route } from "@/types";



export const studentRoutes: Route[] = [
  {
    title: "Student Dashboard",
    items: [
      {
        title: "My Bookings", // Upcoming & past sessions
        url: "/dashboard/bookings",
      },
      {
        title: "Favorite Tutors", // (Bonus) saved tutor list
        url: "/dashboard/favorites",
      },
      {
        title: "Manage Profile", // Basic user info edit
        url: "/dashboard/profile",
      },
       {
        title: "Home", 
        url: "/",
      },
    ],
  },
];