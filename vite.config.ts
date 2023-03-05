import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/login": {
        target: "https://github.com",
        changeOrigin: true,
        configure: (proxy, options) => {
          console.log(proxy, options)
        },
      },
    },
  },
});
