import logoBlack from '../assets/logo-inament-black.svg';

export function SiteHeader({ onLogoClick }) {
  return (
    <header className="site-header">
      <button className="site-logo-button" type="button" aria-label="Go to first object" onClick={onLogoClick}>
        <img className="site-logo" src={logoBlack} alt="inament." loading="eager" data-node-id="2:150" />
      </button>
    </header>
  );
}
