// import "./src/env";

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     formats: ["image/avif", "image/webp"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//     ],
//   },
 
// };

// export default nextConfig;



import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // better-auth proxy
  async rewrites() {
    return [
      {
        // Explicitly map auth requests
        source: "/api/auth/:path*",
        destination: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/:path*",
      },
      {
        // Explicitly map v1 API requests
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
