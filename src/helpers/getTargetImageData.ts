import { cloneImageData } from "./cloneImageData";

const CHANNELS = 4;

export const getTargetImageData = ({
  width,
  height,
  coverArtImageData,
}: {
  width: number;
  height: number;
  coverArtImageData: ImageData;
}) => {
  const canvas = new OffscreenCanvas(width, height);
  const context = canvas.getContext("2d")!;
  const leftEdgeImageData = cloneImageData(coverArtImageData);
  const rightEdgeImageData = cloneImageData(coverArtImageData);

  for (let rowIndex = 0; rowIndex < coverArtImageData.height; rowIndex++) {
    const rowOffset = rowIndex * coverArtImageData.width * CHANNELS;
    const sourceRowData = coverArtImageData.data.slice(
      rowOffset,
      rowOffset + coverArtImageData.width * CHANNELS,
    );
    const leftPixelData = sourceRowData.slice(0, CHANNELS);
    const rightPixelData = sourceRowData.slice(-1 * CHANNELS);

    for (
      let columnIndex = 0;
      columnIndex < coverArtImageData.width;
      columnIndex++
    ) {
      leftEdgeImageData.data.set(
        leftPixelData,
        rowOffset + columnIndex * CHANNELS,
      );
      rightEdgeImageData.data.set(
        rightPixelData,
        rowOffset + columnIndex * CHANNELS,
      );
    }
  }

  context.putImageData(leftEdgeImageData, 0, 0);
  context.putImageData(
    rightEdgeImageData,
    width - coverArtImageData.width,
    height - coverArtImageData.height,
  );
  context.putImageData(
    coverArtImageData,
    Math.floor(width - coverArtImageData.width) / 2,
    Math.floor(height - coverArtImageData.height) / 2,
  );

  return context.getImageData(0, 0, width, height);
};
