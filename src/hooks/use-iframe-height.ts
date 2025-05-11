import { useMeasure } from "@uidotdev/usehooks";
import { useEffect, useMemo } from "react";
import { useLocalStorage } from "./use-local-storage";

export const useIframeHeight = (preview: string, DEFAULT_HEIGHT = 224) => {
  const [iframeHeightCache, setIframeHeightCache] = useLocalStorage(
    `iframe-height-cache-${preview}`,
    DEFAULT_HEIGHT,
  );
  const [measureRef, { height: measuredHeight }] = useMeasure();

  const iframeHeight = useMemo(() => {
    if (measuredHeight === null) return iframeHeightCache;
    return measuredHeight;
  }, [measuredHeight, iframeHeightCache]);

  useEffect(() => {
    if (!measuredHeight) return;
    setIframeHeightCache(measuredHeight);
  }, [measuredHeight, setIframeHeightCache]);

  return {
    iframeHeight,
    measureRef,
  };
};
