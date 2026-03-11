import { Pronoun, PronounDisambiguator } from "../helpers/pronounSchema";

const disambiguatorLabels: Record<PronounDisambiguator, string> = {
  plural: "👥",
  singular: "👤",
  formal: "f.",
  informal: "inf.",
};

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
      {disambiguators.length > 0 && ` (${disambiguators.join(", ")})`}
    </span>
  );
}
