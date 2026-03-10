import { Disambiguator } from "../helpers/artikelSchema";
import { Pronoun } from "../helpers/pronounSchema";

const disambiguatorLabels = {
  plural: "👥",
  singular: "👤",
  formal: "f.",
  informal: "inf.",
} as Record<Disambiguator, string>;

export function EnglishFormattedPronoun({
  contextualWord,
  pronoun,
}: {
  contextualWord: string;
  pronoun: Pronoun;
}) {
  const disambiguators =
    pronoun.disambiguators?.map(
      (disambiguator) => disambiguatorLabels[disambiguator],
    ) ?? [];

  return (
    <span>
      {contextualWord}
      {disambiguators.length > 0 && `(${disambiguators.join(", ")})`}
    </span>
  );
}
