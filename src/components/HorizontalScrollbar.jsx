export default function HorizontalScrollbar({ children }) {
  return (
    <div className="horizontal-scroll-container">
      <div className="horizontal-scroll-content">{children}</div>
    </div>
  );
}
