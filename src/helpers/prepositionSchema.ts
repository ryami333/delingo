import z from "zod";

export const prepositionSchema = z.object({
  __type: z.literal("preposition").default("preposition"),
  preposition: z.string(),
  english: z.string(),
  form: z.enum(["akkusativ", "dativ"]),
});

export type Preposition = z.infer<typeof prepositionSchema>;
