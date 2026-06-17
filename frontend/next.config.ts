import type { NextConfig } from "next";

// Where Django (and its /media/ files) live, for the dev-time proxy below.
const mediaUpstream =
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://127.0.0.1:8000";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["workwithaarjan.dev", "www.workwithaarjan.dev"],

  // Proxy /media/* to Django so uploaded images render in local dev.
  // In production nginx serves /media/ directly, so this never triggers there.
  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination: `${mediaUpstream}/media/:path*`,
      },
    ];
  },
};

export default nextConfig;
