import { useState, useRef, useCallback, useEffect } from 'react';
import RetroWindow from '../components/retro/RetroWindow';
import { chocolateCompliments } from '../data/compliments';
import { fireConfetti, fireConfettiCannon } from '../components/particles/ConfettiExplosion';

function ScratchCard({ chocolate, index, onReveal }) {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [scratching, setScratching] = useState(false);
  const scratchPercentRef = useRef(0);

  const initCanvas = useCallback((canvas) => {
    if (!canvas) return;
    canvasRef.current = canvas;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Gold foil gradient
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, '#ffd700');
    gradient.addColorStop(0.3, '#ffec80');
    gradient.addColorStop(0.5, '#ffd700');
    gradient.addColorStop(0.7, '#daa520');
    gradient.addColorStop(1, '#ffd700');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // "Scratch me" text
    ctx.fillStyle = '#b8860b';
    ctx.font = 'bold 16px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH', w / 2, h / 2 - 10);
    ctx.fillText('ME!', w / 2, h / 2 + 14);

    // Holographic shimmer lines
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < w + h; i += 12) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i - h, h);
      ctx.stroke();
    }
  }, []);

  const scratch = useCallback((e) => {
    if (revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    let x, y;
    if (e.touches) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    // Scale to canvas coordinates
    x = (x / rect.width) * canvas.width;
    y = (y / rect.height) * canvas.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Check scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const percent = transparent / (imageData.data.length / 4);
    scratchPercentRef.current = percent;

    if (percent > 0.4 && !revealed) {
      setRevealed(true);
      onReveal(index);
      fireConfetti({ particleCount: 30, spread: 50 });
    }
  }, [revealed, index, onReveal]);

  return (
    <div
      style={{
        background: '#1a0a00',
        border: '2px solid #8B4513',
        padding: '12px',
        textAlign: 'center',
        position: 'relative',
        transition: 'all 0.3s ease',
        boxShadow: revealed ? '0 0 20px #8B451344' : 'none',
      }}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
        {/* Revealed content underneath */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
            background: '#2a1000',
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '4px' }}>🍫</div>
          <div
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.5rem',
              color: '#daa520',
              marginBottom: '4px',
            }}
          >
            {chocolate.type}
          </div>
          <p
            style={{
              fontFamily: 'var(--font-retro)',
              fontSize: '0.8rem',
              color: '#deb887',
              lineHeight: 1.3,
            }}
          >
            {chocolate.text}
          </p>
        </div>

        {/* Scratch canvas on top */}
        {!revealed && (
          <canvas
            ref={initCanvas}
            width={300}
            height={225}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              cursor: 'crosshair',
              touchAction: 'none',
            }}
            onMouseDown={() => setScratching(true)}
            onMouseUp={() => setScratching(false)}
            onMouseLeave={() => setScratching(false)}
            onMouseMove={(e) => scratching && scratch(e)}
            onTouchStart={() => setScratching(true)}
            onTouchEnd={() => setScratching(false)}
            onTouchMove={(e) => { e.preventDefault(); scratch(e); }}
          />
        )}
      </div>
    </div>
  );
}

export default function ChocolateDay() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [showBonus, setShowBonus] = useState(false);
  const [bonusRevealed, setBonusRevealed] = useState(false);

  const handleReveal = useCallback((index) => {
    setRevealedCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 6) {
        setTimeout(() => {
          setShowBonus(true);
          fireConfettiCannon();
        }, 500);
      }
      return newCount;
    });
  }, []);

  return (
    <div className="container" style={{ maxWidth: 800 }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1
          className="pixel-text"
          style={{ fontSize: 'clamp(0.8rem, 3vw, 1.2rem)', color: '#DEB887', marginBottom: '8px' }}
        >
          🍫 Day 3: Chocolate Day 🍫
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Scratch the golden cards to reveal chocolate-coated compliments!
        </p>
      </header>

      <RetroWindow
        title="chocolate_scratch_cards.exe"
        statusBar={`Cards scratched: ${revealedCount}/6${showBonus ? ' + BONUS!' : ''}`}
      >
        <div style={{ background: '#0a0500', padding: '16px', border: '2px inset #333' }}>
          {/* Progress */}
          <div style={{ marginBottom: '12px' }}>
            <div className="neon-progress" style={{ borderColor: '#daa520' }}>
              <div
                className="neon-progress-bar"
                style={{
                  width: `${(revealedCount / 6) * 100}%`,
                  background: 'linear-gradient(90deg, #8B4513, #daa520)',
                  boxShadow: '0 0 10px #daa520',
                }}
              />
            </div>
          </div>

          {/* Card grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '12px',
            }}
          >
            {chocolateCompliments.map((choc, i) => (
              <ScratchCard
                key={i}
                chocolate={choc}
                index={i}
                onReveal={handleReveal}
              />
            ))}
          </div>

          {/* Bonus card */}
          {showBonus && (
            <div className="animate-fade-in-scale" style={{ marginTop: '16px' }}>
              <div
                style={{
                  background: '#1a0a00',
                  border: '3px solid #ffd700',
                  padding: '24px',
                  textAlign: 'center',
                  boxShadow: '0 0 30px #ffd70044, inset 0 0 30px #ffd70011',
                  animation: 'pulse-glow 2s infinite',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🎫✨</div>
                <h3 className="pixel-text" style={{ color: '#ffd700', fontSize: '0.7rem', marginBottom: '12px' }}>
                  GOLDEN TICKET!
                </h3>
                {!bonusRevealed ? (
                  <button
                    className="retro-btn retro-btn--gold"
                    onClick={() => {
                      setBonusRevealed(true);
                      fireConfettiCannon();
                    }}
                  >
                    REVEAL GOLDEN TICKET
                  </button>
                ) : (
                  <div className="animate-fade-in">
                    <p style={{ color: '#daa520', fontSize: '1.3rem', lineHeight: 1.5 }}>
                      🏆 Congratulations! You've won the sweetest prize of all: being loved by someone
                      who made an entire website just to tell you how amazing you are.
                      <br /><br />
                      Redeemable for: Unlimited chocolates, hugs, and terrible jokes. No expiry date. 💝
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </RetroWindow>
    </div>
  );
}
