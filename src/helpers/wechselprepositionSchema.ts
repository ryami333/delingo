import wechselPrepositions from "./wechselprepositions.json";
import z from "zod";

export const wechselprepositionSchema = z.object({
  __type: z.literal("wechselpreposition").default("wechselpreposition"),
  preposition: z.string(),
  english: z.string(),
});

export type Wechselpreposition = z.infer<typeof wechselprepositionSchema>;

export { wechselPrepositions };
