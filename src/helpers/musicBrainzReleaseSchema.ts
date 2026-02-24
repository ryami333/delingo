import { z } from "zod";

export const musicBrainzReleaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string().optional(),
  "artist-credit": z
    .object({
      artist: z.object({
        id: z.string(),
        name: z.string(),
      }),
    })
    .array(),
});
