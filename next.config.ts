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


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Auth requests same-origin হিসেবে backend এ forward হবে
  // এতে cookie cross-origin সমস্যা হবে না
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`,
      },
    ];
  },

  // ✅ External image domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;