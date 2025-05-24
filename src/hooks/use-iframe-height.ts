import { useMeasure } from "@uidotdev/usehooks";
import { useEffect, useMemo } from "react";
import { useLocalStorageWithCommitRef } from "./use-local-storage";

export const useIframeHeight = ({
  slug,
  defaultHeight = 224,
}: {
  slug: string;
  defaultHeight?: number;
}) => {
  const [iframeHeightCache, setIframeHeightCache] =
    useLocalStorageWithCommitRef(`iframe-height-cache-${slug}`, defaultHeight);
  const [measureRef, { height: iframeMeasuredHeight }] = useMeasure();

  const iframeHeight = useMemo(() => {
    if (!iframeHeightCache && iframeMeasuredHeight) return iframeMeasuredHeight;
    if (iframeMeasuredHeight && iframeHeightCache < iframeMeasuredHeight) {
      return iframeMeasuredHeight;
    }
    if (iframeHeightCache) {
      return iframeHeightCache;
    }
    return defaultHeight;
  }, [iframeMeasuredHeight, iframeHeightCache, defaultHeight]);

  useEffect(() => {
    if (!iframeMeasuredHeight) return;
    if (iframeHeightCache < iframeMeasuredHeight) {
      setIframeHeightCache(iframeMeasuredHeight);
    }
  }, [iframeMeasuredHeight, iframeHeightCache, setIframeHeightCache]);

  return {
    iframeHeight,
    measureRef,
  };
};
