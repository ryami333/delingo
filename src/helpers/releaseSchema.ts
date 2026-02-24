import z from "zod";

export const releaseSchema = z.object({
  title: z.string(),
  date: z.iso.date().optional(),
  artists: z
    .object({
      name: z.string(),
    })
    .array(),
  cover: z.object({
    filename: z.string(),
  }),
});

export type ReleaseDocument = z.infer<typeof releaseSchema>;
