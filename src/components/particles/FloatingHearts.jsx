import { useState, useEffect } from 'react';

const HEART_CHARS = ['♥', '♡', '💕', '💖', '💗', '💝'];

export default function FloatingHearts({ count = 12 }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      char: HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)],
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      size: 10 + Math.random() * 20,
      opacity: 0.1 + Math.random() * 0.3,
    }));
    setHearts(generated);
  }, [count]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          style={{
            position: 'absolute',
            left: `${heart.left}%`,
            top: '-20px',
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `heart-fall ${heart.duration}s linear ${heart.delay}s infinite`,
            color: 'var(--pink)',
          }}
        >
          {heart.char}
        </span>
      ))}
    </div>
  );
}
