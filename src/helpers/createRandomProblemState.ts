import { artikelSchema } from "./artikelSchema";
import artikels from "./artikels.json";
import { getRandomItem } from "./getRandomItem";
import { intransitiveVerbSchema } from "./intransitiveVerbSchema";
import intransitiveVerbs from "./intransitiveVerbs.json";
import { nounSchema } from "./nounSchema";
import nouns from "./nouns.json";
import { prepositionSchema } from "./prepositionSchema";
import prepositions from "./prepositions.json";
import { NominalProblem } from "./problems/NominalProblem";
import { SubjectVerbObjectProblem } from "./problems/SubjectVerbObjectProblem";
import { SubjectVerbPrepositionalProblem } from "./problems/SubjectVerbPrepositionalProblem";
import { SubjectVerbWechselProblem } from "./problems/SubjectVerbWechselProblem";
import { pronounSchema } from "./pronounSchema";
import pronouns from "./pronouns.json";
import { transitiveVerbSchema } from "./transitiveVerbSchema";
import transitiveVerbs from "./transitiveVerbs.json";
import { wechselprepositionSchema } from "./wechselprepositionSchema";
import wechselprepositions from "./wechselprepositions.json";

export const createRandomProblemState = () => {
  const optionIndex = Math.floor(Math.random() * 4);

  switch (optionIndex) {
    case 0: {
      return new SubjectVerbObjectProblem({
        pronoun: pronounSchema.parse(getRandomItem(pronouns)),
        verb: transitiveVerbSchema.parse(getRandomItem(transitiveVerbs)),
        noun: nounSchema.parse(getRandomItem(nouns)),
        artikel: artikelSchema.parse(getRandomItem(artikels)),
        plural: Math.random() > 0.75,
      });
    }
    case 1: {
      return new NominalProblem({
        noun: nounSchema.parse(getRandomItem(nouns)),
        artikel: artikelSchema.parse(getRandomItem(artikels)),
        plural: Math.random() > 0.75,
      });
    }
    case 2: {
      return new SubjectVerbPrepositionalProblem({
        pronoun: pronounSchema.parse(getRandomItem(pronouns)),
        verb: intransitiveVerbSchema.parse(getRandomItem(intransitiveVerbs)),
        preposition: prepositionSchema.parse(getRandomItem(prepositions)),
        noun: nounSchema.parse(getRandomItem(nouns)),
        artikel: artikelSchema.parse(getRandomItem(artikels)),
        plural: Math.random() > 0.75,
      });
    }
    case 3: {
      return new SubjectVerbWechselProblem({
        pronoun: pronounSchema.parse(getRandomItem(pronouns)),
        verb: intransitiveVerbSchema.parse(getRandomItem(intransitiveVerbs)),
        preposition: wechselprepositionSchema.parse(
          getRandomItem(wechselprepositions),
        ),
        noun: nounSchema.parse(getRandomItem(nouns)),
        artikel: artikelSchema.parse(getRandomItem(artikels)),
        plural: Math.random() > 0.75,
      });
    }
    default: {
      throw new Error(`Unhandled optionIndex: ${optionIndex}`);
    }
  }
};
