import { artikelSchema } from "./artikelSchema";
import artikels from "./artikels.json";
import { getRandomItem } from "./getRandomItem";
import { nounSchema } from "./nounSchema";
import nouns from "./nouns.json";
import { NominalProblem } from "./problems/NominalProblem";
import { SubjectVerbObjectProblem } from "./problems/SubjectVerbObjectProblem";
import { pronounSchema } from "./pronounSchema";
import pronouns from "./pronouns.json";
import { verbSchema } from "./verbSchema";
import verbs from "./verbs.json";

export const createRandomProblemState = () => {
  const optionIndex = Math.floor(Math.random() * 2);

  switch (optionIndex) {
    case 0: {
      return new SubjectVerbObjectProblem({
        pronoun: pronounSchema.parse(getRandomItem(pronouns)),
        verb: verbSchema.parse(getRandomItem(verbs)),
        noun: nounSchema.parse(getRandomItem(nouns)),
        artikel: artikelSchema.parse(getRandomItem(artikels)),
      });
    }
    case 1: {
      return new NominalProblem({
        noun: nounSchema.parse(getRandomItem(nouns)),
        artikel: artikelSchema.parse(getRandomItem(artikels)),
      });
    }
    default: {
      throw new Error(`Unhandled optionIndex: ${optionIndex}`);
    }
  }
};
