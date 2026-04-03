export const MOBILE_BREAKPOINT = 1160;
export const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;
export const REDUCED_MOTION_MEDIA_QUERY = '(prefers-reduced-motion: reduce)';
export const OBJECT_TRANSITION_EXIT_MS = 140;
export const OBJECT_TRANSITION_ENTER_MS = 260;
export const OBJECT_STORAGE_KEY = 'inament:current-object-id';

export const DEFAULT_LAYOUT_VARS = {
  '--desktop-frame-width': '962px',
  '--desktop-frame-height':
    'max(calc(var(--desktop-main-height, 78vh) + var(--desktop-left-gap, 32px) + var(--desktop-copy-height, 185px)), calc(var(--desktop-detail-top-height, 393px) + var(--desktop-detail-bottom-height, 393px) + var(--desktop-detail-gap, 16px) + var(--desktop-right-gap, 32px) + var(--desktop-copy-height, 185px)))',
  '--desktop-main-width': '625px',
  '--desktop-side-width': '321px',
  '--desktop-column-gap': '16px',
  '--desktop-detail-min-height': 'calc(var(--desktop-side-width, 321px) * 786 / 642)',
  '--desktop-main-height':
    'max(78vh, calc((var(--desktop-detail-min-height, 393px) * 2) + var(--desktop-detail-gap, 16px)))',
  '--desktop-left-gap': '32px',
  '--desktop-right-gap': '32px',
  '--desktop-detail-gap': '16px',
  '--desktop-detail-top-height': 'calc((var(--desktop-main-height, 78vh) - var(--desktop-detail-gap, 16px)) / 2)',
  '--desktop-detail-bottom-height': 'calc((var(--desktop-main-height, 78vh) - var(--desktop-detail-gap, 16px)) / 2)',
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
