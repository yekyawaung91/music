// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Or your framework's plugin
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: '/',
  plugins: [
    react(), // Or your framework's plugin
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        name: "YKA Music",
        short_name: "YKA Music",
        description: "Music player with PWA support",
        theme_color: "#6b21a8", // purple color
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          }
        ]
      },
    }),
  ],
});