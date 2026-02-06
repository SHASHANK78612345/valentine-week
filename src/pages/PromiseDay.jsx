import { useState, useRef, useCallback, useEffect } from 'react';
import RetroWindow from '../components/retro/RetroWindow';
import { promiseClauses } from '../data/compliments';
import { fireConfettiCannon } from '../components/particles/ConfettiExplosion';

export default function PromiseDay() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [loadingBar, setLoadingBar] = useState(0);
  const [showCert, setShowCert] = useState(false);
  const scrollRef = useRef(null);

  // Fake loading bar on mount
  useEffect(() => {
    if (loadingBar >= 100) return;
    const targets = [12, 25, 34, 42, 55, 63, 69, 69, 69, 78, 85, 91, 96, 100];
    let i = 0;
    const interval = setInterval(() => {
      if (i < targets.length) {
        setLoadingBar(targets[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = useCallback((e) => {
    const el = e.target;
    const progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
    setScrollProgress(Math.min(Math.round(progress * 100), 100));
  }, []);

  const handleAccept = useCallback(() => {
    setAccepted(true);
    fireConfettiCannon();
    setTimeout(() => setShowCert(true), 500);
  }, []);

  const canAccept = scrollProgress >= 90 && check1 && check2;

  if (showCert) {
    return (
      <div className="container" style={{ maxWidth: 700 }}>
        <header style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 className="pixel-text" style={{ fontSize: 'clamp(0.8rem, 3vw, 1.2rem)', color: 'var(--neon-green)', marginBottom: '8px' }}>
            🤝 Day 5: Promise Day 🤝
          </h1>
        </header>
        <div className="animate-fade-in-scale">
          <div style={{
            background: '#fffef0',
            border: '4px double #8B7355',
            padding: '40px 32px',
            textAlign: 'center',
            position: 'relative',
            boxShadow: '0 0 30px rgba(139,115,85,0.3)',
          }}>
            {/* Wax seal */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              right: '30px',
              fontSize: '3rem',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
            }}>
              🔴
            </div>

            <h2 style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.7rem',
              color: '#5c4033',
              marginBottom: '24px',
              letterSpacing: '3px',
            }}>
              CERTIFICATE OF ETERNAL LOVE
            </h2>

            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>💕</div>

            <p style={{
              fontFamily: 'var(--font-retro)',
              fontSize: '1.3rem',
              color: '#333',
              lineHeight: 1.6,
              maxWidth: '500px',
              margin: '0 auto 24px',
            }}>
              This is to certify that the terms and conditions of love
              have been read (or at least scrolled through), acknowledged,
              and enthusiastically accepted on this day.
            </p>

            <div style={{
              borderTop: '1px solid #8B7355',
              borderBottom: '1px solid #8B7355',
              padding: '16px 0',
              margin: '16px 0',
            }}>
              <p style={{ fontFamily: 'var(--font-retro)', fontSize: '1.1rem', color: '#555' }}>
                Effective Date: February 11, 2026
              </p>
              <p style={{ fontFamily: 'var(--font-retro)', fontSize: '1.1rem', color: '#555' }}>
                Duration: Forever (∞)
              </p>
              <p style={{ fontFamily: 'var(--font-retro)', fontSize: '1.1rem', color: '#555' }}>
                Status: IRREVOCABLE
              </p>
            </div>

            <div style={{ marginTop: '24px' }}>
              <p style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.5rem',
                color: '#8B7355',
                fontStyle: 'italic',
              }}>
                Digitally signed with love 💝
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: 750 }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1
          className="pixel-text"
          style={{ fontSize: 'clamp(0.8rem, 3vw, 1.2rem)', color: 'var(--neon-green)', marginBottom: '8px' }}
        >
          🤝 Day 5: Promise Day 🤝
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Please read the following terms carefully before accepting.
        </p>
      </header>

      {/* Loading bar */}
      {loadingBar < 100 && (
        <RetroWindow title="loading...">
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ color: '#000', marginBottom: '8px' }}>Loading love_contract.pdf...</p>
            <div className="retro-progress">
              <div className="retro-progress-bar" style={{ width: `${loadingBar}%` }} />
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '8px' }}>
              {loadingBar}% complete{loadingBar === 69 ? ' (nice)' : ''}
            </p>
          </div>
        </RetroWindow>
      )}

      {loadingBar >= 100 && (
        <>
          <RetroWindow
            title="LOVE_EULA_v14.02.txt — Notepad"
            statusBar={`Scroll progress: ${scrollProgress}% | ${scrollProgress >= 90 ? '✓ Read enough' : '⚠ Keep scrolling...'}`}
          >
            <div style={{ background: '#0a0a0a', padding: '4px', border: '2px inset #333' }}>
              {/* Scroll progress bar */}
              <div className="neon-progress" style={{ marginBottom: '8px', height: '16px' }}>
                <div
                  className="neon-progress-bar"
                  style={{
                    width: `${scrollProgress}%`,
                    background: scrollProgress >= 90
                      ? 'linear-gradient(90deg, #22cc22, #39ff14)'
                      : 'linear-gradient(90deg, #ff1493, #ff69b4)',
                    boxShadow: scrollProgress >= 90 ? '0 0 10px var(--neon-green)' : '0 0 10px var(--pink)',
                  }}
                />
              </div>

              {/* Contract content */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                style={{
                  height: '400px',
                  overflowY: 'auto',
                  padding: '16px',
                  fontFamily: 'var(--font-retro)',
                  fontSize: '1.1rem',
                  color: 'var(--neon-green)',
                  lineHeight: 1.6,
                  background: '#050505',
                }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '0.6rem',
                  color: 'var(--neon-green)',
                  marginBottom: '16px',
                  textAlign: 'center',
                }}>
                  LOVE TERMS & CONDITIONS
                  <br />
                  END USER LICENSE AGREEMENT (EULA) v14.02
                </h3>

                <p style={{ color: '#0f0', marginBottom: '12px', textAlign: 'center' }}>
                  ════════════════════════════════════════
                </p>

                <p style={{ marginBottom: '16px', color: '#888' }}>
                  IMPORTANT — READ CAREFULLY: This Love End User License Agreement ("EULA")
                  is a legally binding* agreement between you ("You", "The Love of My Life")
                  and me ("Me", "Your Biggest Fan", "The One Who Made This Website").
                </p>

                <p style={{ marginBottom: '16px', color: '#555', fontSize: '0.9rem' }}>
                  *Not actually legally binding. But morally? Absolutely.
                </p>

                {promiseClauses.map((clause, i) => (
                  <div key={i} style={{ marginBottom: '16px' }}>
                    <p>
                      <span style={{ color: 'var(--cyan)' }}>§{i + 1}.</span>{' '}
                      {clause}
                    </p>
                  </div>
                ))}

                <p style={{ color: '#0f0', margin: '24px 0', textAlign: 'center' }}>
                  ════════════════════════════════════════
                </p>

                <p style={{ textAlign: 'center', color: '#888', marginBottom: '8px' }}>
                  END OF TERMS
                </p>
                <p style={{ textAlign: 'center', color: '#555', fontSize: '0.85rem' }}>
                  (You actually scrolled through all of that? I'm impressed. And a little concerned.)
                </p>
              </div>
            </div>
          </RetroWindow>

          {/* Acceptance section */}
          <div style={{
            background: 'var(--bg-panel)',
            border: '2px solid var(--neon-green)',
            padding: '20px',
            marginTop: '16px',
          }}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-primary)' }}>
                <input
                  type="checkbox"
                  className="retro-checkbox"
                  checked={check1}
                  onChange={(e) => setCheck1(e.target.checked)}
                />
                I have read (or at least scrolled through) the above terms
              </label>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-primary)' }}>
                <input
                  type="checkbox"
                  className="retro-checkbox"
                  checked={check2}
                  onChange={(e) => setCheck2(e.target.checked)}
                />
                I agree to love unconditionally (terms and conditions may still apply)
              </label>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                className="retro-btn retro-btn--green"
                onClick={handleAccept}
                disabled={!canAccept}
                style={{
                  opacity: canAccept ? 1 : 0.4,
                  cursor: canAccept ? 'pointer' : 'not-allowed',
                }}
              >
                ✓ I ACCEPT THESE TERMS
              </button>
              {!canAccept && (
                <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '8px' }}>
                  {scrollProgress < 90
                    ? `Scroll to read at least 90% of the contract (currently: ${scrollProgress}%)`
                    : 'Check both boxes to accept'}
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
