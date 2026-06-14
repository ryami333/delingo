import {
  Artikel,
  ArtikelDisambiguator,
} from "../helpers/lexicon/artikelSchema";

const disambiguatorLabels: Record<ArtikelDisambiguator, string> = {
  plural: "👥",
  singular: "👤",
  formal: "f.",
  informal: "inf.",
};

export function EnglishFormattedArtikel({
  contextualWord,
  artikel,
}: {
  contextualWord: string;
  artikel: Artikel;
}) {
  const disambiguators =
    artikel.disambiguators?.map(
      (disambiguator) => disambiguatorLabels[disambiguator],
    ) ?? [];

  return (
    <span>
      {contextualWord}
      {disambiguators.length > 0 && ` (${disambiguators.join(", ")})`}
    </span>
  );
}
