import { authClient } from "../../../helpers/authClient";
import { Button, Center, Stack, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  callbackURL: z.string().optional(),
});

export const Route = createFileRoute("/(admin)/_layout/login")({
  validateSearch: searchSchema,
  component: LoginPage,
});

function LoginPage() {
  const { callbackURL } = Route.useSearch();

  return (
    <Center mih="100vh">
      <Stack align="center">
        <Button
          onClick={() =>
            authClient.signIn.social({
              provider: "pocket-id",
              callbackURL: callbackURL ?? "/admin",
            })
          }
        >
          Login
        </Button>
      </Stack>
    </Center>
  );
}
