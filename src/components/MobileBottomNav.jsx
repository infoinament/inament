import arrowLeftIcon from '../assets/ic-arrow-left.svg';
import arrowRightIcon from '../assets/ic-arrow-right.svg';

export function MobileBottomNav({ onPrevious, onNext, disabled }) {
  return (
    <nav className="mobile-bottom-nav" data-node-id="17:195" aria-label="Previous and next object navigation">
      <button
        className="mobile-nav-btn mobile-nav-btn-prev"
        type="button"
        aria-label="Previous object"
        data-node-id="17:193"
        onClick={onPrevious}
        disabled={disabled}
      >
        <img src={arrowLeftIcon} alt="" aria-hidden="true" data-node-id="2:186" />
        <span data-node-id="17:191">Previous Object</span>
      </button>
      <button
        className="mobile-nav-btn mobile-nav-btn-next"
        type="button"
        aria-label="Next object"
        data-node-id="17:194"
        onClick={onNext}
        disabled={disabled}
      >
        <span data-node-id="2:190">Next Object</span>
        <img src={arrowRightIcon} alt="" aria-hidden="true" data-node-id="2:188" />
      </button>
    </nav>
  );
}
