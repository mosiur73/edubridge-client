import { Route } from "@/types";



export const tutorRoutes: Route[] = [
  {
    title: "Tutor Dashboard",
    items: [
      {
        title: "Overview", 
        url: "/tutor/dashboard",
      },
      {
        title: "My Sessions", 
        url: "/tutor/sessions",
      },
      {
        title: "Set Availability", 
        url: "/tutor/availability",
      },
      {
        title: "Tutor Profile", 
        url: "/tutor/profile",
      },
      {
        title: "Reviews", 
        url: "/tutor/reviews",
      },
      {
        title: "Home", 
        url: "/",
      },
    ],
  },
];