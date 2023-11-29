import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
  },
  server: {
    host: "0.0.0.0",
    port: 5174,
  },
  plugins: [react()],
});
