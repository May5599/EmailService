// next.config.mjs
export default {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        ignored: /node_modules/,
      };
    }
    return config;
  },
};
