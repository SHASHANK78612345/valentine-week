export default function GlitchText({ text, style }) {
  return (
    <span
      className="animate-glitch-text"
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-pixel)',
        ...style,
      }}
    >
      {text}
    </span>
  );
}
