import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: '.next',
  // output:'export'
  images: {
    domains: ['res.cloudinary.com'], // Add Cloudinary domain
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://192.168.100.64:4000/admin/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
