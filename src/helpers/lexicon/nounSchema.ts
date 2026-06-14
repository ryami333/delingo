import nouns from "./nouns.json";
import z from "zod";

const nounCaseSchema = z.object({
  singular: z.string(),
  plural: z.string(),
});

export const nounSchema = z.object({
  __type: z.literal("noun").default("noun"),
  gender: z.enum(["f", "m", "n"]),
  english: z.string(),
  pluralEnglish: z.string(),
  nominativ: nounCaseSchema,
  akkusativ: nounCaseSchema,
  dativ: nounCaseSchema,
});

export type Noun = z.infer<typeof nounSchema>;

export { nouns };
