import { Entity } from "../helpers/problems/AbstractProblem";
import { EnglishFormattedArtikel } from "./EnglishFormattedArtikel";
import { EnglishFormattedPronoun } from "./EnglishFormattedPronoun";
import { Button, Group, Popover } from "@mantine/core";

function entityLabel(entity: Entity): string {
  const { __type } = entity;
  switch (__type) {
    case "pronoun": {
      return `${entity.pronoun}`;
    }
    case "wechselpreposition": {
      return `${entity.preposition}`;
    }
    case "preposition": {
      return `${entity.preposition} • ${entity.form}`;
    }
    case "artikel": {
      return `${entity.word}`;
    }
    case "intransitiveVerb": {
      return `${entity.verb} • ${entity.direction}`;
    }
    case "transitiveVerb": {
      return `${entity.verb} • ${entity.form}`;
    }
    case "noun": {
      return `${entity.nominativ.singular} • ${entity.gender}`;
    }
    default: {
      throw new Error(`Unhandled case: ${__type satisfies never}`);
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

export function PartsPopovers({ parts }: { parts: [string, Entity][] }) {
  return (
    <Group justify="center">
      {parts.map(([word, entity], index) => (
        <Popover key={index}>
          <Popover.Target>
            <Button variant="outline">
              <PartLabel word={word} entity={entity} />
            </Button>
          </Popover.Target>
          <Popover.Dropdown>{entityLabel(entity)}</Popover.Dropdown>
        </Popover>
      ))}
    </Group>
  );
}
