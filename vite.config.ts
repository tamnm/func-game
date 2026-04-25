import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repositoryName = "fun-game";
const basePath = process.env.VITE_BASE_PATH ?? `/${repositoryName}/`;

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? basePath : "/",
  plugins: [react()],
});
