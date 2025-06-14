import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v2_route: true,
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    proxy: {
      '/predict': {
        target: 'https://us-central1-chekbottesting.cloudfunctions.net', // URL de la API
        changeOrigin: true, // Cambiar el origen de la solicitud
        rewrite: (path) => path.replace(/^\/predict/, '/predict') // Asegura que la ruta sea correcta
      }
    }
  }
});
