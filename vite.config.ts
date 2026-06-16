import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  // Served from https://ryami333.github.io/delingo/ on GitHub Pages, so
  // production assets need the repo name as a base path. Dev stays at root.
  base: command === "build" ? "/delingo/" : "/",
  server: {
    port: 3000,
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]__[hash:base64:5]",
    },
  },
  plugins: [
    // SPA mode prerenders a static index.html shell (no SSR server needed),
    // which is what GitHub Pages serves.
    tanstackStart({ srcDirectory: "src", spa: { enabled: true } }),
    viteReact(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    nitro({
      noExternals: ["graphql"],
    }),
  ],
}));
