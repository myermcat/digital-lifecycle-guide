import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

function routerBasepath() {
  const base = import.meta.env.BASE_URL;
  if (!base || base === "/") return undefined;
  return base.replace(/\/$/, "");
}

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    basepath: routerBasepath(),
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
