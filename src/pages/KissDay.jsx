import { useState, useCallback } from 'react';
import RetroWindow from '../components/retro/RetroWindow';
import { kissTypes } from '../data/compliments';
import { fireConfetti } from '../components/particles/ConfettiExplosion';

export default function KissDay() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [totalSpins, setTotalSpins] = useState(0);

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    // Random segment
    const segmentAngle = 360 / kissTypes.length;
    const winIndex = Math.floor(Math.random() * kissTypes.length);
    const extraSpins = 5 + Math.floor(Math.random() * 3); // 5-7 full rotations
    const targetAngle = extraSpins * 360 + (360 - winIndex * segmentAngle - segmentAngle / 2);

    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setResult(kissTypes[winIndex]);
      setHistory((prev) => [kissTypes[winIndex], ...prev].slice(0, 10));
      setTotalSpins((prev) => prev + 1);
      fireConfetti({
        particleCount: 50,
        spread: 60,
        colors: ['#ff1493', '#ff69b4', '#ff00ff'],
      });
    }, 4000);
  }, [spinning]);

  return (
    <div className="container" style={{ maxWidth: 800 }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1
          className="pixel-text"
          style={{ fontSize: 'clamp(0.8rem, 3vw, 1.2rem)', color: 'var(--hot-pink)', marginBottom: '8px' }}
        >
          💋 Day 7: Kiss Day 💋
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Spin the wheel and discover your kiss destiny!
        </p>
      </header>

      <div className="two-panel-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '16px', alignItems: 'start' }}>
        {/* Wheel */}
        <RetroWindow title="kiss_roulette.exe" statusBar={`Total spins: ${totalSpins}`}>
          <div style={{
            background: '#0a0010',
            padding: '24px',
            border: '2px inset #333',
            textAlign: 'center',
          }}>
            {/* Pointer */}
            <div style={{
              fontSize: '2rem',
              marginBottom: '-10px',
              position: 'relative',
              zIndex: 10,
            }}>
              ▼
            </div>

            {/* Wheel */}
            <div style={{
              width: '300px',
              height: '300px',
              margin: '0 auto',
              position: 'relative',
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '4px solid var(--hot-pink)',
                boxShadow: '0 0 20px var(--hot-pink), inset 0 0 20px rgba(255,20,147,0.1)',
                overflow: 'hidden',
                position: 'relative',
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
              }}>
                {kissTypes.map((kiss, i) => {
                  const angle = (360 / kissTypes.length) * i;
                  const colors = ['#ff1493', '#ff69b4', '#cc0066', '#ff4488', '#dd1177', '#ee3399', '#ff0066', '#ff77aa'];
                  return (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        width: '50%',
                        height: '50%',
                        left: '50%',
                        top: '50%',
                        transformOrigin: '0 0',
                        transform: `rotate(${angle}deg) skewY(${-(90 - 360 / kissTypes.length)}deg)`,
                        background: colors[i],
                        border: '1px solid rgba(0,0,0,0.3)',
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: '30%',
                        top: '30%',
                        transform: `skewY(${90 - 360 / kissTypes.length}deg) rotate(${360 / kissTypes.length / 2}deg)`,
                        fontSize: '1.5rem',
                      }}>
                        {kiss.emoji}
                      </span>
                    </div>
                  );
                })}

                {/* Center */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#1a0020',
                  border: '3px solid var(--hot-pink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  zIndex: 5,
                }}>
                  💋
                </div>
              </div>

              {/* Neon ring lights */}
              <div style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '50%',
                border: '3px dashed var(--hot-pink)',
                opacity: 0.3,
                animation: spinning ? 'spin 2s linear infinite' : 'none',
              }} />
            </div>

            {/* Spin button */}
            <button
              className="retro-btn"
              onClick={spin}
              disabled={spinning}
              style={{
                marginTop: '20px',
                fontSize: '0.7rem',
                borderColor: 'var(--hot-pink)',
                color: spinning ? '#555' : 'var(--hot-pink)',
                cursor: spinning ? 'not-allowed' : 'pointer',
              }}
            >
              {spinning ? '✨ SPINNING... ✨' : '💋 SPIN THE WHEEL'}
            </button>

            {/* Result */}
            {result && (
              <div
                className="animate-fade-in-scale"
                style={{
                  marginTop: '16px',
                  padding: '16px',
                  border: '2px solid var(--hot-pink)',
                  background: '#1a0020',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{result.emoji}</div>
                <h3 className="pixel-text" style={{
                  fontSize: '0.7rem',
                  color: 'var(--hot-pink)',
                  marginBottom: '8px',
                }}>
                  {result.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  {result.message}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                  <span style={{ fontFamily: 'var(--font-retro)', color: '#ff69b4' }}>
                    Romance: {'❤️'.repeat(result.romance)}{'🖤'.repeat(5 - result.romance)}
                  </span>
                  <span style={{ fontFamily: 'var(--font-retro)', color: 'var(--gold)' }}>
                    Silliness: {'⭐'.repeat(result.silliness)}{'☆'.repeat(5 - result.silliness)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </RetroWindow>

        {/* History panel */}
        <RetroWindow title="spin_history.log">
          <div style={{
            background: '#0a0010',
            padding: '12px',
            border: '2px inset #333',
            minHeight: '300px',
          }}>
            {history.length === 0 ? (
              <p style={{ color: '#555', textAlign: 'center', fontFamily: 'var(--font-retro)' }}>
                No spins yet...<br />Give it a whirl! 💋
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {history.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '4px 8px',
                      background: i === 0 ? 'rgba(255,20,147,0.1)' : 'transparent',
                      border: i === 0 ? '1px solid var(--hot-pink)' : '1px solid transparent',
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{item.emoji}</span>
                    <span style={{
                      fontFamily: 'var(--font-retro)',
                      fontSize: '0.85rem',
                      color: i === 0 ? 'var(--hot-pink)' : 'var(--text-secondary)',
                    }}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </RetroWindow>
      </div>
    </div>
  );
}
