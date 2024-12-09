import withPWA from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "kalc.pro",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ttf|otf|eot|woff|woff2)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "static/fonts",
          publicPath: "/_next/static/fonts",
        },
      },
    });
    config.module.rules.push({
      test: /\.pdf$/,
      type: "asset/resource",
    });
    return config;
  },
};

// Упрощенная конфигурация runtimeCaching
export default withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: false,
  },
  fallbacks: {
    document: "/offline.html",
  },
  runtimeCaching: [
    /* {
      // Кэшируем изображения с localhost или kalc.pro
      urlPattern:
        /^http:\/\/localhost:8080\/uploads\/.*$|^https:\/\/kalc\.pro\/uploads\/.*$/,
      handler: "CacheFirst",
      options: {
        cacheName: "image-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // Храним 7 дней
        },
      },
    }, */
    {
      // Кэшируем шрифты и PDF
      urlPattern: /\.(?:woff2?|ttf|eot)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 30 * 24 * 60 * 60, // Храним 30 дней
        },
      },
    },
    {
      // Кэшируем страницы и API-запросы
      urlPattern:
        process.env.NODE_ENV === "production"
          ? /^https:\/\/kalc\.pro\/(?!api\/).*/i
          : /^http:\/\/localhost:3000\/.*/i, // Для локалки все страницы на localhost:3000
      handler: "NetworkFirst",
      options: {
        cacheName: "http-cache",
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, // Храним 7 дней
        },
      },
    },
  ],
})(nextConfig);
