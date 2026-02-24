import { env } from "./env.mjs";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    typeof window === "undefined" ? env.SELF_URL : window.location.origin,
});
