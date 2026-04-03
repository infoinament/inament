import { DesktopObjectStage } from './components/DesktopObjectStage';
import { MobileObjectStage } from './components/MobileObjectStage';
import { SiteHeader } from './components/SiteHeader';
import { DEFAULT_LAYOUT_VARS } from './constants/layout';
import { PRODUCT_OBJECTS } from './data/products';
import { useImagePreload } from './hooks/useImagePreload';
import { useObjectCarousel } from './hooks/useObjectCarousel';
import { useViewportMode } from './hooks/useViewportMode';

function App() {
  const isMobile = useViewportMode();
  const { objectIndex, transitionDirection, transitionPhase, resetToFirst, moveByDirection } = useObjectCarousel({
    objects: PRODUCT_OBJECTS,
    isMobile,
  });

  const currentObject = PRODUCT_OBJECTS[objectIndex];
  const nextObject = PRODUCT_OBJECTS[(objectIndex + 1) % PRODUCT_OBJECTS.length];
  const previousObject = PRODUCT_OBJECTS[(objectIndex - 1 + PRODUCT_OBJECTS.length) % PRODUCT_OBJECTS.length];
  const isObjectReady = useImagePreload({ currentObject, nextObject, previousObject });

  const currentLayoutVars = {
    ...DEFAULT_LAYOUT_VARS,
    ...(currentObject.layoutVars ?? {}),
  };

  const isTransitioning = transitionPhase !== 'idle';
  const isInteractionLocked = isTransitioning || !isObjectReady;
  const transitionClassName = `object-transition object-transition--${transitionPhase} object-transition--${transitionDirection}`;
  const objectStageClassName = `${transitionClassName} object-stage${isObjectReady ? '' : ' object-stage--loading'}`;

  const handlePrevious = () => {
    moveByDirection('prev', { isReady: isObjectReady, requireReady: true });
  };

  const handleNext = () => {
    moveByDirection('next', { isReady: isObjectReady, requireReady: true });
  };

  return (
    <div className="page-root">
      <SiteHeader onLogoClick={resetToFirst} />

      {!isMobile && (
        <DesktopObjectStage
          currentObject={currentObject}
          currentLayoutVars={currentLayoutVars}
          objectStageClassName={objectStageClassName}
          isObjectReady={isObjectReady}
          isInteractionLocked={isInteractionLocked}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}

      {isMobile && (
        <MobileObjectStage
          currentObject={currentObject}
          currentLayoutVars={currentLayoutVars}
          objectStageClassName={objectStageClassName}
          isObjectReady={isObjectReady}
          isInteractionLocked={isInteractionLocked}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </div>
  );
}

export default App;
