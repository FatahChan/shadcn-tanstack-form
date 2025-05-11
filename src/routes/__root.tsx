import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Button } from "@/components/ui/button";
import { PostHogProvider } from "@/lib/posthog/provider";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext()({
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
        title: "Shadcn UI + TanStack Form Integration",
      },
      {
        name: "description",
        content:
          "A  modern, type-safe form management solution combining Shadcn UI with TanStack Form",
      },
      {
        name: "theme-color",
        content: "#000000",
      },
    ],

    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        href: `${import.meta.env.VITE_BASE_URL ?? ""}/favicon-96x96.png`,
        sizes: "96x96",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: `${import.meta.env.VITE_BASE_URL ?? ""}/favicon.svg`,
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: `${import.meta.env.VITE_BASE_URL ?? ""}/apple-touch-icon.png`,
      },
      {
        rel: "shortcut icon",
        href: `${import.meta.env.VITE_BASE_URL ?? ""}/favicon.ico`,
      },
      {
        rel: "manifest",
        href: `${import.meta.env.VITE_BASE_URL ?? ""}/manifest.json`,
      },
      {
        rel: "apple-touch-icon",
        href: `${import.meta.env.VITE_BASE_URL ?? ""}/apple-touch-icon.png`,
        sizes: "180x180",
      },
      {
        rel: "apple-touch-icon",
        href: `${import.meta.env.VITE_BASE_URL ?? ""}/logo192.png`,
      },
    ],
  }),

  component: () => (
    <RootDocument>
      <Outlet />
      <TanStackRouterDevtools />
    </RootDocument>
  ),
  notFoundComponent: () => (
    <RootDocument>
      <PostHogProvider>
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
          <p className="font-semibold text-3xl">Not Found</p>

          <p className="mt-4">
            Sorry, we couldn't find the page you were looking for.
          </p>
          <Button
            asChild
            className="mt-8 flex justify-center gap-4"
            variant="outline"
          >
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </PostHogProvider>
    </RootDocument>
  ),
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
