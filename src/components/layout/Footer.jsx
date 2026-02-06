import { useState, useEffect } from 'react';
import { marqueeTexts } from '../../data/compliments';

export default function Footer() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % marqueeTexts.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer
      style={{
        background: 'var(--win98-bg)',
        borderTop: '2px solid var(--win98-border-light)',
        padding: '4px 0',
        overflow: 'hidden',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '28px',
      }}
    >
      <div
        style={{
          display: 'flex',
          animation: 'marquee 20s linear infinite',
          whiteSpace: 'nowrap',
          fontFamily: 'var(--font-retro)',
          fontSize: '0.9rem',
          color: '#000',
          lineHeight: '20px',
        }}
      >
        {marqueeTexts[textIndex]}
      </div>
    </footer>
  );
}
