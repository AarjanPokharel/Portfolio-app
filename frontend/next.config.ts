import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build plain HTML, CSS and JS into out/ instead of running a Node server
  output: "export",
  // Save each page as folder/index.html, so S3 can serve /blog/my-post/
  trailingSlash: true,
};

export default nextConfig;
