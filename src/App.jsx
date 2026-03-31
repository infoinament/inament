import React, { useEffect, useState } from 'react';
import mainImage from './assets/img-wall-shelf-1.jpg';
import detailTopImage from './assets/img-wall-shelf-2.jpg';
import detailBottomImage from './assets/img-wall-shelf-3.jpg';
import logoBlack from './assets/logo-inament-black.svg';
import logoFooter from './assets/logo-inament-footer.svg';
import arrowLeftIcon from './assets/ic-arrow-left.svg';
import arrowRightIcon from './assets/ic-arrow-right.svg';

const MOBILE_BREAKPOINT = 1160;
const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

const BASE_BULLET_POINTS = [
  '견고한 오크를 손으로 직접 조각하여 제작했습니다.',
  '티크 스테인으로 마감했습니다.',
  '벽에 안정적으로 밀착되도록 비례를 잡았습니다.',
  '두 개의 선반과 서랍으로 구성되어 있습니다.',
  '작은 물건을 올려두기에 안성맞춤입니다.',
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
  '--desktop-detail-top-transform': 'scale(1.0461)',
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

const createMockImageAsset = ({ label, startColor, endColor }) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${startColor}"/><stop offset="100%" stop-color="${endColor}"/></linearGradient></defs><rect width="1200" height="1200" fill="url(#g)"/><text x="600" y="600" text-anchor="middle" dominant-baseline="middle" fill="rgba(255,255,255,0.86)" font-size="64" font-family="Pretendard, Arial, sans-serif">${label}</text></svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const PRODUCT_OBJECTS = [
  {
    id: 'wall-shelf',
    name: 'Wall Shelf',
    detailTitle: '앤티크에서 영감을 받은 벽걸이 선반',
    bulletPoints: BASE_BULLET_POINTS,
    images: [mainImage, detailTopImage, detailBottomImage],
    layoutVars: {},
  },
  {
    id: 'mock-object-01',
    name: 'Mock Object 01',
    detailTitle: '테스트용 오브젝트 01',
    bulletPoints: [
      '오브젝트 단위 전환 확인을 위한 가짜 데이터입니다.',
      '레이아웃 구조는 그대로 유지됩니다.',
      '메인/디테일 이미지 3장을 한 세트로 전환합니다.',
      '버튼 클릭 시 이전·다음 오브젝트로 이동합니다.',
      '실제 이미지 파일 교체만 하면 동일하게 동작합니다.',
    ],
    images: [
      createMockImageAsset({ label: 'Mock 01 / Main', startColor: '#7D8597', endColor: '#A5A58D' }),
      createMockImageAsset({ label: 'Mock 01 / Detail A', startColor: '#4A4E69', endColor: '#9A8C98' }),
      createMockImageAsset({ label: 'Mock 01 / Detail B', startColor: '#6B705C', endColor: '#B7B7A4' }),
    ],
    layoutVars: {
      '--desktop-main-height': '780px',
      '--desktop-left-gap': '24px',
      '--desktop-right-gap': '24px',
      '--desktop-detail-gap': '12px',
      '--desktop-detail-top-height': '384px',
      '--desktop-detail-bottom-height': '384px',
      '--desktop-detail-top-transform': 'none',
      '--desktop-copy-height': '206px',
      '--desktop-copy-padding': '12px 0 0',
      '--mobile-stack-gap': '8px',
      '--mobile-image-1-ratio': '402 / 540',
      '--mobile-image-2-ratio': '402 / 470',
      '--mobile-image-3-ratio': '402 / 470',
    },
  },
  {
    id: 'mock-object-02',
    name: 'Mock Object 02',
    detailTitle: '테스트용 오브젝트 02',
    bulletPoints: [
      '오브젝트 세트가 정상 순환되는지 확인합니다.',
      '모바일/데스크톱 모두 동일한 데이터 소스를 씁니다.',
      '현재는 검증을 위해 SVG 기반 가짜 이미지를 사용합니다.',
      '향후 실제 상품 이미지 세트로 쉽게 교체 가능합니다.',
      '텍스트도 오브젝트별로 독립적으로 관리됩니다.',
    ],
    images: [
      createMockImageAsset({ label: 'Mock 02 / Main', startColor: '#355070', endColor: '#6D597A' }),
      createMockImageAsset({ label: 'Mock 02 / Detail A', startColor: '#B56576', endColor: '#E56B6F' }),
      createMockImageAsset({ label: 'Mock 02 / Detail B', startColor: '#6C757D', endColor: '#ADB5BD' }),
    ],
    layoutVars: {
      '--desktop-main-height': '760px',
      '--desktop-left-gap': '40px',
      '--desktop-right-gap': '40px',
      '--desktop-detail-gap': '20px',
      '--desktop-detail-top-height': '370px',
      '--desktop-detail-bottom-height': '370px',
      '--desktop-copy-height': '230px',
      '--desktop-copy-padding': '16px 0 0',
      '--mobile-stack-gap': '12px',
      '--mobile-image-1-ratio': '402 / 500',
      '--mobile-image-2-ratio': '402 / 460',
      '--mobile-image-3-ratio': '402 / 520',
    },
  },
];

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
  const [objectIndex, setObjectIndex] = useState(0);

  const handlePrevious = () => {
    setObjectIndex((prev) => (prev - 1 + PRODUCT_OBJECTS.length) % PRODUCT_OBJECTS.length);
  };

  const handleNext = () => {
    setObjectIndex((prev) => (prev + 1) % PRODUCT_OBJECTS.length);
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
      window.removeEventListener('resize', syncViewportMode);
      if (typeof mediaQueryList.removeEventListener === 'function') {
        mediaQueryList.removeEventListener('change', syncViewportMode);
      } else if (typeof mediaQueryList.removeListener === 'function') {
        mediaQueryList.removeListener(syncViewportMode);
      }
    };
  }, []);

  const currentObject = PRODUCT_OBJECTS[objectIndex];
  const [mainObjectImage, detailObjectImageTop, detailObjectImageBottom] = currentObject.images;
  const currentLayoutVars = {
    ...DEFAULT_LAYOUT_VARS,
    ...(currentObject.layoutVars ?? {}),
  };

  return (
    <div className="page-root">
      <header className="site-header">
        <img className="site-logo" src={logoBlack} alt="inament." loading="eager" data-node-id="2:150" />
      </header>

      {!isMobile && (
        <div className="desktop-view" data-node-id="2:14" style={currentLayoutVars}>
          <button
            className="nav-arrow nav-arrow-left"
            type="button"
            aria-label="Previous object"
            data-node-id="2:27"
            onClick={handlePrevious}
          >
            <img src={arrowLeftIcon} alt="" aria-hidden="true" />
          </button>

          <button
            className="nav-arrow nav-arrow-right"
            type="button"
            aria-label="Next object"
            data-node-id="2:29"
            onClick={handleNext}
          >
            <img src={arrowRightIcon} alt="" aria-hidden="true" />
          </button>

          <main className="desktop-content-frame" data-node-id="2:121">
            <section className="desktop-left-column" data-node-id="2:117">
              <div className="main-image-wrap" data-node-id="2:103">
                <img src={mainObjectImage} alt={currentObject.name} loading="eager" />
              </div>
              <h1 className="product-title" data-node-id="2:18">
                {currentObject.name}
              </h1>
            </section>

            <section className="desktop-right-column" data-node-id="2:119">
              <div className="desktop-detail-grid" data-node-id="2:106">
                <div className="detail-image detail-image-top" data-node-id="2:104">
                  <img src={detailObjectImageTop} alt="" aria-hidden="true" loading="lazy" />
                </div>
                <div className="detail-image detail-image-bottom" data-node-id="2:105">
                  <img src={detailObjectImageBottom} alt="" aria-hidden="true" loading="lazy" />
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
        </div>
      )}

      {isMobile && (
        <div className="mobile-view" data-node-id="2:162" style={currentLayoutVars}>
          <main className="mobile-main">
            <section className="mobile-image-stack" data-node-id="17:201">
              <div className="mobile-image mobile-image-1" data-node-id="2:174">
                <img src={mainObjectImage} alt={currentObject.name} loading="eager" />
              </div>
              <div className="mobile-image mobile-image-2" data-node-id="17:196">
                <img src={detailObjectImageTop} alt="" aria-hidden="true" loading="lazy" />
              </div>
              <div className="mobile-image mobile-image-3" data-node-id="17:200">
                <img src={detailObjectImageBottom} alt="" aria-hidden="true" loading="lazy" />
              </div>
            </section>

            <section className="mobile-text-block" data-node-id="17:207">
              <h1 className="product-title mobile-product-title" data-node-id="17:202">
                {currentObject.name}
              </h1>
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

          <nav className="mobile-bottom-nav" data-node-id="17:195" aria-label="Previous and next object navigation">
            <button
              className="mobile-nav-btn mobile-nav-btn-prev"
              type="button"
              aria-label="Previous object"
              data-node-id="17:193"
              onClick={handlePrevious}
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
