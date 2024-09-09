import { defineConfig, PluginOption, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

import { fileURLToPath, URL } from "node:url";

function buildPlugins(env: Record<string, string>) {
  const plugins: PluginOption[] = [];
  plugins.push(react());

  if (env.DISABLE_ESLINT === "false") {
    plugins.push(
      checker({
        eslint: {
          lintCommand: "eslint ./src",
          useFlatConfig: true,
        },
        overlay: { initialIsOpen: false },
      }),
    );
  }

  return plugins;
}

//https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    //https://github.com/vitejs/vite/discussions/17738
    optimizeDeps: {
      force: true,
    },
    plugins: buildPlugins(env),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
