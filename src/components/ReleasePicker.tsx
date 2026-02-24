"use client";

import { musicBrainzReleaseSchema } from "../helpers/musicBrainzReleaseSchema";
import { notNullish } from "../helpers/notNullish";
import { useRef, useState, useTransition } from "react";
import { z } from "zod";

type Release = z.infer<typeof musicBrainzReleaseSchema>;

export function ReleasePicker({
  onClickCreateRelease,
}: {
  onClickCreateRelease: ({
    release,
  }: {
    release: z.output<typeof musicBrainzReleaseSchema>;
  }) => void;
}) {
  const [isPending, startTransition] = useTransition();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [results, setResults] = useState<Release[]>([]);

  const onSubmit: React.SubmitEventHandler = (event) =>
    startTransition(async () => {
      event.preventDefault();
      const query = searchInputRef.current?.value ?? "";
      const searchUrl = new URL("https://musicbrainz.org/ws/2/release");
      searchUrl.searchParams.set("query", query);
      searchUrl.searchParams.set("fmt", "json"); // defaults to XML
      searchUrl.searchParams.set("limit", "5");
      await fetch(searchUrl.toString(), {
        method: "GET",
        headers: {
          "User-Agent": "mitchs-record-club/0.0.1 mitch@mitch-ryan.com", // TODO: move to constant
        },
      })
        .then((response) => response.json())
        .then(
          (body) =>
            z.object({ releases: musicBrainzReleaseSchema.array() }).parse(body)
              .releases,
        )
        .then(setResults)
        .catch(console.error);
    });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" ref={searchInputRef} />
        <button type="submit" disabled={isPending}>
          Submit
        </button>
      </form>
      {results.length !== 0 && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Artists</th>
              <th>Cover</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.title}</td>
                <td>{result.date}</td>
                <td>
                  {result["artist-credit"]
                    .map((credit) => credit.artist.name)
                    .filter(notNullish)
                    .filter(Boolean)
                    .join(", ")}
                </td>
                <td>
                  <img
                    key={result.id /* Or images can lag behind results */}
                    style={{
                      display: "block",
                      objectFit: "contain",
                      width: "100px",
                      height: "100px",
                    }}
                    src={`http://coverartarchive.org/release/${result.id}/front.jpg`}
                    alt=""
                  />
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => onClickCreateRelease({ release: result })}
                  >
                    Create
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
