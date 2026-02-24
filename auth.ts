import { db } from "./src/helpers/db";
import { env } from "./src/helpers/env.mjs";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { genericOAuth } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.SELF_URL,
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "pocket-id",
          scopes: ["openid", "email", "profile"],
          clientId: env.OIDC_CLIENT_ID,
          clientSecret: env.OIDC_CLIENT_SECRET,
          discoveryUrl: `${env.OIDC_URI}/.well-known/openid-configuration`,
        },
      ],
    }),
    /**
     * ⚠️ Needs to be last plugin in the array:
     */
    tanstackStartCookies(),
  ],
});
