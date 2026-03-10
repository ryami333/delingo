import artikels from "./artikels.json";
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

const pluralitySchema = z.enum(["singular", "plural"]);

export const artikelSchema = z.object({
  __type: z.literal("artikel").default("artikel"),
  word: z.string(),
  english: z.string(),
  disambiguators: z.array(disambiguatorSchema).optional(),
  supportedPlurality: z.array(pluralitySchema),
  nominativ: artikelCaseSchema,
  akkusativ: artikelCaseSchema,
  dativ: artikelCaseSchema,
  genitiv: artikelCaseSchema,
});

export type Artikel = z.infer<typeof artikelSchema>;
export type Disambiguator = z.infer<typeof disambiguatorSchema>;

export { artikels };
