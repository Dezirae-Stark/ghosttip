/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ghosttip/ui', '@ghosttip/shared'],
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
