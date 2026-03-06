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
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:5000",
  
  // ✅ CRITICAL: Ensure cookies are sent with every request
  fetchOptions: {
    credentials: 'include',
    onSuccess: (ctx) => {
      // Refresh session after any auth action
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    },
  },
});