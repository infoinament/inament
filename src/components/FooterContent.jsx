import logoFooter from '../assets/logo-inament-footer.svg';

export function FooterContent({ logoNodeId, textNodeId, copyrightNodeId, className = '' }) {
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
