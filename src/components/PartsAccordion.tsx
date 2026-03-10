import { Entity } from "../helpers/problems/AbstractProblem";
import { Accordion } from "@mantine/core";

export function PartsAccordion({ parts }: { parts: [string, Entity][] }) {
  return (
    <Accordion>
      {parts.map(([word, entity], index) => (
        <Accordion.Item key={index} value={index.toString()}>
          <Accordion.Control>{word}</Accordion.Control>
          <Accordion.Panel>{JSON.stringify(entity)}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
