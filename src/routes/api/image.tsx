import { env } from "../../helpers/env.mjs";
import { searchParamsToTransformConfig } from "../../helpers/urlStringToTransformCodec";
import { createFileRoute } from "@tanstack/react-router";
import sharp from "sharp";

export const Route = createFileRoute("/api/image")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const transformConfig = searchParamsToTransformConfig.decode(
          url.searchParams,
        );

        const sourceUrl = new URL(
          `${env.S3_BUCKET_NAME}/${transformConfig.source}`,
          env.S3_ENDPOINT,
        );
        const upstream = await fetch(sourceUrl);
        if (!upstream.ok)
          return new Response("Upstream fetch failed", { status: 502 });

        const input = Buffer.from(await upstream.arrayBuffer());

        let img = sharp(input).rotate(); // auto-orient
        if (transformConfig.w || transformConfig.h)
          img = img.resize({
            width: transformConfig.w,
            height: transformConfig.h,
            fit: "inside",
          });

        // format selection
        switch (transformConfig.fmt) {
          case "avif":
            img = img.avif({ quality: 90 });
            break;
          case "webp":
            img = img.webp({ quality: 90 });
            break;
          default: {
            throw new Error("Unreachable case");
          }
        }

        const out = await img.toBuffer();
        const contentType = { avif: "image/avif", webp: "image/webp" }[
          transformConfig.fmt
        ];

        return new Response(
          out.slice(out.byteOffset, out.byteOffset + out.byteLength),
          {
            headers: {
              "Content-Type": contentType,
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          },
        );
      },
    },
  },
});
