import { artikelSchema } from "../artikelSchema";
import artikels from "../artikels.json";
import { nounSchema } from "../nounSchema";
import nouns from "../nouns.json";
import { NominalProblem } from "./NominalProblem";
import { describe, expect, test } from "vitest";

describe("NominalProblem", () => {
  test("the artikel's gender matches the noun for a maskulin noun", () => {
    const artikel = artikelSchema.parse(
      artikels.find((item) => item.english === "the"),
    );
    const noun = nounSchema.parse(nouns.find((item) => item.english === "man"));

    const problem = new NominalProblem({
      noun,
      artikel,
      plural: false,
    });

    expect(problem.solution).toBe("der Mann");
  });

  test("the artikel's gender matches the noun for a feminin noun", () => {
    const artikel = artikelSchema.parse(
      artikels.find((item) => item.english === "the"),
    );
    const noun = nounSchema.parse(
      nouns.find((item) => item.english === "woman"),
    );

    const problem = new NominalProblem({
      noun,
      artikel,
      plural: false,
    });

    expect(problem.solution).toBe("die Frau");
  });

  test("the artikel's gender matches the noun for a feminin noun", () => {
    const artikel = artikelSchema.parse(
      artikels.find((item) => item.english === "the"),
    );
    const noun = nounSchema.parse(
      nouns.find((item) => item.english === "child"),
    );

    const problem = new NominalProblem({
      noun,
      artikel,
      plural: false,
    });

    expect(problem.solution).toBe("das Kind");
  });
});
