import { useState, useCallback, useRef, useEffect } from 'react';
import RetroWindow from '../components/retro/RetroWindow';
import { hugReactions } from '../data/compliments';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function HugDay() {
  const [hugCount, setHugCount] = useLocalStorage('hugCount', 0);
  const [combo, setCombo] = useState(0);
  const [showBSOD, setShowBSOD] = useState(false);
  const [warningPopups, setWarningPopups] = useState([]);
  const comboTimerRef = useRef(null);
  const [buttonScale, setButtonScale] = useState(1);
  const [floatingHearts, setFloatingHearts] = useState([]);

  const getCurrentReaction = useCallback(() => {
    return hugReactions.find((r) => hugCount >= r.min && hugCount <= r.max) || hugReactions[0];
  }, [hugCount]);

  const reaction = getCurrentReaction();

  const spawnHeart = useCallback(() => {
    const heart = {
      id: Date.now() + Math.random(),
      x: 40 + Math.random() * 20,
      emoji: ['❤️', '💕', '💖', '💗', '🤗', '💝'][Math.floor(Math.random() * 6)],
    };
    setFloatingHearts((prev) => [...prev.slice(-20), heart]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== heart.id));
    }, 2000);
  }, []);

  const handleHug = useCallback(() => {
    const newCount = hugCount + 1;
    setHugCount(newCount);

    // Button press effect
    setButtonScale(0.9);
    setTimeout(() => setButtonScale(1), 100);

    // Spawn hearts
    spawnHeart();
    if (newCount > 25) spawnHeart();
    if (newCount > 100) spawnHeart();

    // Combo system
    setCombo((prev) => prev + 1);
    clearTimeout(comboTimerRef.current);
    comboTimerRef.current = setTimeout(() => setCombo(0), 1000);

    // Warning popups at 200+
    if (newCount > 200 && newCount <= 500 && newCount % 25 === 0) {
      const warnings = [
        '⚠️ WARNING: Hug levels exceeding safe limits!',
        '🔥 THERMAL WARNING: Love overheating!',
        '💀 CRITICAL: System cannot handle this much affection!',
        '🚨 ALERT: Emergency cuddle protocol activated!',
      ];
      setWarningPopups((prev) => [...prev, {
        id: Date.now(),
        text: warnings[Math.floor(Math.random() * warnings.length)],
      }]);
      setTimeout(() => setWarningPopups((prev) => prev.slice(1)), 2500);
    }

    // BSOD at 500+
    if (newCount === 501) {
      setShowBSOD(true);
    }
  }, [hugCount, setHugCount, spawnHeart]);

  // BSOD screen
  if (showBSOD) {
    return (
      <div
        onClick={() => setShowBSOD(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000080',
          color: '#fff',
          fontFamily: 'var(--font-retro)',
          padding: '40px',
          cursor: 'pointer',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: '1rem', marginBottom: '24px', textAlign: 'center' }}>
          💙 BLUE SCREEN OF LOVE 💙
        </h1>
        <p style={{ fontSize: '1.5rem', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          A fatal love exception has occurred at address 0x00HUGME.
          <br /><br />
          The current application (heart.exe) has performed an illegal amount
          of hugging and will be terminated... just kidding.
          <br /><br />
          After {hugCount} hugs, I just want you to know: every single one
          of them made me smile. You're my favorite person, and no amount
          of clicking can express how much I love you. 💕
          <br /><br />
          <span style={{ fontSize: '1rem', color: '#aaa' }}>
            Press any key (or click) to continue being adorable...
          </span>
        </p>
      </div>
    );
  }

  const isInverted = hugCount > 100 && hugCount <= 200;
  const isGlitchy = hugCount > 200 && hugCount <= 500;
  const isShaking = hugCount > 50 && hugCount <= 100;

  return (
    <div
      className={`container ${isShaking ? 'animate-shake' : ''}`}
      style={{
        maxWidth: 700,
        filter: isInverted ? 'invert(1) hue-rotate(180deg)' : 'none',
        transition: 'filter 0.5s',
      }}
    >
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1
          className={`pixel-text ${isGlitchy ? 'animate-glitch-text' : ''}`}
          style={{ fontSize: 'clamp(0.8rem, 3vw, 1.2rem)', color: '#ff6600', marginBottom: '8px' }}
        >
          🤗 Day 6: Hug Day 🤗
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Click to hug. Keep clicking. See what happens. 😏
        </p>
      </header>

      {/* Warning popups */}
      {warningPopups.map((popup) => (
        <div
          key={popup.id}
          className="animate-fade-in-scale"
          style={{
            position: 'fixed',
            top: `${20 + Math.random() * 30}%`,
            left: `${20 + Math.random() * 40}%`,
            background: 'var(--win98-bg)',
            border: '2px outset var(--win98-border-light)',
            padding: '12px 20px',
            zIndex: 100,
            color: '#000',
            fontFamily: 'var(--font-retro)',
            boxShadow: '3px 3px 0 #000',
          }}
        >
          {popup.text}
        </div>
      ))}

      {/* Floating hearts */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            position: 'fixed',
            left: `${heart.x}%`,
            bottom: '30%',
            fontSize: '1.5rem',
            animation: 'heart-float 2s ease-out forwards',
            pointerEvents: 'none',
            zIndex: 50,
          }}
        >
          {heart.emoji}
        </div>
      ))}

      <RetroWindow
        title="hug_o_meter.exe"
        statusBar={`Level: ${reaction.label} | Combo: ${combo > 1 ? `x${combo}` : '-'}`}
      >
        <div style={{
          background: '#0a0a0a',
          padding: '24px',
          border: '2px inset #333',
          textAlign: 'center',
        }}>
          {/* LED Counter */}
          <div style={{ marginBottom: '20px' }}>
            <div
              className="led-display"
              style={{
                fontSize: '2.5rem',
                padding: '12px 24px',
                color: reaction.color,
                textShadow: `0 0 10px ${reaction.color}, 0 0 20px ${reaction.color}`,
              }}
            >
              {String(hugCount).padStart(4, '0')}
            </div>
            <div style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.5rem',
              color: 'var(--text-secondary)',
              marginTop: '8px',
            }}>
              TOTAL HUGS
            </div>
          </div>

          {/* Hug button */}
          <button
            onClick={handleHug}
            className={hugCount > 25 ? 'animate-pulse' : ''}
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${reaction.color}, ${reaction.color}88)`,
              border: `4px solid ${reaction.color}`,
              fontSize: '3rem',
              cursor: 'pointer',
              boxShadow: `0 0 20px ${reaction.color}44, 0 0 40px ${reaction.color}22`,
              transition: 'transform 0.1s, box-shadow 0.3s',
              transform: `scale(${buttonScale})`,
              outline: 'none',
            }}
          >
            🤗
          </button>

          {/* Reaction message */}
          <div style={{
            marginTop: '20px',
            padding: '12px',
            border: `1px solid ${reaction.color}`,
            background: '#111',
          }}>
            <p className={isGlitchy ? 'animate-glitch-text' : ''} style={{
              fontFamily: 'var(--font-retro)',
              fontSize: '1.3rem',
              color: reaction.color,
            }}>
              {reaction.message}
            </p>
          </div>

          {/* Level indicator */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4px',
            marginTop: '16px',
          }}>
            {hugReactions.map((r, i) => (
              <div
                key={i}
                style={{
                  width: '40px',
                  height: '8px',
                  background: hugCount >= r.min ? r.color : '#222',
                  border: '1px solid #333',
                  transition: 'background 0.3s',
                }}
                title={r.label}
              />
            ))}
          </div>

          {/* Combo display */}
          {combo > 2 && (
            <div
              className="animate-pop-in"
              style={{
                marginTop: '12px',
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.8rem',
                color: 'var(--gold)',
                textShadow: '0 0 10px var(--gold)',
              }}
            >
              COMBO x{combo}! 🔥
            </div>
          )}
        </div>
      </RetroWindow>

      {/* Reset option */}
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <button
          className="retro-btn"
          onClick={() => { setHugCount(0); setCombo(0); }}
          style={{ fontSize: '0.5rem', opacity: 0.5 }}
        >
          Reset Counter
        </button>
      </div>
    </div>
  );
}
