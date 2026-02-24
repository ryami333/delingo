import z from "zod";

const artikelCaseSchema = z.object({
  m: z.string(),
  f: z.string(),
  n: z.string(),
  pl: z.string().nullable(),
});

export const artikelSchema = z.object({
  word: z.string(),
  english: z.string(),
  nominativ: artikelCaseSchema,
  akkusativ: artikelCaseSchema,
  dativ: artikelCaseSchema,
  genitiv: artikelCaseSchema,
});

export type Artikel = z.infer<typeof artikelSchema>;
