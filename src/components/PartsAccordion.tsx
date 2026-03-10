import { Entity } from "../helpers/problems/AbstractProblem";
import { Accordion } from "@mantine/core";

export function PartsAccordion({ parts }: { parts: [string, Entity][] }) {
  return (
    <Accordion>
      {parts.map(([word, entity], index) => (
        <Accordion.Item key={index} value={index.toString()}>
          <Accordion.Control>{word}</Accordion.Control>
          <Accordion.Panel>
            {(() => {
              switch (entity.__type) {
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
                  // @ts-expect-error: switch should be exhaustive.
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  entity.__type;
                  throw new Error("Unhandled case");
                }
              }
            })()}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
