import { FooterContent } from './FooterContent';
import { MobileBottomNav } from './MobileBottomNav';
import { ProductCopy } from './ProductCopy';

function ObjectLoadingOverlay() {
  return (
    <div className="object-loading-indicator" role="status" aria-live="polite">
      <span className="object-loading-spinner" aria-hidden="true" />
      <span className="object-loading-text">Loading object...</span>
    </div>
  );
}

export function MobileObjectStage({
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

        {!isObjectReady && <ObjectLoadingOverlay />}
      </div>

      <MobileBottomNav onPrevious={onPrevious} onNext={onNext} disabled={isInteractionLocked} />
    </div>
  );
}
