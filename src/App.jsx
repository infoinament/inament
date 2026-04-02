import React, { useEffect, useRef, useState } from 'react';
import wallShelfMainImage from './assets/objects/wall-shelf/main.webp';
import wallShelfDetailTopImage from './assets/objects/wall-shelf/detail-top.webp';
import wallShelfDetailBottomImage from './assets/objects/wall-shelf/detail-bottom.webp';
import kitchenRackImage1 from './assets/objects/kitchen-rack/img-kitchen-rack-1.webp';
import kitchenRackImage2 from './assets/objects/kitchen-rack/img-kitchen-rack-2.webp';
import kitchenRackImage3 from './assets/objects/kitchen-rack/img-kitchen-rack-3.webp';
import pocketTrayImage1 from './assets/objects/pocket-tray/img-pocket-tray-1.webp';
import pocketTrayImage2 from './assets/objects/pocket-tray/img-pocket-tray-2.webp';
import pocketTrayImage3 from './assets/objects/pocket-tray/img-pocket-tray-3.webp';
import plainShelfImage1 from './assets/objects/plain-shelf/img-plain-shelf-1.webp';
import plainShelfImage2 from './assets/objects/plain-shelf/img-plain-shelf-2.webp';
import plainShelfImage3 from './assets/objects/plain-shelf/img-plain-shelf-3.webp';
import logoBlack from './assets/logo-inament-black.svg';
import logoFooter from './assets/logo-inament-footer.svg';
import arrowLeftIcon from './assets/ic-arrow-left.svg';
import arrowRightIcon from './assets/ic-arrow-right.svg';

const MOBILE_BREAKPOINT = 1160;
const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;
const REDUCED_MOTION_MEDIA_QUERY = '(prefers-reduced-motion: reduce)';
const OBJECT_TRANSITION_EXIT_MS = 140;
const OBJECT_TRANSITION_ENTER_MS = 260;
const OBJECT_STORAGE_KEY = 'inament:current-object-id';

const WALL_SHELF_BULLET_POINTS = [
  '견고한 오크를 손으로 직접 조각하여 제작했습니다.',
  '티크 스테인으로 마감했습니다.',
  '벽에 안정적으로 밀착되도록 비례를 잡았습니다.',
  '두 개의 선반과 서랍으로 구성되어 있습니다.',
  '작은 물건을 올려두기에 안성맞춤입니다.',
];

const KITCHEN_RACK_BULLET_POINTS = [
  '오크의 결을 살려 내추럴한 무드를 담았습니다.',
  '하드 오일 마감으로 방수성, 내구성을 높였습니다.',
  '균형 잡힌 비례와 안정감으로 공간이 편안해집니다.',
  '오븐 옆이나 주방 코너, 어디에 두어도 좋습니다.',
  '자주 쓰는 접시부터 커피잔, 레시피북까지 가지런히 수납할 수 있어요.',
];

const POCKET_TRAY_BULLET_POINTS = [
  '패턴 유리로 텍스쳐와 디테일이 돋보입니다.',
  '하드 오일로 방수성과 체리의 색을 살렸습니다.',
  '커피, 온더락, 악세서리까지 다양하게 올려두세요.',
  '실용적이면서도 테이블에 따뜻함과 질감을 더해줍니다.',
];

const PLAIN_SHELF_BULLET_POINTS = [
  '오래 두어도 질리지 않는 정갈한 디자인입니다.',
  '내구성과 결을 살린 깊이 있는 오일 마감입니다.',
  '뒷판을 넣어서 물건이 뒤로 넘어가지 않습니다.',
  '걸레받이가 있어 바닥 청소가 용이합니다.',
  '주방부터 거실까지 집 어디에 두어도 어울립니다.',
  '책, 도자기, 주방용품 등 다양하게 수납할 수 있고, 잡동사니는 라탄 바구니에 넣어 연출해도 좋아요.',
];

const DEFAULT_LAYOUT_VARS = {
  '--desktop-frame-width': '962px',
  '--desktop-frame-height': '1019px',
  '--desktop-main-width': '625px',
  '--desktop-side-width': '321px',
  '--desktop-column-gap': '16px',
  '--desktop-main-height': '802px',
  '--desktop-left-gap': '32px',
  '--desktop-right-gap': '32px',
  '--desktop-detail-gap': '16px',
  '--desktop-detail-top-height': '393px',
  '--desktop-detail-bottom-height': '393px',
  '--desktop-detail-top-transform': 'none',
  '--desktop-detail-top-origin': 'center top',
  '--desktop-copy-height': '185px',
  '--desktop-copy-padding': '8px 0',
  '--desktop-copy-gap': '16px',
  '--mobile-stack-gap': '4px',
  '--mobile-image-1-ratio': '402 / 516',
  '--mobile-image-2-ratio': '402 / 491',
  '--mobile-image-3-ratio': '402 / 491',
};

const isMobileViewport = () => (typeof window !== 'undefined' ? window.matchMedia(MOBILE_MEDIA_QUERY).matches : false);
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

const PRODUCT_OBJECTS = [
  {
    id: 'wall-shelf',
    name: 'Wall Shelf',
    sizeText: 'Size(mm) W560 x D162 x H526',
    detailTitle: '앤티크에서 영감을 받은 벽걸이 선반',
    bulletPoints: WALL_SHELF_BULLET_POINTS,
    images: [wallShelfMainImage, wallShelfDetailTopImage, wallShelfDetailBottomImage],
    layoutVars: {},
  },
  {
    id: 'kitchen-rack',
    name: 'Kitchen Rack',
    sizeText: 'Size(mm) W495 x D250 x H520',
    detailTitle: '단정한 무게감의 스탠딩 키친랙',
    bulletPoints: KITCHEN_RACK_BULLET_POINTS,
    images: [kitchenRackImage1, kitchenRackImage2, kitchenRackImage3],
    layoutVars: {},
  },
  {
    id: 'pocket-tray',
    name: 'Pocket Tray',
    sizeText: 'Size(mm) W100 x D100 x H20',
    detailTitle: '체리와 민트 빛 유리의 포켓 트레이',
    bulletPoints: POCKET_TRAY_BULLET_POINTS,
    images: [pocketTrayImage1, pocketTrayImage2, pocketTrayImage3],
    layoutVars: {},
  },
  {
    id: 'plain-shelf',
    name: 'Plain Shelf',
    sizeText: 'Size(mm) W1200 x D285 x H865',
    detailTitle: '정갈한 오픈형 오크 수납장',
    bulletPoints: PLAIN_SHELF_BULLET_POINTS,
    images: [plainShelfImage1, plainShelfImage2, plainShelfImage3],
    layoutVars: {},
  },
];

const getInitialObjectIndex = () => {
  if (typeof window === 'undefined') {
    return 0;
  }

  try {
    const storedObjectId = window.localStorage.getItem(OBJECT_STORAGE_KEY);
    if (!storedObjectId) {
      return 0;
    }

    const restoredIndex = PRODUCT_OBJECTS.findIndex((objectData) => objectData.id === storedObjectId);
    return restoredIndex >= 0 ? restoredIndex : 0;
  } catch {
    return 0;
  }
};

function ProductCopy({ titleNodeId, listNodeId, detailTitle, bulletPoints, className = '' }) {
  return (
    <article className={`product-copy ${className}`.trim()}>
      <h2 data-node-id={titleNodeId}>{detailTitle}</h2>
      <ul data-node-id={listNodeId}>
        {bulletPoints.map((point, index) => (
          <li key={`${index}-${point}`}>{point}</li>
        ))}
      </ul>
    </article>
  );
}

function FooterContent({ logoNodeId, textNodeId, copyrightNodeId, className = '' }) {
  return (
    <div className={`footer-content ${className}`.trim()}>
      <img className="footer-logo" src={logoFooter} alt="inament." loading="lazy" data-node-id={logoNodeId} />
      <p className="footer-meta" data-node-id={textNodeId}>
        스튜디오 이나무 | 대표: 강인화 | 사업자등록번호: 508-15-92589
        <br />
        T. 010-3301-3108 | E. info.inament@gmail.com
      </p>
      <p className="footer-meta" data-node-id={copyrightNodeId}>
        © 2026 inament. All rights reserved.
      </p>
    </div>
  );
}

function App() {
  const [isMobile, setIsMobile] = useState(isMobileViewport);
  const [objectIndex, setObjectIndex] = useState(getInitialObjectIndex);
  const [isObjectReady, setIsObjectReady] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState('idle');
  const [transitionDirection, setTransitionDirection] = useState('next');
  const transitionTimersRef = useRef([]);

  const clearTransitionTimers = () => {
    transitionTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    transitionTimersRef.current = [];
  };

  const handleObjectChange = (direction) => {
    if (transitionPhase !== 'idle' || !isObjectReady) {
      return;
    }

    if (isMobile) {
      scrollViewportToTop();
    }

    if (prefersReducedMotion()) {
      setIsObjectReady(false);
      setObjectIndex((prev) =>
        direction === 'next' ? (prev + 1) % PRODUCT_OBJECTS.length : (prev - 1 + PRODUCT_OBJECTS.length) % PRODUCT_OBJECTS.length,
      );
      return;
    }

    clearTransitionTimers();
    setTransitionDirection(direction);
    setTransitionPhase('exit');

    const exitTimer = window.setTimeout(() => {
      setIsObjectReady(false);
      setObjectIndex((prev) =>
        direction === 'next' ? (prev + 1) % PRODUCT_OBJECTS.length : (prev - 1 + PRODUCT_OBJECTS.length) % PRODUCT_OBJECTS.length,
      );
      setTransitionPhase('enter');

      const enterTimer = window.setTimeout(() => {
        setTransitionPhase('idle');
      }, OBJECT_TRANSITION_ENTER_MS);

      transitionTimersRef.current.push(enterTimer);
    }, OBJECT_TRANSITION_EXIT_MS);

    transitionTimersRef.current.push(exitTimer);
  };

  const handlePrevious = () => {
    handleObjectChange('prev');
  };

  const handleNext = () => {
    handleObjectChange('next');
  };

  const handleLogoClick = () => {
    scrollViewportToTop();

    if (objectIndex === 0 || transitionPhase !== 'idle') {
      return;
    }

    if (prefersReducedMotion()) {
      setIsObjectReady(false);
      setObjectIndex(0);
      return;
    }

    clearTransitionTimers();
    setTransitionDirection('prev');
    setTransitionPhase('exit');

    const exitTimer = window.setTimeout(() => {
      setIsObjectReady(false);
      setObjectIndex(0);
      setTransitionPhase('enter');

      const enterTimer = window.setTimeout(() => {
        setTransitionPhase('idle');
      }, OBJECT_TRANSITION_ENTER_MS);

      transitionTimersRef.current.push(enterTimer);
    }, OBJECT_TRANSITION_EXIT_MS);

    transitionTimersRef.current.push(exitTimer);
  };

  useEffect(() => {
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
      clearTransitionTimers();
      window.removeEventListener('resize', syncViewportMode);
      if (typeof mediaQueryList.removeEventListener === 'function') {
        mediaQueryList.removeEventListener('change', syncViewportMode);
      } else if (typeof mediaQueryList.removeListener === 'function') {
        mediaQueryList.removeListener(syncViewportMode);
      }
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;
    setIsObjectReady(false);

    preloadObjectImages(PRODUCT_OBJECTS[objectIndex]).then(() => {
      if (!isCancelled) {
        setIsObjectReady(true);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [objectIndex]);

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
    if (PRODUCT_OBJECTS.length < 2) {
      return;
    }

    const nextIndex = (objectIndex + 1) % PRODUCT_OBJECTS.length;
    const prevIndex = (objectIndex - 1 + PRODUCT_OBJECTS.length) % PRODUCT_OBJECTS.length;
    void preloadObjectImages(PRODUCT_OBJECTS[nextIndex]);
    void preloadObjectImages(PRODUCT_OBJECTS[prevIndex]);
  }, [objectIndex]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(OBJECT_STORAGE_KEY, PRODUCT_OBJECTS[objectIndex].id);
    } catch {
      // no-op (storage unavailable)
    }
  }, [objectIndex]);

  const currentObject = PRODUCT_OBJECTS[objectIndex];
  const [mainObjectImage, detailObjectImageTop, detailObjectImageBottom] = currentObject.images;
  const currentLayoutVars = {
    ...DEFAULT_LAYOUT_VARS,
    ...(currentObject.layoutVars ?? {}),
  };
  const isTransitioning = transitionPhase !== 'idle';
  const isInteractionLocked = isTransitioning || !isObjectReady;
  const transitionClassName = `object-transition object-transition--${transitionPhase} object-transition--${transitionDirection}`;
  const objectStageClassName = `${transitionClassName} object-stage${isObjectReady ? '' : ' object-stage--loading'}`;

  return (
    <div className="page-root">
      <header className="site-header">
        <button className="site-logo-button" type="button" aria-label="Go to first object" onClick={handleLogoClick}>
          <img className="site-logo" src={logoBlack} alt="inament." loading="eager" data-node-id="2:150" />
        </button>
      </header>

      {!isMobile && (
        <div className="desktop-view" data-node-id="2:14" style={currentLayoutVars}>
          <button
            className="nav-arrow nav-arrow-left"
            type="button"
            aria-label="Previous object"
            data-node-id="2:27"
            onClick={handlePrevious}
            disabled={isInteractionLocked}
          >
            <img src={arrowLeftIcon} alt="" aria-hidden="true" />
          </button>

          <button
            className="nav-arrow nav-arrow-right"
            type="button"
            aria-label="Next object"
            data-node-id="2:29"
            onClick={handleNext}
            disabled={isInteractionLocked}
          >
            <img src={arrowRightIcon} alt="" aria-hidden="true" />
          </button>

          <div className={objectStageClassName}>
            <main className="desktop-content-frame" data-node-id="2:121">
              <section className="desktop-left-column" data-node-id="2:117">
                <div className="main-image-wrap" data-node-id="2:103">
                  <img src={mainObjectImage} alt={currentObject.name} loading="eager" fetchPriority="high" decoding="async" />
                </div>
                <div className="product-title-block">
                  <h1 className="product-title" data-node-id="2:18">
                    {currentObject.name}
                  </h1>
                  <p className="product-size">{currentObject.sizeText}</p>
                </div>
              </section>

              <section className="desktop-right-column" data-node-id="2:119">
                <div className="desktop-detail-grid" data-node-id="2:106">
                  <div className="detail-image detail-image-top" data-node-id="2:104">
                    <img src={detailObjectImageTop} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                  </div>
                  <div className="detail-image detail-image-bottom" data-node-id="2:105">
                    <img src={detailObjectImageBottom} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                  </div>
                </div>
                <ProductCopy
                  titleNodeId="2:19"
                  listNodeId="2:20"
                  detailTitle={currentObject.detailTitle}
                  bulletPoints={currentObject.bulletPoints}
                />
              </section>
            </main>

            <footer className="site-footer desktop-footer" data-node-id="2:127">
              <FooterContent logoNodeId="2:152" textNodeId="2:24" copyrightNodeId="2:25" />
            </footer>

            {!isObjectReady && (
              <div className="object-loading-indicator" role="status" aria-live="polite">
                <span className="object-loading-spinner" aria-hidden="true" />
                <span className="object-loading-text">Loading object...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {isMobile && (
        <div className="mobile-view" data-node-id="2:162" style={currentLayoutVars}>
          <div className={objectStageClassName}>
            <main className="mobile-main">
              <section className="mobile-image-stack" data-node-id="17:201">
                <div className="mobile-image mobile-image-1" data-node-id="2:174">
                  <img src={mainObjectImage} alt={currentObject.name} loading="eager" fetchPriority="high" decoding="async" />
                </div>
                <div className="mobile-image mobile-image-2" data-node-id="17:196">
                  <img src={detailObjectImageTop} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                </div>
                <div className="mobile-image mobile-image-3" data-node-id="17:200">
                  <img src={detailObjectImageBottom} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                </div>
              </section>

              <section className="mobile-text-block" data-node-id="17:207">
                <div className="product-title-block mobile-product-title-block">
                  <h1 className="product-title mobile-product-title" data-node-id="17:202">
                    {currentObject.name}
                  </h1>
                  <p className="product-size mobile-product-size">{currentObject.sizeText}</p>
                </div>
                <ProductCopy
                  titleNodeId="17:205"
                  listNodeId="17:206"
                  detailTitle={currentObject.detailTitle}
                  bulletPoints={currentObject.bulletPoints}
                  className="mobile-product-copy"
                />
              </section>

              <footer className="site-footer mobile-footer" data-node-id="17:208">
                <FooterContent logoNodeId="17:211" textNodeId="17:220" copyrightNodeId="17:221" className="mobile-footer-content" />
              </footer>
            </main>

            {!isObjectReady && (
              <div className="object-loading-indicator" role="status" aria-live="polite">
                <span className="object-loading-spinner" aria-hidden="true" />
                <span className="object-loading-text">Loading object...</span>
              </div>
            )}
          </div>

          <nav className="mobile-bottom-nav" data-node-id="17:195" aria-label="Previous and next object navigation">
            <button
              className="mobile-nav-btn mobile-nav-btn-prev"
              type="button"
              aria-label="Previous object"
              data-node-id="17:193"
              onClick={handlePrevious}
              disabled={isInteractionLocked}
            >
              <img src={arrowLeftIcon} alt="" aria-hidden="true" data-node-id="2:186" />
              <span data-node-id="17:191">Previous Object</span>
            </button>
            <button
              className="mobile-nav-btn mobile-nav-btn-next"
              type="button"
              aria-label="Next object"
              data-node-id="17:194"
              onClick={handleNext}
              disabled={isInteractionLocked}
            >
              <span data-node-id="2:190">Next Object</span>
              <img src={arrowRightIcon} alt="" aria-hidden="true" data-node-id="2:188" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default App;
