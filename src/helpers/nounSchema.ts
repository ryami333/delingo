import z from "zod";

export const nounSchema = z.object({
  noun: z.string(),
  gender: z.enum(["f", "m", "n"]),
  english: z.string(),
});

export type Noun = z.infer<typeof nounSchema>;
