import { EnglishFormattedArtikel } from "../../components/EnglishFormattedArtikel";
import { PreviousAttempt } from "../../components/PreviousAttempt";
import { createRandomProblemState } from "../../helpers/createRandomProblemState";
import {
  AppShell,
  Button,
  Center,
  Group,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(frontend)/")({
  component: HomePage,
});

function HomePage() {
  const [problemState, setProblemState] = useState<{
    problem: ReturnType<typeof createRandomProblemState>;
    previousGuess: string | null;
  }>(() => ({
    problem: createRandomProblemState(),
    previousGuess: null,
  }));

  useEffect(() => {
    console.log(problemState.problem.problemParts);
    console.log(problemState.problem.solution);
  }, [problemState.problem]);

  const onSubmit: React.SubmitEventHandler = (e) => {
    e.preventDefault();
    if (e.currentTarget instanceof HTMLFormElement) {
      const formData = new FormData(e.currentTarget);
      const inputVal = formData.get("foo")?.toString() ?? "";

      if (problemState.problem.solution === inputVal) {
        // TODO: guard against same index as last time.
        setProblemState({
          problem: createRandomProblemState(),
          previousGuess: null,
        });
      } else {
        setProblemState((current) => ({
          ...current,
          previousGuess: inputVal,
        }));
      }
    }
  };

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <Group h="100%" px="md">
          <Title order={3}>Delingo</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Center h="100%">
          <Stack align="center" gap="xl">
            <Title>
              <span style={{ whiteSpace: "pre" }}>
                {problemState.problem.problemParts.flatMap(
                  (problemPart, index) => {
                    const [word, entity] = problemPart;
                    const el =
                      entity.__type === "artikel" ? (
                        <EnglishFormattedArtikel
                          key={index}
                          contextualWord={word}
                          artikel={entity}
                        />
                      ) : (
                        <span key={index}>{word}</span>
                      );
                    return index === 0 ? [el] : [" ", el];
                  },
                )}
              </span>
            </Title>
            <form onSubmit={onSubmit} key={problemState.problem.uuid}>
              <Group>
                <TextInput
                  name="foo"
                  autoFocus
                  placeholder="Type the German…"
                  size="md"
                />
                <Button type="submit" size="md">
                  Submit
                </Button>
              </Group>
            </form>
            {problemState.previousGuess !== null && (
              <PreviousAttempt
                received={problemState.previousGuess}
                expected={problemState.problem.solution}
              />
            )}
          </Stack>
        </Center>
      </AppShell.Main>
    </AppShell>
  );
}
