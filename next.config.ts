import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tqhzuvczenrfbxtjuxhu.supabase.co",
      },
    ],
  },
};

export default nextConfig;
