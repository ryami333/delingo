import z from "zod";

export const nounSchema = z.object({
  noun: z.string(),
  pluralNoun: z.string(),
  gender: z.enum(["f", "m", "n"]),
  english: z.string(),
  pluralEnglish: z.string(),
});

export type Noun = z.infer<typeof nounSchema>;
