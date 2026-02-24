import { MantineProvider } from "@mantine/core";
import mantineCss from "@mantine/core/styles.css?url";
import { Notifications } from "@mantine/notifications";
import mantineNotificationsCss from "@mantine/notifications/styles.css?url";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(admin)/_layout")({
  ssr: false, // Mantine generates responsive inline <style> blocks differently on server vs client.
  head: () => ({
    links: [
      { rel: "stylesheet", href: mantineCss },
      { rel: "stylesheet", href: mantineNotificationsCss },
    ],
  }),
  component: function Layout() {
    return (
      <MantineProvider forceColorScheme="dark">
        <Notifications />
        <Outlet />
      </MantineProvider>
    );
  },
});
