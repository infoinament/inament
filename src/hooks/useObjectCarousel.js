import { useEffect, useRef, useState } from 'react';

import {
  OBJECT_STORAGE_KEY,
  OBJECT_TRANSITION_ENTER_MS,
  OBJECT_TRANSITION_EXIT_MS,
  REDUCED_MOTION_MEDIA_QUERY,
} from '../constants/layout';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' ? window.matchMedia(REDUCED_MOTION_MEDIA_QUERY).matches : false;

const scrollViewportToTop = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

  if (typeof document !== 'undefined') {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
};

const getInitialObjectIndex = (objects) => {
  if (typeof window === 'undefined') {
    return 0;
  }

  try {
    const storedObjectId = window.localStorage.getItem(OBJECT_STORAGE_KEY);
    if (!storedObjectId) {
      return 0;
    }

    const restoredIndex = objects.findIndex((objectData) => objectData.id === storedObjectId);
    return restoredIndex >= 0 ? restoredIndex : 0;
  } catch {
    return 0;
  }
};

export function useObjectCarousel({ objects, isMobile }) {
  const [objectIndex, setObjectIndex] = useState(() => getInitialObjectIndex(objects));
  const [transitionPhase, setTransitionPhase] = useState('idle');
  const [transitionDirection, setTransitionDirection] = useState('next');
  const transitionTimersRef = useRef([]);

  const clearTransitionTimers = () => {
    if (typeof window === 'undefined') {
      transitionTimersRef.current = [];
      return;
    }

    transitionTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    transitionTimersRef.current = [];
  };

  const queueTransition = (direction, nextIndexResolver) => {
    clearTransitionTimers();
    setTransitionDirection(direction);
    setTransitionPhase('exit');

    const exitTimer = window.setTimeout(() => {
      setObjectIndex(nextIndexResolver);
      setTransitionPhase('enter');

      const enterTimer = window.setTimeout(() => {
        setTransitionPhase('idle');
      }, OBJECT_TRANSITION_ENTER_MS);

      transitionTimersRef.current.push(enterTimer);
    }, OBJECT_TRANSITION_EXIT_MS);

    transitionTimersRef.current.push(exitTimer);
  };

  const moveByDirection = (direction, { requireReady = true, isReady = false } = {}) => {
    if (transitionPhase !== 'idle' || (requireReady && !isReady)) {
      return;
    }

    if (isMobile) {
      scrollViewportToTop();
    }

    const objectCount = objects.length;
    const nextIndexResolver = (prev) =>
      direction === 'next' ? (prev + 1) % objectCount : (prev - 1 + objectCount) % objectCount;

    if (prefersReducedMotion()) {
      setObjectIndex(nextIndexResolver);
      return;
    }

    queueTransition(direction, nextIndexResolver);
  };

  const resetToFirst = () => {
    scrollViewportToTop();

    if (objectIndex === 0 || transitionPhase !== 'idle') {
      return;
    }

    if (prefersReducedMotion()) {
      setObjectIndex(0);
      return;
    }

    queueTransition('prev', () => 0);
  };

  useEffect(
    () => () => {
      clearTransitionTimers();
    },
    [],
  );

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    scrollViewportToTop();
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(scrollViewportToTop);
    }
  }, [objectIndex, isMobile]);

  useEffect(() => {
    if (typeof window === 'undefined' || !objects[objectIndex]) {
      return;
    }

    try {
      window.localStorage.setItem(OBJECT_STORAGE_KEY, objects[objectIndex].id);
    } catch {
      // no-op (storage unavailable)
    }
  }, [objectIndex, objects]);

  return {
    objectIndex,
    transitionDirection,
    transitionPhase,
    resetToFirst,
    moveByDirection,
  };
}
