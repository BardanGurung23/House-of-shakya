// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // trailingSlash: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "/:path*",
  //     },
  //   ];
  // },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
      },
      {
        protocol: "https",
        hostname: "admin.technirvana.com.np",
      },
    ],
  },
};

module.exports = nextConfig;
