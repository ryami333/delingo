import transitiveVerbs from "./transitiveVerbs.json";
import z from "zod";

export const transitiveVerbSchema = z.object({
  __type: z.literal("transitiveVerb").default("transitiveVerb"),
  verb: z.string(),
  english: z.string(),
  englishThirdSingular: z.string(),
  form: z.enum(["nominativ", "akkusativ", "dativ"]),
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

export type TransitiveVerb = z.infer<typeof transitiveVerbSchema>;

export { transitiveVerbs };
