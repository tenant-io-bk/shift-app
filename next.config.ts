import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force Vercel to skip build cache and always recompile
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
};

export default nextConfig;
