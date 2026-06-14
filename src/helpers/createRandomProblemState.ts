import { getRandomItem } from "./getRandomItem";
import { artikelSchema } from "./lexicon/artikelSchema";
import artikels from "./lexicon/artikels.json";
import { intransitiveVerbSchema } from "./lexicon/intransitiveVerbSchema";
import intransitiveVerbs from "./lexicon/intransitiveVerbs.json";
import { nounSchema } from "./lexicon/nounSchema";
import nouns from "./lexicon/nouns.json";
import { prepositionSchema } from "./lexicon/prepositionSchema";
import prepositions from "./lexicon/prepositions.json";
import { pronounSchema } from "./lexicon/pronounSchema";
import pronouns from "./lexicon/pronouns.json";
import { transitiveVerbSchema } from "./lexicon/transitiveVerbSchema";
import transitiveVerbs from "./lexicon/transitiveVerbs.json";
import { wechselprepositionSchema } from "./lexicon/wechselprepositionSchema";
import wechselprepositions from "./lexicon/wechselprepositions.json";
import { NominalProblem } from "./problems/NominalProblem";
import { SubjectVerbObjectProblem } from "./problems/SubjectVerbObjectProblem";
import { SubjectVerbPrepositionalProblem } from "./problems/SubjectVerbPrepositionalProblem";
import { SubjectVerbWechselProblem } from "./problems/SubjectVerbWechselProblem";

export const createRandomProblemState = () => {
  const optionIndex = Math.floor(Math.random() * 4);

  switch (optionIndex) {
    case 0: {
      return new SubjectVerbObjectProblem({
        pronoun: pronounSchema.parse(getRandomItem(pronouns)),
        verb: transitiveVerbSchema.parse(getRandomItem(transitiveVerbs)),
        noun: nounSchema.parse(getRandomItem(nouns)),
        artikel: artikelSchema.parse(getRandomItem(artikels)),
        preferPlural: Math.random() > 0.75,
      });
    }
    case 1: {
      return new NominalProblem({
        noun: nounSchema.parse(getRandomItem(nouns)),
        artikel: artikelSchema.parse(getRandomItem(artikels)),
        preferPlural: Math.random() > 0.75,
      });
    }
    case 2: {
      return new SubjectVerbPrepositionalProblem({
        pronoun: pronounSchema.parse(getRandomItem(pronouns)),
        verb: intransitiveVerbSchema.parse(getRandomItem(intransitiveVerbs)),
        preposition: prepositionSchema.parse(getRandomItem(prepositions)),
        noun: nounSchema.parse(getRandomItem(nouns)),
        artikel: artikelSchema.parse(getRandomItem(artikels)),
        preferPlural: Math.random() > 0.75,
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
        preferPlural: Math.random() > 0.75,
      });
    }
    default: {
      throw new Error(`Unhandled optionIndex: ${optionIndex}`);
    }
  }
};
