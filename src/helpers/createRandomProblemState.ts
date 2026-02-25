import { getRandomIndex } from "./getRandomIndex";
import { nounSchema } from "./nounSchema";
import nouns from "./nouns.json";

export const createRandomProblemState = () => {
  const randomIndex = getRandomIndex(nouns);
  const noun = nounSchema.parse(nouns.at(randomIndex));
  const plural = Math.random() > 0.75; // One-quarter of the time
  return {
    uuid: window.crypto.randomUUID(),
    noun,
    plural,
  };
};
