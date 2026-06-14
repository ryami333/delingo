import { Entity } from "../helpers/problems/AbstractProblem";
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

export function PartsPopovers({ parts }: { parts: [string, Entity][] }) {
  return (
    <Group>
      {parts.map(([word, entity], index) => (
        <Popover key={index}>
          <Popover.Target>
            <Button variant="outline">{word}</Button>
          </Popover.Target>
          <Popover.Dropdown>{entityLabel(entity)}</Popover.Dropdown>
        </Popover>
      ))}
    </Group>
  );
}
