import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yourshousing.servecafe.app",
        pathname: "/resources/**",
      },
      {
        protocol: "https",
        hostname: "yourshousing.servecafe.app",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost:3000",
        pathname: "/resources/**",
      },
    ],
  },
};
