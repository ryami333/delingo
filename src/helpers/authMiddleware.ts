import { auth } from "../../auth.ts";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import {
  getRequestHeaders,
  getRequestUrl,
  setResponseStatus,
} from "@tanstack/react-start/server";

export const authMiddleware = createMiddleware().server(
  async ({ next, serverFnMeta }) => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    if (!session) {
      if (serverFnMeta) {
        setResponseStatus(401);
        throw new Error("Unauthorized");
      }
      const requestUrl = getRequestUrl();
      throw redirect({
        to: "/login",
        search: { callbackURL: requestUrl.pathname },
      });
    }

    return await next();
  },
);
