import { Feedback } from "../helpers/getAttemptFeedback";
import { Text } from "@mantine/core";

const colorByProblem: Record<Feedback["problem"], string> = {
  none: "green",
  capitalization: "yellow",
  declination: "orange",
  unknown: "red",
};

export function PreviousAttempt({ feedback }: { feedback: Feedback[] }) {
  return (
    <Text>
      {feedback.map((item, index) => (
        <span key={index} style={{ color: colorByProblem[item.problem] }}>
          {item.text}
        </span>
      ))}
    </Text>
  );
}
