export const cloneImageData = (source: ImageData) => {
  const newImageData = new ImageData(source.width, source.height, {
    colorSpace: source.colorSpace,
  });
  newImageData.data.set(source.data);
  return newImageData;
};
