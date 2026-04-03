export function ProductCopy({ titleNodeId, listNodeId, detailTitle, bulletPoints, className = '' }) {
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
