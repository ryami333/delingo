import { createRandomProblemState } from "../../helpers/createRandomProblemState";
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

function HomePage() {
  const [problemState, setProblemState] = useState<
    ReturnType<typeof createRandomProblemState>
  >(() => createRandomProblemState());

  const onSubmit: React.SubmitEventHandler = (e) => {
    e.preventDefault();
    if (e.currentTarget instanceof HTMLFormElement) {
      const formData = new FormData(e.currentTarget);

      const artikel = problemState.plural
        ? "die"
        : ARTIKELS[problemState.noun.gender];
      const solution = `${artikel} ${capitalize(problemState.plural ? problemState.noun.pluralNoun : problemState.noun.noun)}`;
      console.log({ solution });

      const inputVal = formData.get("foo");

      if (solution === inputVal) {
        // TODO: guard against same index as last time.
        setProblemState(createRandomProblemState());
      }
    }
  };

  return (
    <MantineProvider forceColorScheme="dark">
      <Notifications />
      <div>
        <h1>
          The{" "}
          {problemState.plural
            ? `${problemState.noun.pluralEnglish} (Pl.)`
            : problemState.noun.english}
        </h1>
        <form onSubmit={onSubmit} key={problemState.uuid}>
          <input name="foo" type="text" autoFocus />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </MantineProvider>
  );
}
