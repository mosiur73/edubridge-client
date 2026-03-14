import type { NextConfig } from "next";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://edubridge-backend-ruddy.vercel.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${BACKEND_URL}/api/auth/:path*`,
      },
    ];
  },

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