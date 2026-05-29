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
        pathname: "/uploads/**",
      },
    ],
  },
};
export default nextConfig;
