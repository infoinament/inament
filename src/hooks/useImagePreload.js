import { useEffect, useState } from 'react';

const imagePreloadPromises = new Map();

const preloadImage = (imageSrc) => {
  if (!imageSrc) {
    return Promise.resolve();
  }

  if (imagePreloadPromises.has(imageSrc)) {
    return imagePreloadPromises.get(imageSrc);
  }

  const preloadPromise = new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }

    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = imageSrc;
  });

  imagePreloadPromises.set(imageSrc, preloadPromise);
  return preloadPromise;
};

const preloadObjectImages = (objectData) => {
  if (!objectData) {
    return Promise.resolve();
  }

  return Promise.all(objectData.images.map((imageSrc) => preloadImage(imageSrc))).then(() => undefined);
};

export function useImagePreload({ currentObject, nextObject, previousObject }) {
  const [isObjectReady, setIsObjectReady] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    setIsObjectReady(false);

    preloadObjectImages(currentObject).then(() => {
      if (!isCancelled) {
        setIsObjectReady(true);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [currentObject]);

  useEffect(() => {
    void preloadObjectImages(nextObject);
    void preloadObjectImages(previousObject);
  }, [nextObject, previousObject]);

  return isObjectReady;
}
