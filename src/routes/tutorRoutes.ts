import { Route } from "@/types";



export const tutorRoutes: Route[] = [
  {
    title: "Tutor Dashboard",
    items: [
      {
        title: "Dashboard", 
        url: "/tutor-dashboard",
      },
      {
        title: " Create Profile", 
        url: "/tutor-dashboard/profile",
      },
      {
        title: "Set Availability", 
        url: "/tutor-dashboard/availability",
      },
      {
        title: "Home", 
        url: "/",
      },
    ],
  },
];