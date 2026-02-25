import { createRandomProblemState } from "../../helpers/createRandomProblemState";
import { Button, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(frontend)/")({
  component: HomePage,
});

function HomePage() {
  const [problemState, setProblemState] = useState<
    ReturnType<typeof createRandomProblemState>
  >(() => createRandomProblemState());

  const onSubmit: React.SubmitEventHandler = (e) => {
    e.preventDefault();
    if (e.currentTarget instanceof HTMLFormElement) {
      const formData = new FormData(e.currentTarget);

      const inputVal = formData.get("foo");

      console.log(problemState.solution);

      if (problemState.solution === inputVal) {
        // TODO: guard against same index as last time.
        setProblemState(createRandomProblemState());
      }
    }
  };

  return (
    <MantineProvider forceColorScheme="dark">
      <Notifications />
      <div>
        <h1>{problemState.problem}</h1>
        <form onSubmit={onSubmit} key={problemState.uuid}>
          <input name="foo" type="text" autoFocus />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </MantineProvider>
  );
}
