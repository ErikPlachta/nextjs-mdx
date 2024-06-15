import { useEffect, useRef, useMemo, useState } from "react";

/**
 * Describes the metrics related to an individual monitored element.
 */
export interface ElementMetric {
  targetTop: number | null;
  targetBottom: number | null;
  distanceFromPrevious: number;
  height: number | null;
}

/**
 * Describes the metrics related to the window.
 */
export interface WindowMetric {
  innerWidth: number;
  innerHeight: number;
  scrollTop: number;
  scrollBottom: number;
}

/**
 * Describes the properties of an element to be monitored.
 */
export interface ElementToMonitor {
  role: string;
  ref?: React.RefObject<HTMLElement>;
  id?: string;
  element?: HTMLElement | null;
  orderId: number;
}

export interface ClientFeatures {
  isClient: boolean;
  viewportWidth: number;
  viewportHeight: number;
  windowSize: { width: number; height: number };
  isPortrait: boolean;
  isLandscape: boolean;
  userAgent: string | null;
  isMobileDevice: boolean;
}

/**
 * Describes the metrics for all monitored elements and the window.
 */
export type Metrics = {
  elements: { [key: string]: ElementMetric };
  // window?: WindowMetric;
  currentWindow: WindowMetric;
};

export default function useClientMetrics(
  elements: ElementToMonitor[]
): Metrics & ClientFeatures {
  const isClient = (): boolean => typeof window !== "undefined";

  const firstScroll = useRef(true);

  // Cache these values
  const currentViewportWidth = isClient() ? window.innerWidth : 0;
  const currentViewportHeight = isClient() ? window.innerHeight : 0;

  const isPortrait = (): boolean =>
    currentViewportWidth < currentViewportHeight;
  const isLandscape = (): boolean =>
    currentViewportWidth > currentViewportHeight;
  const getUserAgent = (): string | null =>
    isClient() ? navigator.userAgent : null;
  const isMobileDevice = (): boolean => {
    const userAgent = getUserAgent();
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent || ""
    );
  };

  const previousBottomRef = useRef<number | null>(0);
  const [isMounted, setIsMounted] = useState(false);

  const initialMetrics: Metrics = useMemo(
    () => ({
      elements: elements.reduce(
        (acc, { role }) => ({
          ...acc,
          [role]: {
            targetTop: null,
            targetBottom: null,
            distanceFromPrevious: 0,
            height: null,
          },
        }),
        {}
      ),
      currentWindow: {
        innerWidth: currentViewportWidth,
        innerHeight: currentViewportHeight,
        scrollTop:
          isClient() && document.documentElement
            ? document.documentElement.scrollTop
            : 0,
        scrollBottom:
          isClient() && document.documentElement
            ? document.documentElement.scrollHeight -
              (document.documentElement.scrollTop + currentViewportHeight)
            : 0,
      },
    }),
    [currentViewportHeight, currentViewportWidth, elements]
  );

  const [trackedElements, setTrackedElements] = useState<{
    [key: string]: ElementMetric;
  }>(initialMetrics.elements);

  //! TODO: 2023/11/01 #EP || Resolve this state issue. Commented out for now because causing constant re-rendering.
  // useEffect(() => {
  //   if (!isClient()) return;

  //   const calculateMetrics = (): { [key: string]: ElementMetric } => {
  //     let previousBottom: number | null = previousBottomRef.current;

  //     const newElementMetrics: { [key: string]: ElementMetric } = elements
  //       .sort((a, b) => a.orderId - b.orderId)
  //       .reduce(
  //         (
  //           acc: { [key: string]: ElementMetric },
  //           { role, ref, id, element }
  //         ) => {
  //           const targetElement =
  //             element ||
  //             ref?.current ||
  //             (id && document.getElementById(id)) ||
  //             document.querySelector(`[data-role='${role}']`);

  //           if (targetElement) {
  //             const targetRect = targetElement.getBoundingClientRect();
  //             const distanceFromPrevious =
  //               targetRect.top - (previousBottom || 0);
  //             previousBottom = targetRect.bottom;

  //             acc[role] = {
  //               targetTop: targetRect.top,
  //               targetBottom: targetRect.bottom,
  //               distanceFromPrevious,
  //               height: targetRect.height,
  //             };
  //           }
  //           return acc;
  //         },
  //         {}
  //       );

  //     previousBottomRef.current = previousBottom;

  //     return newElementMetrics;
  //   };

  //   // Create a MutationObserver instance to watch for DOM changes
  //   const observer = new MutationObserver(() => {
  //     requestAnimationFrame(() => {
  //       setIsMounted(true);
  //     });
  //   });

  //   // Start observing the document with the configured parameters
  //   observer.observe(document, { childList: true, subtree: true });

  //   const updateMetrics = () => {
  //     const newMetrics = calculateMetrics();
  //     setTrackedElements((prev) => ({ ...prev, ...newMetrics }));
  //   };

  //   let resizeTimeout: ReturnType<typeof setTimeout>;
  //   let scrollTimeout: ReturnType<typeof setTimeout>;

  //   const debouncedScrollUpdate = () => {
  //     if (firstScroll.current) {
  //       updateMetrics();
  //       firstScroll.current = false;
  //       return;
  //     }

  //     clearTimeout(scrollTimeout);
  //     scrollTimeout = setTimeout(updateMetrics, 300);
  //   };

  //   const debouncedResizeUpdate = () => {
  //     clearTimeout(resizeTimeout);
  //     resizeTimeout = setTimeout(updateMetrics, 300);
  //   };

  //   window.addEventListener("scroll", debouncedScrollUpdate);
  //   window.addEventListener("resize", debouncedResizeUpdate);

  //   return () => {
  //     // Stop observing changes
  //     observer.disconnect();

  //     clearTimeout(resizeTimeout);
  //     clearTimeout(scrollTimeout);
  //     window.removeEventListener("scroll", debouncedScrollUpdate);
  //     window.removeEventListener("resize", debouncedResizeUpdate);
  //   };
  // }, [elements]);

  const windowMetrics: WindowMetric = {
    innerWidth: currentViewportWidth,
    innerHeight: currentViewportHeight,
    scrollTop:
      isClient() && document.documentElement
        ? document.documentElement.scrollTop
        : 0,
    scrollBottom:
      isClient() && document.documentElement
        ? document.documentElement.scrollHeight -
          (document.documentElement.scrollTop + currentViewportHeight)
        : 0,
  };

  return {
    elements: trackedElements,
    currentWindow: windowMetrics,
    isClient: isClient(),
    viewportWidth: currentViewportWidth,
    viewportHeight: currentViewportHeight,
    windowSize: {
      width: currentViewportWidth,
      height: currentViewportHeight,
    },
    isPortrait: isPortrait(),
    isLandscape: isLandscape(),
    userAgent: getUserAgent(),
    isMobileDevice: isMobileDevice(),
  };
}
