import pronouns from "./pronouns.json";
import z from "zod";

const pronounDisambiguatorSchema = z.enum([
  "singular",
  "plural",
  "formal",
  "informal",
]);

export const pronounSchema = z.object({
  __type: z.literal("pronoun").default("pronoun"),
  pronoun: z.string(),
  english: z.string(),
  person: z.enum(["firstPerson", "secondPerson", "thirdPerson"]),
  number: z.enum(["singular", "plural"]),
  disambiguators: z.array(pronounDisambiguatorSchema).optional(),
});

export type Pronoun = z.infer<typeof pronounSchema>;
export type PronounDisambiguator = z.infer<typeof pronounDisambiguatorSchema>;

export { pronouns };
