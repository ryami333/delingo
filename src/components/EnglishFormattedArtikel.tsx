import { Artikel, Disambiguator } from "../helpers/artikelSchema";

const disambiguatorLabels = {
  plural: "pl.",
  singular: "sin.",
  formal: "f.",
  informal: "inf.",
} as Record<Disambiguator, string>;

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
      {disambiguators.length > 0 && `(${disambiguators.join(", ")})`}
    </span>
  );
}
