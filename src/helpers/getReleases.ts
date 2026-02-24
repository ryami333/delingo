import { releasesCollection } from "./releasesCollection.ts";
import { serializeMany } from "./serializeDocument.ts";
import { createServerFn } from "@tanstack/react-start";

export const getReleases = createServerFn({ method: "GET" }).handler(
  async () => {
    const queries = await releasesCollection.find().toArray();

    return serializeMany(queries);
  },
);
