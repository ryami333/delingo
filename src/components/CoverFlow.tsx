import { assertNotString } from "../helpers/assertNotString";
import { getTargetImageData } from "../helpers/getTargetImageData";
import { loadImageBitmap } from "../helpers/loadImageBitmap";
import { loadImageData } from "../helpers/loadImageData";
import { ReleaseDocument } from "../helpers/releaseSchema";
import { Serialized } from "../helpers/serializeDocument";
import { urlStringToTransformConfig } from "../helpers/urlStringToTransformCodec";
import { useRefDimensions } from "../helpers/useRefDimensions";
import classnamesbind from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import styles from "./CoverFlow.module.css";

const cx = classnamesbind.bind(styles);

const SOURCE_WIDTH = 1080;
const SOURCE_HEIGHT = 1080;

export const Coverflow = ({
  releases,
}: {
  releases: Serialized<ReleaseDocument>[];
}) => {
  const [canvasRef, dimensions] = useRefDimensions<HTMLCanvasElement>();
  const [releaseIndex, setReleaseIndex] = useState(0);
  const contextRef = useRef<CanvasRenderingContext2D>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !dimensions) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const context = canvas?.getContext("2d", {
      alpha: false,
      desynchronized: true,
    })!;

    contextRef.current = context;
  }, [dimensions]);

  useEffect(() => {
    const firstRelease = releases.at(releaseIndex);
    const context = contextRef.current;
    if (!firstRelease || !context || !dimensions) return;

    const { cover } = firstRelease;
    assertNotString(cover, "releases.cover is not resolved");
    if (!cover?.filename) {
      return;
    }

    const abortController = new AbortController();

    const src = urlStringToTransformConfig.encode({
      w: SOURCE_WIDTH,
      h: SOURCE_HEIGHT,
      source: cover!.filename!,
      fmt: "webp",
    });

    (async () => {
      const coverArtImageData = await loadImageBitmap(src, {
        signal: abortController.signal,
        options: {
          /**
           * TODO: compare image's aspect-ratio with canvas' aspect-ratio – in
           * some cases we should pass `resizeWidth` instead of resizeHeight.
           */
          resizeHeight: dimensions.height,
        },
      }).then(loadImageData);

      const targetImageData = getTargetImageData({
        ...dimensions,
        coverArtImageData,
      });

      context.putImageData(targetImageData, 0, 0);
    })();

    return () => abortController.abort();
  }, [releases, dimensions]);

  useEffect(() => {
    const release = releases.at(releaseIndex);
    const context = contextRef.current;
    if (!release || !context || !dimensions) return;
    const { cover } = release;
    assertNotString(cover, "releases.cover is not resolved");
    if (!cover?.filename) {
      return;
    }

    if (!context) return;

    const src = urlStringToTransformConfig.encode({
      w: SOURCE_WIDTH,
      h: SOURCE_HEIGHT,
      source: cover.filename,
      fmt: "webp",
    });

    const abortController = new AbortController();

    loadImageBitmap(src, {
      signal: abortController.signal,
      options: {
        /**
         * TODO: compare image's aspect-ratio with canvas' aspect-ratio – in
         * some cases we should pass `resizeWidth` instead of resizeHeight.
         */
        resizeHeight: dimensions.height,
      },
    })
      .then(async (bitmap) => {
        if (abortController.signal.aborted) return;

        const coverArtImageData = loadImageData(bitmap);

        const targetImageData = getTargetImageData({
          ...dimensions,
          coverArtImageData,
        });

        return [coverArtImageData, targetImageData];
      })
      .then(([coverArtImageData, canvasImageData] = []) => {
        if (
          abortController.signal.aborted ||
          !coverArtImageData ||
          !canvasImageData
        )
          return;

        let raf: number;

        const loop = () => {
          if (abortController.signal.aborted) return;

          /**
           * Paint a random slice of the source image to a random part of the canvas
           */
          {
            const randomWidth = Math.floor(
              Math.random() * coverArtImageData.width * 0.5,
            );
            const randomHeight = Math.floor(
              Math.random() * coverArtImageData.height * 0.1,
            );
            const randomDirtyX = Math.floor(
              Math.random() * (coverArtImageData.width - randomWidth),
            );
            const randomDirtyY = Math.floor(
              Math.random() * (coverArtImageData.height - randomHeight),
            );
            const randomDx =
              Math.random() * (dimensions.width + randomWidth) - randomWidth;
            const randomDy =
              Math.random() * (dimensions.height + randomHeight) - randomHeight;

            context.putImageData(
              coverArtImageData,
              randomDx,
              randomDy,
              randomDirtyX,
              randomDirtyY,
              randomWidth,
              randomHeight,
            );
          }

          /**
           * Paint a random slice of the source image to a random part of the canvas
           */
          {
            const randomWidth = Math.floor(
              Math.random() * canvasImageData.width * 0.9,
            );
            const randomHeight = Math.floor(
              Math.random() * canvasImageData.height * 0.2,
            );
            const randomDx =
              Math.floor(Math.random() * (dimensions.width + randomWidth)) -
              randomWidth;
            const randomDy =
              Math.floor(Math.random() * (dimensions.height + randomHeight)) -
              randomHeight;

            const centeringXOffset = Math.floor(
              (dimensions.width - canvasImageData.width) / 2,
            );
            const centeringYOffset = Math.floor(
              (dimensions.height - canvasImageData.height) / 2,
            );

            context.putImageData(
              canvasImageData,
              centeringXOffset,
              centeringYOffset,
              randomDx,
              randomDy,
              randomWidth,
              randomHeight,
            );
          }

          raf = requestAnimationFrame(loop);
        };

        loop();
      });

    return () => {
      abortController.abort();
    };
  }, [dimensions, releases, releaseIndex]);

  return (
    <div className={cx("container")}>
      <canvas ref={canvasRef} className={cx("canvas")} />
      <div className={cx("buttons")}>
        <button
          className={cx("button")}
          onClick={() => setReleaseIndex((current) => Math.max(0, current - 1))}
        >
          Prev
        </button>
        <button
          className={cx("button")}
          onClick={() =>
            setReleaseIndex((current) =>
              Math.min(releases.length - 1, current + 1),
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};
