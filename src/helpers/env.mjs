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
  },
  runtimeEnv: process.env,
});
