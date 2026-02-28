import { Route } from "@/types";



export const studentRoutes: Route[] = [
  {
    title: "Student Dashboard",
    items: [
      {
        title: "Dashboard", 
        url: "/dashboard",
      },
      {
        title: "Browse Tutor", 
        url: "/dashboard/tutors",
      },
      {
        title: "My Bookings", 
        url: "/dashboard/bookings",
      },
      {
        title: "My Reviews", 
        url: "/dashboard/reviews",
      },
      {
        title: "Profile", 
        url: "/dashboard/profile",
      },
       {
        title: "Home", 
        url: "/",
      },
    ],
  },
];