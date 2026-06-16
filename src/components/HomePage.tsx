import { createRandomProblemState } from "../helpers/createRandomProblemState";
import { getAttemptFeedback } from "../helpers/getAttemptFeedback";
import { useSettings } from "../helpers/useSettings";
import { CheatSheet } from "./CheatSheet";
import { PartsPopovers } from "./PartsPopovers";
import { PreviousAttempt } from "./PreviousAttempt";
import { SettingsMenu } from "./SettingsMenu";
import {
  AppShell,
  Button,
  Center,
  Group,
  Modal,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

export function HomePage() {
  const [problemState, setProblemState] = useState<{
    problem: ReturnType<typeof createRandomProblemState>;
    previousGuess: string | null;
  }>(() => ({
    problem: createRandomProblemState(),
    previousGuess: null,
  }));

  useEffect(() => {
    console.log(problemState.problem.__type);
    console.log(problemState.problem.problemParts);
    console.log(problemState.problem.solution);
  }, [problemState.problem]);

  const [solutionOpened, { open: openSolution, close: closeSolution }] =
    useDisclosure(false);

  const { settings, toggleSetting } = useSettings();

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
        <Center>
          <div style={{ width: "min(100%, 600px)" }}>
            <Stack align="stretch" gap="xl">
              <PartsPopovers
                key={`parts-${problemState.problem.uuid}`}
                parts={problemState.problem.problemParts}
                showHints={settings.showHints}
              />
              <form
                onSubmit={onSubmit}
                key={`form-${problemState.problem.uuid}`}
              >
                <Center>
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
                    <Button
                      type="button"
                      variant="default"
                      size="md"
                      onClick={openSolution}
                    >
                      Show Solution
                    </Button>
                  </Group>
                </Center>
              </form>
              <Modal
                opened={solutionOpened}
                onClose={closeSolution}
                withCloseButton={false}
                centered
              >
                {problemState.problem.solution}
              </Modal>
              {problemState.previousGuess !== null && (
                <PreviousAttempt
                  feedback={getAttemptFeedback({
                    received: problemState.previousGuess,
                    problem: problemState.problem,
                  })}
                />
              )}
              {settings.showCheatSheet && (
                <Center>
                  <CheatSheet />
                </Center>
              )}
            </Stack>
          </div>
        </Center>
      </AppShell.Main>

      <SettingsMenu
        showHints={settings.showHints}
        onToggleShowHints={() => toggleSetting("showHints")}
        showCheatSheet={settings.showCheatSheet}
        onToggleShowCheatSheet={() => toggleSetting("showCheatSheet")}
      />
    </AppShell>
  );
}
