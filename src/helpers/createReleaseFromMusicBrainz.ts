import { authMiddleware } from "./authMiddleware.ts";
import { musicBrainzReleaseSchema } from "./musicBrainzReleaseSchema.ts";
import { releasesCollection } from "./releasesCollection.ts";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const paramsSchema = z.object({
  release: musicBrainzReleaseSchema,
});

export const createReleaseFromMusicBrainz = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(paramsSchema)
  .handler(async ({ data }) => {
    const musicBrainzUrl = new URL(
      `https://musicbrainz.org/ws/2/release/${data.release.id}`,
    );
    musicBrainzUrl.searchParams.set("fmt", "json");
    musicBrainzUrl.searchParams.set("inc", "artists");

    // TODO: this might be redundant now that the whole release object is being passed as a function param.
    const { data: musicBrainzRelease, error: releaseError } = await fetch(
      musicBrainzUrl,
      {
        method: "GET",
        headers: {
          "User-Agent": "mitchs-record-club/0.0.1 mitch@mitch-ryan.com",
        },
      },
    )
      .then((response) => response.json())
      .then((body) => musicBrainzReleaseSchema.safeParse(body));

    if (releaseError) {
      console.error(releaseError);
      throw new Error("Unexpected response from MusicBrainz API");
    }

    const filename = `${musicBrainzRelease.id}.jpg`;

    await releasesCollection.insertOne({
      title: musicBrainzRelease.title,
      date: musicBrainzRelease.date,
      artists: musicBrainzRelease["artist-credit"].map((credit) => ({
        name: credit.artist.name,
      })),
      cover: { filename },
    });

    return musicBrainzRelease.id;
  });
