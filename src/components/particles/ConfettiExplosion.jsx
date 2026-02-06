import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function ConfettiExplosion({ trigger, colors }) {
  useEffect(() => {
    if (!trigger) return;

    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.5,
      decay: 0.94,
      startVelocity: 30,
      colors: colors || ['#ff69b4', '#ff1493', '#ff00ff', '#00ffff', '#ffd700', '#ff0000'],
    };

    const shoot = () => {
      confetti({ ...defaults, particleCount: 50, origin: { x: 0.3, y: 0.5 } });
      confetti({ ...defaults, particleCount: 50, origin: { x: 0.7, y: 0.5 } });
    };

    shoot();
    const timer = setTimeout(shoot, 250);
    return () => clearTimeout(timer);
  }, [trigger, colors]);

  return null;
}

export function fireConfetti(options = {}) {
  const defaults = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff69b4', '#ff1493', '#ff00ff', '#00ffff', '#ffd700', '#ff0000'],
    ...options,
  };
  confetti(defaults);
}

export function fireConfettiCannon() {
  const duration = 3000;
  const end = Date.now() + duration;
  const colors = ['#ff69b4', '#ff1493', '#ff00ff', '#00ffff', '#ffd700'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
