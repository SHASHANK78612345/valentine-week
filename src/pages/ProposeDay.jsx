import { useState, useRef, useCallback, useEffect } from 'react';
import RetroWindow from '../components/retro/RetroWindow';
import RetroDialog from '../components/retro/RetroDialog';
import { fireConfettiCannon } from '../components/particles/ConfettiExplosion';

const ERROR_MESSAGES = [
  "⚠️ Error: 'No' is not a valid response.",
  "🚫 Access Denied: The 'No' department is closed.",
  "❌ Fatal Error: Cannot process rejection.",
  "⛔ Warning: This action violates the Love Protocol.",
  "🔥 System Error: 'No' button has been recalled for safety reasons.",
];

export default function ProposeDay() {
  const [noAttempts, setNoAttempts] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noSize, setNoSize] = useState(1);
  const [dialogCount, setDialogCount] = useState(1);
  const [errorPopups, setErrorPopups] = useState([]);
  const [noLabel, setNoLabel] = useState('No');
  const containerRef = useRef(null);

  const handleYes = useCallback(() => {
    setAccepted(true);
    fireConfettiCannon();
  }, []);

  const handleNo = useCallback(() => {
    const attempt = noAttempts + 1;
    setNoAttempts(attempt);

    // Show error popup
    const errorMsg = ERROR_MESSAGES[Math.min(attempt - 1, ERROR_MESSAGES.length - 1)];
    setErrorPopups((prev) => [
      ...prev,
      { id: Date.now(), message: errorMsg, x: Math.random() * 60 + 20, y: Math.random() * 60 + 20 },
    ]);

    // Remove popup after 2 seconds
    setTimeout(() => {
      setErrorPopups((prev) => prev.slice(1));
    }, 2000);

    if (attempt <= 2) {
      // Stage 1-2: Teleport randomly
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        setNoPos({
          x: Math.random() * (rect.width - 100),
          y: Math.random() * (Math.min(rect.height, 300) - 40),
        });
      }
    } else if (attempt <= 3) {
      // Stage 3: Shrink + move
      setNoSize(0.6);
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        setNoPos({
          x: Math.random() * (rect.width - 60),
          y: Math.random() * (Math.min(rect.height, 300) - 30),
        });
      }
    } else if (attempt <= 4) {
      // Stage 4: Multiply dialogs
      setDialogCount(5);
    } else {
      // Stage 5: No becomes "Also Yes"
      setNoLabel('Also Yes 💕');
    }
  }, [noAttempts]);

  const handleNoHover = useCallback(() => {
    if (noAttempts >= 2 && noAttempts < 4) {
      // Run from cursor
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        setNoPos({
          x: Math.random() * (rect.width - 80),
          y: Math.random() * (Math.min(rect.height, 300) - 30),
        });
      }
    }
  }, [noAttempts]);

  if (accepted) {
    return (
      <div className="container" style={{ maxWidth: 600, textAlign: 'center' }}>
        <header style={{ marginBottom: '24px' }}>
          <h1 className="pixel-text" style={{ fontSize: 'clamp(0.8rem, 3vw, 1.2rem)', color: 'var(--pink)', marginBottom: '8px' }}>
            💍 Day 2: Propose Day 💍
          </h1>
        </header>
        <div className="animate-fade-in-scale">
          <RetroWindow title="proposal_accepted.exe ✓">
            <div style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '16px' }} className="animate-heartbeat">
                💕
              </div>
              <h2 className="pixel-text glow-pink" style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--hot-pink)' }}>
                SHE SAID YES!
              </h2>
              <p style={{ color: '#000', fontSize: '1.3rem', lineHeight: 1.6 }}>
                Was there ever any doubt? The system was rigged from the start,
                just like my heart was rigged the moment I met you. 💖
              </p>
              <p style={{ color: '#666', fontSize: '1rem', marginTop: '16px' }}>
                (You clicked "No" {noAttempts} time{noAttempts !== 1 ? 's' : ''}. I admire your persistence.)
              </p>
            </div>
          </RetroWindow>
        </div>
      </div>
    );
  }

  const dialogs = Array.from({ length: dialogCount }, (_, i) => i);

  return (
    <div className="container" style={{ maxWidth: 700 }} ref={containerRef}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 className="pixel-text" style={{ fontSize: 'clamp(0.8rem, 3vw, 1.2rem)', color: 'var(--pink)', marginBottom: '8px' }}>
          💍 Day 2: Propose Day 💍
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          A very important system dialog requires your attention...
        </p>
      </header>

      {/* Error popups */}
      {errorPopups.map((popup) => (
        <div
          key={popup.id}
          className="animate-fade-in-scale"
          style={{
            position: 'fixed',
            left: `${popup.x}%`,
            top: `${popup.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 100,
          }}
        >
          <RetroDialog
            title="Error"
            icon="⚠️"
            message={popup.message}
            buttons={
              <button className="win98-btn" onClick={() => setErrorPopups((p) => p.filter((e) => e.id !== popup.id))}>
                OK
              </button>
            }
          />
        </div>
      ))}

      {/* Proposal dialogs */}
      <div style={{ position: 'relative', minHeight: dialogCount > 1 ? '500px' : 'auto' }}>
        {dialogs.map((i) => (
          <div
            key={i}
            style={
              dialogCount > 1
                ? {
                    position: 'absolute',
                    top: `${10 + i * 30}px`,
                    left: `${5 + i * 20}px`,
                    right: `${5 + (4 - i) * 15}px`,
                    zIndex: 10 + i,
                  }
                : {}
            }
          >
            <RetroWindow
              title="important_proposal.exe"
              statusBar={noAttempts > 0 ? `Rejection attempts: ${noAttempts} | Success rate: 0%` : 'Ready'}
            >
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>💍</div>
                <h2
                  className="pixel-text"
                  style={{ fontSize: '0.7rem', color: '#000', marginBottom: '16px' }}
                >
                  IMPORTANT QUESTION
                </h2>
                <p style={{ color: '#000', fontSize: '1.4rem', marginBottom: '24px' }}>
                  Will you be my Valentine, Miss Pritipriya? 💕
                </p>

                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    minHeight: '60px',
                  }}
                >
                  <button
                    className="win98-btn win98-btn--primary"
                    onClick={handleYes}
                    style={{
                      fontSize: '1.2rem',
                      padding: '8px 32px',
                      background: '#c0ffc0',
                    }}
                  >
                    ✓ Yes!
                  </button>

                  <button
                    className="win98-btn"
                    onClick={() => {
                      if (noLabel === 'Also Yes 💕') {
                        handleYes();
                      } else {
                        handleNo();
                      }
                    }}
                    onMouseEnter={handleNoHover}
                    style={{
                      fontSize: `${1.2 * noSize}rem`,
                      padding: `${8 * noSize}px ${24 * noSize}px`,
                      position: noAttempts > 0 ? 'absolute' : 'relative',
                      left: noAttempts > 0 ? `${noPos.x}px` : 'auto',
                      top: noAttempts > 0 ? `${noPos.y}px` : 'auto',
                      transition: 'all 0.2s ease',
                      background: noLabel === 'Also Yes 💕' ? '#c0ffc0' : undefined,
                      zIndex: 20,
                    }}
                  >
                    ✗ {noLabel}
                  </button>
                </div>

                {noAttempts > 0 && (
                  <p
                    style={{
                      color: '#888',
                      fontSize: '0.85rem',
                      marginTop: '30px',
                      fontStyle: 'italic',
                    }}
                  >
                    {noAttempts === 1 && "The button seems to have moved. How curious. 🤔"}
                    {noAttempts === 2 && "It's getting harder to say no, isn't it? 😏"}
                    {noAttempts === 3 && "The button is scared of you now. Look what you've done."}
                    {noAttempts === 4 && "Now there are FIVE of them. Resistance is futile."}
                    {noAttempts >= 5 && "Fine. Both buttons say yes now. Democracy has spoken. 🗳️"}
                  </p>
                )}
              </div>
            </RetroWindow>
          </div>
        ))}
      </div>
    </div>
  );
}
