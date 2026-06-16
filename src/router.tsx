import { routeTree } from "./routeTree.gen";
import { createRouter } from "@tanstack/react-router";

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    // Matches Vite's `base` so routing works when served from a subpath
    // (e.g. GitHub Pages at /delingo/). Resolves to "/" in dev.
    basepath: import.meta.env.BASE_URL,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
