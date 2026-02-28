import z from "zod";

export const verbSchema = z.object({
  __type: z.literal("verb").default("verb"),
  verb: z.string(),
  english: z.string(),
  englishThirdSingular: z.string(),
  form: z.enum(["nominativ", "akkusativ", "dativ", "genitiv"]),
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

export type Verb = z.infer<typeof verbSchema>;
