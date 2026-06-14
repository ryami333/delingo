import { Entity } from "../helpers/problems/AbstractProblem";
import { EnglishFormattedArtikel } from "./EnglishFormattedArtikel";
import { EnglishFormattedPronoun } from "./EnglishFormattedPronoun";
import { Button, Group, Popover } from "@mantine/core";

function getEntitySpoiler(entity: Entity): string {
  const { __type } = entity;
  switch (__type) {
    case "pronoun": {
      return entity.pronoun;
    }
    case "wechselpreposition":
    case "preposition": {
      return entity.preposition;
    }
    case "artikel": {
      return entity.word;
    }
    case "intransitiveVerb":
    case "transitiveVerb": {
      return entity.verb;
    }
    case "noun": {
      return entity.nominativ.singular;
    }
    default: {
      throw new Error(`Unhandled case: ${__type satisfies never}`);
    }
  }
}

function getEntityHints(entity: Entity) {
  switch (entity.__type) {
    case "preposition": {
      return [entity.form];
    }
    case "intransitiveVerb": {
      return [entity.direction];
    }
    case "transitiveVerb": {
      return [entity.form];
    }
    case "noun": {
      return [entity.gender];
    }
    default: {
      return [];
    }
  }
}

function PartLabel({ word, entity }: { word: string; entity: Entity }) {
  switch (entity.__type) {
    case "artikel": {
      return <EnglishFormattedArtikel contextualWord={word} artikel={entity} />;
    }
    case "pronoun": {
      return <EnglishFormattedPronoun contextualWord={word} pronoun={entity} />;
    }
    default: {
      return <span>{word}</span>;
    }
  }
}

export function PartsPopovers({
  parts,
  showHints = false,
}: {
  parts: [string, Entity][];
  showHints: boolean;
}) {
  return (
    <Group justify="center">
      {parts.map(([word, entity], index) => (
        <Popover key={index} closeOnEscape={true}>
          <Popover.Target>
            <Button variant="outline">
              <PartLabel word={word} entity={entity} />
              {showHints && getEntityHints(entity).map((hint) => ` • ${hint}`)}
            </Button>
          </Popover.Target>
          <Popover.Dropdown>{getEntitySpoiler(entity)}</Popover.Dropdown>
        </Popover>
      ))}
    </Group>
  );
}
