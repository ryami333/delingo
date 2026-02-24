export const loadImageData = (bmp: ImageBitmap) => {
  const canvas = new OffscreenCanvas(bmp.width, bmp.height);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bmp, 0, 0);
  const imageData = ctx.getImageData(0, 0, bmp.width, bmp.height);

  return imageData;
};
