import { Feedback, FeedbackKind } from "../helpers/getAttemptFeedback";
import { Text } from "@mantine/core";

function getFeedbackKindColor(kind: FeedbackKind): string {
  switch (kind) {
    case "none":
      return "var(--mantine-color-green-6)";
    case "capitalization":
      return "var(--mantine-color-yellow-6)";
    case "inflection":
      return "var(--mantine-color-orange-6)";
    case "unknown":
      return "var(--mantine-color-red-6)";
    default:
      throw new Error(`Unhandled feedback kind: ${kind satisfies never}`);
  }
}

export function PreviousAttempt({ feedback }: { feedback: Feedback[] }) {
  return (
    <Text>
      {feedback.map((item, index) => (
        <span key={index} style={{ color: getFeedbackKindColor(item.kind) }}>
          {item.text}
        </span>
      ))}
    </Text>
  );
}
