import z from "zod";

const transformConfigSchema = z.object({
  w: z.int32(),
  h: z.int32(),
  fmt: z.enum(["webp", "avif"]),
  source: z.string(),
});

const stringToInt = z.codec(z.string().regex(z.regexes.integer), z.int(), {
  decode: (str) => Number.parseInt(str, 10),
  encode: (num) => num.toString(),
});

export const searchParamsToTransformConfig = z.codec(
  z.instanceof(URLSearchParams),
  transformConfigSchema,
  {
    encode: (input) => {
      const searchParams = new URLSearchParams();
      searchParams.set("w", String(input.w));
      searchParams.set("h", String(input.h));
      searchParams.set("fmt", input.fmt);
      searchParams.set("source", input.source);

      return searchParams;
    },
    decode: (input) => {
      return {
        w: stringToInt.decode(input.get("w") ?? ""),
        h: stringToInt.decode(input.get("h") ?? ""),
        fmt: z.enum(["webp", "avif"]).parse(input.get("fmt")),
        source: z.string().parse(input.get("source")),
      };
    },
  },
);

export const urlStringToTransformConfig = z.codec(
  z.string(),
  transformConfigSchema,
  {
    encode: (input) => {
      const searchParams = searchParamsToTransformConfig.encode(input);

      return `/api/image?${searchParams.toString()}`;
    },
    decode: (input) => {
      const url = new URL(input, "http://localhost");
      const config = searchParamsToTransformConfig.decode(url.searchParams);

      return config;
    },
  },
);
