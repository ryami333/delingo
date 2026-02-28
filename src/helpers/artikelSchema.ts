import z from "zod";

const artikelCaseSchema = z.object({
  m: z.string(),
  f: z.string(),
  n: z.string(),
  pl: z.string().nullable(),
});

export const disambiguatorSchema = z.enum([
  "singular",
  "plural",
  "formal",
  "informal",
]);

export const artikelSchema = z.object({
  word: z.string(),
  english: z.string(),
  disambiguators: z.array(disambiguatorSchema).optional(),
  nominativ: artikelCaseSchema,
  akkusativ: artikelCaseSchema,
  dativ: artikelCaseSchema,
  genitiv: artikelCaseSchema,
});

export type Artikel = z.infer<typeof artikelSchema>;
export type Disambiguator = z.infer<typeof disambiguatorSchema>;
