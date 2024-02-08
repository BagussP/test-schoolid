/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});


module.exports = withPWA({
  images: {
    domains: ["staging.nutshells.id"],
  },
});

// const nextConfig = {
//   images: {
//     domains: ["staging.nutshells.id"],
//   },
// };

// module.exports = nextConfig;

