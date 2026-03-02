import { disambiguatorSchema } from "./artikelSchema";
import z from "zod";

export const pronounSchema = z.object({
  __type: z.literal("pronoun").default("pronoun"),
  pronoun: z.string(),
  english: z.string(),
  person: z.enum(["firstPerson", "secondPerson", "thirdPerson"]),
  number: z.enum(["singular", "plural"]),
  disambiguators: z.array(disambiguatorSchema).optional(),
});

export type Pronoun = z.infer<typeof pronounSchema>;
