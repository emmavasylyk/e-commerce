/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["e-commerce-a30a.onrender.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://e-commerce-a30a.onrender.com/api/:path*", // Замените на ваш домен
      },
    ];
  },
};

export default nextConfig;
