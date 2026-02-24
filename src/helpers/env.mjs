/* eslint-disable no-restricted-properties */
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    /**
     * Fully-qualified connection URI in the format:
     * `mongodb+srv://USER:PASS@HOSTNAME…`
     */
    MONGODB_URL: z.string().url(),
    MONGODB_DB_NAME: z.string().nonempty(),
    PAYLOAD_SECRET: z.string().nonempty(),
    S3_ACCESS_KEY_ID: z.string().nonempty(),
    S3_ACCESS_KEY_SECRET_FILE: z.string().nonempty(),
    S3_BUCKET_NAME: z.string().nonempty(),

    /**
     * Should be `http://localhost:9000` in local development, but the container
     * endpoint in production, like `http://minio:9000` or something like that.
     */
    S3_ENDPOINT: z.url().nonempty(),

    /**
     * OIDC Client configured with `/api/auth/oauth2/callback/pocket-id` as the callback URL.
     */
    OIDC_CLIENT_ID: z.string().nonempty(),
    OIDC_CLIENT_SECRET: z.string().nonempty(),
    OIDC_URI: z.url().nonempty(),

    /**
     * This should just be a (cryptographically) random string. You can generate
     * one with this:
     *
     * openssl rand -hex 32
     */
    BETTER_AUTH_SECRET: z.string().nonempty(),

    /**
     * Should be `http://localhost:3000` in local development, or
     * `https://my-website.com` in production.
     */
    SELF_URL: z.url().nonempty(),
  },
  runtimeEnv: process.env,
});
