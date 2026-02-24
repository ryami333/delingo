import { db } from "./db";
import { releaseSchema } from "./releaseSchema";
import z from "zod";

export const releasesCollection =
  db.collection<z.infer<typeof releaseSchema>>("releases");
