import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["manseryeok", "saju-engine", "saju-report"],
  turbopack: {},
  webpack: (config) => {
    config.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
    };
    return config;
  },
};

export default nextConfig;
