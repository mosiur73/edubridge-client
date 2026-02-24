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
        title: "Browser Tutor", 
        url: "/dashboard/tutors",
      },
      {
        title: "My Bookings", // Upcoming & past sessions
        url: "/dashboard/bookings",
      },
       {
        title: "Home", 
        url: "/",
      },
    ],
  },
];