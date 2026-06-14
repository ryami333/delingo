import { artikelSchema, artikels } from "./lexicon/artikelSchema";
import {
  intransitiveVerbSchema,
  intransitiveVerbs,
} from "./lexicon/intransitiveVerbSchema";
import { nounSchema, nouns } from "./lexicon/nounSchema";
import { prepositionSchema, prepositions } from "./lexicon/prepositionSchema";
import { pronounSchema, pronouns } from "./lexicon/pronounSchema";
import {
  transitiveVerbSchema,
  transitiveVerbs,
} from "./lexicon/transitiveVerbSchema";
import {
  wechselPrepositions,
  wechselprepositionSchema,
} from "./lexicon/wechselprepositionSchema";

export function findArtikel(english: string) {
  return artikelSchema.parse(artikels.find((item) => item.english === english));
}

export function findNoun(english: string) {
  return nounSchema.parse(nouns.find((item) => item.english === english));
}

export function findPronoun(english: string) {
  return pronounSchema.parse(pronouns.find((item) => item.english === english));
}

export function findIntransitiveVerb(english: string) {
  return intransitiveVerbSchema.parse(
    intransitiveVerbs.find((item) => item.english === english),
  );
}

export function findWechselPreposition(english: string) {
  return wechselprepositionSchema.parse(
    wechselPrepositions.find((item) => item.english === english),
  );
}

export function findTransitiveVerb(english: string) {
  return transitiveVerbSchema.parse(
    transitiveVerbs.find((item) => item.english === english),
  );
}

export function findPreposition(english: string) {
  return prepositionSchema.parse(
    prepositions.find((item) => item.english === english),
  );
}
