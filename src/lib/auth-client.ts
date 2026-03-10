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
  // ✅ window.location.origin use করলে same-origin হয়
  // next.config.ts এ rewrite করা আছে তাই /api/auth/* → backend এ যাবে
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  fetchOptions: {
    credentials: "include",
  },
});

export const { useSession, signIn, signOut, signUp } = authClient;