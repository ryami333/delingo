export const loadImageBitmap = async (
  src: string,
  { signal, options }: { signal: AbortSignal; options: ImageBitmapOptions },
) => {
  const res = await fetch(src, { signal });
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);

  const blob = await res.blob();
  return await createImageBitmap(blob, options);
};
