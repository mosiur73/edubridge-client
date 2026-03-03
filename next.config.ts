// import "./src/env";
// import type { NextConfig } from "next";
// const nextConfig: NextConfig = {
//   /* config options here */
//    async rewrites() {
//     return [
//       {
//         source: "/api/auth/:path*",
//         destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`,
//       },
//     ];
//   },

// };
// export default nextConfig;


import "./src/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:5000';
    
    return [
      {
        source: "/api/auth/:path*",
        destination: `${backendURL}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;