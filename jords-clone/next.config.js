/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/Vs.Software", // ⚠️ IMPORTANT: your repo name is Vs.Software
};

module.exports = nextConfig;