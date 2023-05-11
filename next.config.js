const path = require("path");
const withSvgr = require("next-plugin-svgr");
const withTM = require("next-transpile-modules")(["gsap", "snarkdown"], {
  unstable_webpack5: true,
});
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  target: "serverless",
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: { serverComponents: true },
  // add your aliases here
  aliases: {
    "@web": path.resolve(__dirname, "src/web"),
    "@components": path.resolve(__dirname, "src/components"),
    "@utils": path.resolve(__dirname, "src/utils"),
  },
  fallback: true,
  runtime:'nodejs'
};

module.exports = withBundleAnalyzer(withSvgr(withTM(nextConfig)));