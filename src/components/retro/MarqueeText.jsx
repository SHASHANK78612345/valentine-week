export default function MarqueeText({ children, speed = 20, style }) {
  return (
    <div
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <span
        style={{
          display: 'inline-block',
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {children}
      </span>
    </div>
  );
}
