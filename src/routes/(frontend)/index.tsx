import { nounSchema } from "../../helpers/nounSchema";
import nouns from "../../helpers/nouns.json";
import { Button, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { createFileRoute } from "@tanstack/react-router";
import capitalize from "lodash/capitalize";
import { useState } from "react";

export const Route = createFileRoute("/(frontend)/")({
  component: HomePage,
});

const ARTIKELS = {
  m: "der",
  f: "die",
  n: "das",
} as const;

const getRandomIndex = (inputs: unknown[]) =>
  Math.floor(Math.random() * inputs.length);

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(getRandomIndex(nouns));
  const rawNoun = nouns.at(currentIndex);
  if (!rawNoun) {
    throw new Error("Noun is empty");
  }

  const onSubmit: React.SubmitEventHandler = (e) => {
    e.preventDefault();
    if (rawNoun && e.currentTarget instanceof HTMLFormElement) {
      const formData = new FormData(e.currentTarget);

      const noun = nounSchema.parse(rawNoun);

      const artikel = ARTIKELS[noun.gender];
      const solution = `${artikel} ${capitalize(rawNoun.noun)}`;
      console.log({ noun, solution, ARTIKELS });

      const inputVal = formData.get("foo");

      if (solution === inputVal) {
        // TODO: guard against same index as last time.
        setCurrentIndex(getRandomIndex(nouns));
      }
    }
  };

  return (
    <MantineProvider forceColorScheme="dark">
      <Notifications />
      <div>
        <h1>{rawNoun?.english}</h1>
        <form onSubmit={onSubmit} key={rawNoun?.noun}>
          <input name="foo" type="text" autoFocus />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </MantineProvider>
  );
}
