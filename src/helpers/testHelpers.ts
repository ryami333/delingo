import { artikelSchema, artikels } from "./artikelSchema";
import {
  intransitiveVerbSchema,
  intransitiveVerbs,
} from "./intransitiveVerbSchema";
import { nounSchema, nouns } from "./nounSchema";
import { prepositionSchema, prepositions } from "./prepositionSchema";
import { pronounSchema, pronouns } from "./pronounSchema";
import { transitiveVerbSchema, transitiveVerbs } from "./transitiveVerbSchema";
import {
  wechselPrepositions,
  wechselprepositionSchema,
} from "./wechselprepositionSchema";

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
