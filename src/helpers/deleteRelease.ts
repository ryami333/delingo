import { authMiddleware } from "./authMiddleware.ts";
import { releasesCollection } from "./releasesCollection.ts";
import { createServerFn } from "@tanstack/react-start";
import { ObjectId } from "mongodb";
import { z } from "zod";

export const deleteRelease = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    await releasesCollection.deleteOne({ _id: new ObjectId(data.id) });
  });
