import { Feedback, FeedbackKind } from "../helpers/getAttemptFeedback";
import { Text } from "@mantine/core";

const colorByProblem: Record<FeedbackKind, string> = {
  none: "green",
  capitalization: "yellow",
  declination: "orange",
  unknown: "red",
};

export function PreviousAttempt({ feedback }: { feedback: Feedback[] }) {
  return (
    <Text>
      {feedback.map((item, index) => (
        <span key={index} style={{ color: colorByProblem[item.kind] }}>
          {item.text}
        </span>
      ))}
    </Text>
  );
}
