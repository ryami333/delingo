import { artikelSchema } from "./artikelSchema";
import artikels from "./artikels.json";
import { getRandomItem } from "./getRandomItem";
import { nounSchema } from "./nounSchema";
import nouns from "./nouns.json";
import { NominalProblem } from "./problems/nominalProblem";

export const createRandomProblemState = () => {
  return new NominalProblem({
    noun: nounSchema.parse(getRandomItem(nouns)),
    artikel: artikelSchema.parse(getRandomItem(artikels)),
  });
};
