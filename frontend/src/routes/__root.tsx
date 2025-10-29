import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  retainSearchParams,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Donutigram",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { href: "/fonts/google-fonts.css", rel: "stylesheet" },
      { href: "/fontawesome/css/fontawesome.css", rel: "stylesheet" },
      { href: "/fontawesome/css/brands.css", rel: "stylesheet" },
      { href: "/fontawesome/css/regular.css", rel: "stylesheet" },
      { href: "/fontawesome/css/solid.css", rel: "stylesheet" },
    ],
  }),
  shellComponent: RootDocument,
  search: {
    middlewares: [retainSearchParams(true)],
  },
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning className={"Root"}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
