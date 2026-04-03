import { useEffect, useState } from 'react';

import { MOBILE_MEDIA_QUERY } from '../constants/layout';

const isMobileViewport = () => (typeof window !== 'undefined' ? window.matchMedia(MOBILE_MEDIA_QUERY).matches : false);

export function useViewportMode() {
  const [isMobile, setIsMobile] = useState(isMobileViewport);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQueryList = window.matchMedia(MOBILE_MEDIA_QUERY);

    const syncViewportMode = () => {
      setIsMobile(isMobileViewport());
    };

    syncViewportMode();
    window.addEventListener('resize', syncViewportMode);

    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', syncViewportMode);
    } else if (typeof mediaQueryList.addListener === 'function') {
      mediaQueryList.addListener(syncViewportMode);
    }

    return () => {
      window.removeEventListener('resize', syncViewportMode);
      if (typeof mediaQueryList.removeEventListener === 'function') {
        mediaQueryList.removeEventListener('change', syncViewportMode);
      } else if (typeof mediaQueryList.removeListener === 'function') {
        mediaQueryList.removeListener(syncViewportMode);
      }
    };
  }, []);

  return isMobile;
}
