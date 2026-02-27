import z from "zod";

export const verbSchema = z.object({
  verb: z.string(),
  english: z.string(),
  englishThirdSingular: z.string(),
  form: z.enum(["akkusativ", "dativ", "genitiv"]),
  conjugation: z.object({
    firstPerson: z.object({
      singular: z.string(),
      plural: z.string(),
    }),
    secondPerson: z.object({
      singular: z.string(),
      plural: z.string(),
      formal: z.string(),
    }),
    thirdPerson: z.object({
      singular: z.string(),
      plural: z.string(),
    }),
  }),
});

export type Verb = z.infer<typeof verbSchema>;
