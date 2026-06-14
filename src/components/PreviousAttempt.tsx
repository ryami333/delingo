import { Feedback, FeedbackKind } from "../helpers/getAttemptFeedback";
import { Text } from "@mantine/core";

function getFeedbackKindColor(kind: FeedbackKind): string {
  switch (kind) {
    case "none":
      return "green";
    case "capitalization":
      return "yellow";
    case "declination":
      return "orange";
    case "unknown":
      return "red";
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
