import { FooterContent } from './FooterContent';
import { NavArrows } from './NavArrows';
import { ProductCopy } from './ProductCopy';

function ObjectLoadingOverlay() {
  return (
    <div className="object-loading-indicator" role="status" aria-live="polite">
      <span className="object-loading-spinner" aria-hidden="true" />
      <span className="object-loading-text">Loading object...</span>
    </div>
  );
}

export function DesktopObjectStage({
  currentObject,
  currentLayoutVars,
  objectStageClassName,
  isObjectReady,
  isInteractionLocked,
  onPrevious,
  onNext,
}) {
  const [mainObjectImage, detailObjectImageTop, detailObjectImageBottom] = currentObject.images;

  return (
    <div className="desktop-view" data-node-id="2:14" style={currentLayoutVars}>
      <NavArrows onPrevious={onPrevious} onNext={onNext} disabled={isInteractionLocked} />

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

        {!isObjectReady && <ObjectLoadingOverlay />}
      </div>
    </div>
  );
}
