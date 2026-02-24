import { authClient } from "../../../helpers/authClient.ts";
import { authMiddleware } from "../../../helpers/authMiddleware";
import {
  AppShell,
  Burger,
  Container,
  Group,
  NavLink,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAdjustments, IconLogout } from "@tabler/icons-react";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(admin)/_layout/_protected")({
  server: {
    middleware: [authMiddleware],
  },
  component: function ProtectedLayout() {
    const [opened, { toggle }] = useDisclosure();

    return (
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Title size="lg">Mitch's Record Club</Title>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <NavLink
            href="/"
            label="Releases"
            leftSection={<IconAdjustments size={16} stroke={1.5} />}
          />
          <NavLink
            onClick={async () => {
              await authClient.signOut();
              redirect({ to: "/login" });
            }}
            label="Logout"
            leftSection={<IconLogout size={16} stroke={1.5} />}
          />
        </AppShell.Navbar>
        <AppShell.Main>
          <Container size="lg">
            <Outlet />
          </Container>
        </AppShell.Main>
      </AppShell>
    );
  },
});
