import intransitiveVerbs from "./intransitiveVerbs.json";
import z from "zod";

export const intransitiveVerbSchema = z.object({
  __type: z.literal("intransitiveVerb").default("intransitiveVerb"),
  verb: z.string(),
  direction: z.enum(["directional", "locative"]),
  english: z.string(),
  englishThirdSingular: z.string(),
  conjugation: z.object({
    firstPerson: z.object({
      singular: z.string(),
      plural: z.string(),
    }),
    secondPerson: z.object({
      singular: z.string(),
      plural: z.string(),
    }),
    thirdPerson: z.object({
      singular: z.string(),
      plural: z.string(),
    }),
  }),
});

export type IntransitiveVerb = z.infer<typeof intransitiveVerbSchema>;

export { intransitiveVerbs };
