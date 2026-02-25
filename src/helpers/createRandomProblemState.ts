import { artikelSchema } from "./artikelSchema";
import artikels from "./artikels.json";
import { getRandomIndex } from "./getRandomIndex";
import { nounSchema } from "./nounSchema";
import nouns from "./nouns.json";
import capitalize from "lodash/capitalize";

export const createRandomProblemState = () => {
  const randomNounIndex = getRandomIndex(nouns);
  const noun = nounSchema.parse(nouns.at(randomNounIndex));

  const randomArtikelIndex = getRandomIndex(artikels);
  const artikel = artikelSchema.parse(artikels.at(randomArtikelIndex));

  const plural = Math.random() > 0.75; // One-quarter of the time

  const artikelProblem = artikel.english;
  const nounProblem = plural ? noun.pluralEnglish : noun.english;
  const problem = capitalize(`${artikelProblem} ${nounProblem}`);

  const artikelSolution = artikel.nominativ[plural ? "pl" : noun.gender];
  const nounSolution = capitalize(plural ? noun.pluralNoun : noun.noun);
  const solution = `${artikelSolution} ${nounSolution}`;

  return {
    uuid: window.crypto.randomUUID(),
    artikel,
    noun,
    plural,
    problem,
    solution,
  };
};
