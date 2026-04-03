import arrowLeftIcon from '../assets/ic-arrow-left.svg';
import arrowRightIcon from '../assets/ic-arrow-right.svg';

export function NavArrows({ onPrevious, onNext, disabled }) {
  return (
    <>
      <button
        className="nav-arrow nav-arrow-left"
        type="button"
        aria-label="Previous object"
        data-node-id="2:27"
        onClick={onPrevious}
        disabled={disabled}
      >
        <img src={arrowLeftIcon} alt="" aria-hidden="true" />
      </button>

      <button
        className="nav-arrow nav-arrow-right"
        type="button"
        aria-label="Next object"
        data-node-id="2:29"
        onClick={onNext}
        disabled={disabled}
      >
        <img src={arrowRightIcon} alt="" aria-hidden="true" />
      </button>
    </>
  );
}
