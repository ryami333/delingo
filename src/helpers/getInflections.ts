import { notNullish } from "./notNullish";
import { Entity } from "./problems/AbstractProblem";

/**
 * Returns every German surface form an entity can take — its full paradigm.
 *
 * This powers "wrong inflection" feedback: two words belong to the same
 * paradigm when they both appear in this list for the same entity, which means
 * the learner picked the right word but inflected it wrongly — a noun/article
 * declension or a verb conjugation.
 *
 * Only articles and nouns carry a real case table, so they are the only types
 * that yield more than one form. The rest return their lone surface form(s),
 * which collapses any paradigm comparison back to an exact match.
 */
export function getInflections(entity: Entity): string[] {
  switch (entity.__type) {
    case "artikel":
      return [
        entity.nominativ,
        entity.akkusativ,
        entity.dativ,
        entity.genitiv,
      ].flatMap((c) => [c.m, c.f, c.n, c.pl].filter(notNullish));
    case "noun":
      return [entity.nominativ, entity.akkusativ, entity.dativ].flatMap((c) => [
        c.singular,
        c.plural,
      ]);
    case "pronoun":
      return [entity.pronoun];
    case "preposition":
    case "wechselpreposition":
      return [entity.preposition];
    case "transitiveVerb":
    case "intransitiveVerb": {
      return [
        entity.conjugation.firstPerson,
        entity.conjugation.secondPerson,
        entity.conjugation.thirdPerson,
      ].flatMap((person) => [person.singular, person.plural]);
    }
  }
}
