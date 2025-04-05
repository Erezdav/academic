import type { NextConfig } from "next";
const nextConfig = {
  webpack: (config) => {
    // פתרון לבעיית מודולים של Node.js בצד הלקוח
    config.resolve.fallback = {
      fs: false,
      module: false,
      path: false,
      os: false,
      crypto: false,
      v8: false,
      perf_hooks: false,
      'perf_hooks': false,
      child_process: false,
      net: false,
      tls: false,
    };
    return config;
  },
  transpilePackages: ['tailwindcss']
};

module.exports = nextConfig;