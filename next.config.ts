import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Skip ESLint during `next build`
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
