import appCss from "../assets/css/main.css?url";
import { MantineProvider } from "@mantine/core";
import mantineCoreCss from "@mantine/core/styles.css?url";
import { Notifications } from "@mantine/notifications";
import mantineNotificationsCss from "@mantine/notifications/styles.css?url";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  ssr: false,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [
      { rel: "stylesheet", href: mantineCoreCss },
      { rel: "stylesheet", href: mantineNotificationsCss },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  component: function _RootComponent() {
    return (
      <RootComponent>
        <Outlet />
      </RootComponent>
    );
  },
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

export function RootComponent({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider forceColorScheme="dark">
      <Notifications />
      {children}
    </MantineProvider>
  );
}
