import { artikelSchema } from "./artikelSchema";
import artikels from "./artikels.json";
import { getRandomIndex } from "./getRandomIndex";
import { nounSchema } from "./nounSchema";
import nouns from "./nouns.json";
import { NominalProblem } from "./problems/nominalProblem";

export const createRandomProblemState = () => {
  const randomNounIndex = getRandomIndex(nouns);
  const noun = nounSchema.parse(nouns.at(randomNounIndex));

  const randomArtikelIndex = getRandomIndex(artikels);
  const artikel = artikelSchema.parse(artikels.at(randomArtikelIndex));

  return new NominalProblem({ noun, artikel });
};
