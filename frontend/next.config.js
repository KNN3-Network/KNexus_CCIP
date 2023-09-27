const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    dirs: ["src"],
  },
};

const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");

dotenvLoad(".env");

const withNextEnv = nextEnv();

module.exports = withNextEnv(nextConfig);
