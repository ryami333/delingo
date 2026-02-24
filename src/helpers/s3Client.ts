import { env } from "./env.mjs";
import { S3Client } from "@aws-sdk/client-s3";
import fs from "node:fs";

export const s3Client = new S3Client({
  endpoint: env.S3_ENDPOINT,
  region: "us-east-1",
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: fs
      .readFileSync(env.S3_ACCESS_KEY_SECRET_FILE, "utf8")
      .trim(),
  },
  forcePathStyle: true,
});
