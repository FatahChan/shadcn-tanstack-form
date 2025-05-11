import { useLocalStorage, useMeasure } from "@uidotdev/usehooks";
import { useEffect, useMemo } from "react";

export const useIframeHeight = (preview: string, DEFAULT_HEIGHT = 224) => {
  const [iframeHeightCache, setIframeHeightCache] = useLocalStorage(
    `iframe-height-cache-${preview}`,
    DEFAULT_HEIGHT,
  );
  const [measureRef, { height: measuredHeight = DEFAULT_HEIGHT }] =
    useMeasure();

  const iframeHeight = useMemo(() => {
    if (iframeHeightCache) return iframeHeightCache;
    return measuredHeight;
  }, [iframeHeightCache, measuredHeight]);

  useEffect(() => {
    if (!measuredHeight) return;
    setIframeHeightCache(measuredHeight);
  }, [measuredHeight, setIframeHeightCache]);

  return {
    iframeHeight,
    measureRef,
  };
};
