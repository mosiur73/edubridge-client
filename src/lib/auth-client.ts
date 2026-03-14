// import { createAuthClient } from "better-auth/react"
// export const authClient = createAuthClient({
//     /** The base URL of the server (optional if you're using the same domain) */
//     baseURL: "http://localhost:5000"
    
// })




// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:5000",
// });




import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // ✅ baseURL খালি রাখলে same-origin /api/auth/* use করবে
  // next.config.ts এর rewrite সেটাকে backend এ forward করবে
  baseURL: "",
  fetchOptions: {
    credentials: "include",
  },
});

export const { useSession, signIn, signOut, signUp } = authClient;