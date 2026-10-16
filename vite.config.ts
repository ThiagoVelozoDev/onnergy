import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Substitui %VITE_GOOGLE_SITE_VERIFICATION% no index.html sempre por um
 * valor seguro (a env var real, ou string vazia) — antes do plugin interno
 * do Vite tentar o mesmo, que WARN + deixa o placeholder literal no HTML
 * caso a env var não esteja definida em lugar nenhum (nem vazia). Isso
 * garante o mesmo comportamento em dev, build local e na Vercel,
 * independente de a env var já ter sido cadastrada lá ou não.
 */
function htmlEnvFallback(env: Record<string, string>): Plugin {
  return {
    name: "html-env-fallback",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return html.replace(
          /%VITE_GOOGLE_SITE_VERIFICATION%/g,
          env.VITE_GOOGLE_SITE_VERIFICATION ?? "",
        );
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), htmlEnvFallback(env)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
