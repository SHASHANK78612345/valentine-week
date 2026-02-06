export default function BlinkingText({ children, style }) {
  return (
    <span className="animate-blink" style={{ display: 'inline-block', ...style }}>
      {children}
    </span>
  );
}
