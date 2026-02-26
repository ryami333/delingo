import z from "zod";

export const pronounSchema = z.object({
  pronoun: z.string(),
  english: z.string(),
  person: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  number: z.enum(["singular", "plural", "formal"]),
});

export type Pronoun = z.infer<typeof pronounSchema>;
