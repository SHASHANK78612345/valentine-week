import { useState, useCallback, useEffect, useRef } from 'react';
import RetroWindow from '../components/retro/RetroWindow';
import { letterTemplates } from '../data/compliments';
import { fireConfettiCannon, fireConfetti } from '../components/particles/ConfettiExplosion';

/* ─── Love Calculator ─── */
function LoveCalculator() {
  const [name1, setName1] = useState('SHASHANK');
  const [name2, setName2] = useState('PRITIPRIYA');
  const [calculating, setCalculating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const calculate = useCallback(() => {
    if (!name1.trim() || !name2.trim()) return;
    setCalculating(true);
    setResult(null);
    setProgress(0);

    // Fake loading with dramatic pauses
    const steps = [5, 12, 18, 25, 33, 40, 48, 55, 63, 69, 69, 72, 80, 88, 93, 97, 100];
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(interval);
        // Rigged: always 95-100%
        const score = 95 + Math.floor(Math.random() * 6);
        setResult(score);
        setCalculating(false);
        fireConfetti({ particleCount: 80, spread: 100, origin: { y: 0.7 } });
      }
    }, 200);
  }, [name1, name2]);

  return (
    <RetroWindow title="love_calculator.exe" statusBar={result ? `Result: ${result}% compatible` : 'Ready'}>
      <div style={{ background: '#0a000a', padding: '20px', border: '2px inset #333', textAlign: 'center' }}>
        <h3 className="pixel-text glow-pink" style={{ fontSize: '0.7rem', marginBottom: '16px' }}>
          💕 LOVE CALCULATOR 💕
        </h3>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
          <input
            className="retro-input"
            placeholder="Your name..."
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            style={{ maxWidth: '180px' }}
          />
          <span style={{ fontSize: '1.5rem' }}>💕</span>
          <input
            className="retro-input"
            placeholder="Their name..."
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            style={{ maxWidth: '180px' }}
          />
        </div>

        <button
          className="retro-btn"
          onClick={calculate}
          disabled={calculating || !name1.trim() || !name2.trim()}
          style={{ marginBottom: '16px', opacity: (!name1.trim() || !name2.trim()) ? 0.4 : 1 }}
        >
          {calculating ? 'CALCULATING...' : 'CALCULATE LOVE'}
        </button>

        {calculating && (
          <div>
            <div className="neon-progress" style={{ marginBottom: '8px' }}>
              <div className="neon-progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <p style={{ color: 'var(--pink)', fontFamily: 'var(--font-retro)' }}>
              {progress < 30 && 'Analyzing heart wavelengths...'}
              {progress >= 30 && progress < 60 && 'Cross-referencing love databases...'}
              {progress >= 60 && progress < 69 && 'Running compatibility algorithms...'}
              {progress === 69 && 'Nice. 😏 Continuing...'}
              {progress > 69 && progress < 100 && 'Finalizing results...'}
              {progress === 100 && 'Complete!'}
            </p>
          </div>
        )}

        {result && (
          <div className="animate-fade-in-scale" style={{ marginTop: '16px' }}>
            <div className="led-display" style={{
              fontSize: '3rem',
              color: 'var(--hot-pink)',
              textShadow: '0 0 20px var(--hot-pink)',
              padding: '16px 32px',
            }}>
              {result}%
            </div>
            <p style={{ color: 'var(--pink)', marginTop: '12px', fontSize: '1.2rem' }}>
              "Science confirms what we already knew." 🔬💕
            </p>
            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '4px' }}>
              (This calculator may or may not be rigged. The results stand.)
            </p>
          </div>
        )}
      </div>
    </RetroWindow>
  );
}

/* ─── Love Letter Generator ─── */
function LoveLetterGenerator() {
  const [inputs, setInputs] = useState({
    petName: '',
    annoyingHabit: '',
    bestFeature: '',
    food: '',
    destination: '',
    adjective: '',
    weirdTalent: '',
    movie: '',
  });
  const [letter, setLetter] = useState('');
  const [typing, setTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [copied, setCopied] = useState(false);
  const typingRef = useRef(null);

  const fields = [
    { key: 'petName', label: 'Pet name for your partner', placeholder: 'Snookums, Babe, etc.' },
    { key: 'annoyingHabit', label: 'Their adorable annoying habit', placeholder: 'stealing the blankets' },
    { key: 'bestFeature', label: 'Their best feature', placeholder: 'smile, laugh, eyes...' },
    { key: 'food', label: 'A food you both love', placeholder: 'pizza, sushi, tacos...' },
    { key: 'destination', label: 'Dream travel destination', placeholder: 'Paris, Tokyo, Mars...' },
    { key: 'adjective', label: 'An adjective (positive!)', placeholder: 'amazing, brilliant...' },
    { key: 'weirdTalent', label: 'Their weird hidden talent', placeholder: 'wiggling ears, etc.' },
    { key: 'movie', label: 'A movie you both like', placeholder: 'The Notebook, Shrek...' },
  ];

  const allFilled = Object.values(inputs).every((v) => v.trim());

  const generate = useCallback(() => {
    if (!allFilled) return;
    const template = letterTemplates[Math.floor(Math.random() * letterTemplates.length)];
    const fullLetter = template(inputs);
    setLetter(fullLetter);
    setDisplayedText('');
    setTyping(true);

    // Typewriter effect
    let i = 0;
    clearInterval(typingRef.current);
    typingRef.current = setInterval(() => {
      if (i < fullLetter.length) {
        setDisplayedText(fullLetter.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingRef.current);
        setTyping(false);
      }
    }, 20);
  }, [inputs, allFilled]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(letter).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [letter]);

  return (
    <RetroWindow title="love_letter_generator.exe" statusBar={typing ? 'Writing...' : 'Ready'}>
      <div style={{ background: '#0a000a', padding: '20px', border: '2px inset #333' }}>
        <h3 className="pixel-text glow-pink" style={{ fontSize: '0.7rem', marginBottom: '16px', textAlign: 'center' }}>
          💌 SARCASTIC LOVE LETTER GENERATOR 💌
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '12px',
          marginBottom: '16px',
        }}>
          {fields.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label style={{
                fontFamily: 'var(--font-retro)',
                fontSize: '0.9rem',
                color: 'var(--cyan)',
                display: 'block',
                marginBottom: '4px',
              }}>
                {label}
              </label>
              <input
                className="retro-input"
                placeholder={placeholder}
                value={inputs[key]}
                onChange={(e) => setInputs((prev) => ({ ...prev, [key]: e.target.value }))}
                style={{ fontSize: '1rem' }}
              />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <button
            className="retro-btn"
            onClick={generate}
            disabled={!allFilled || typing}
            style={{ opacity: allFilled ? 1 : 0.4 }}
          >
            {typing ? '✍️ WRITING...' : '💌 GENERATE LETTER'}
          </button>
        </div>

        {/* Letter output */}
        {(displayedText || letter) && (
          <div>
            <RetroWindow title="love_letter.txt — Notepad">
              <div style={{
                background: '#fffff0',
                padding: '16px',
                fontFamily: 'var(--font-retro)',
                fontSize: '1.1rem',
                color: '#333',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6,
                minHeight: '200px',
                borderRight: typing ? '2px solid #333' : 'none',
              }}>
                {displayedText || letter}
              </div>
            </RetroWindow>
            {!typing && letter && (
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <button className="retro-btn retro-btn--cyan" onClick={copyToClipboard}>
                  {copied ? '✓ COPIED!' : '📋 COPY TO CLIPBOARD'}
                </button>
                <button className="retro-btn" onClick={generate} style={{ marginLeft: '8px' }}>
                  🔄 NEW TEMPLATE
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </RetroWindow>
  );
}

/* ─── Grand Finale ─── */
function GrandFinale() {
  const [revealed, setRevealed] = useState(false);

  const reveal = useCallback(() => {
    setRevealed(true);
    fireConfettiCannon();
  }, []);

  const replayConfetti = useCallback(() => {
    fireConfettiCannon();
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0a000a, #1a0020, #0a000a)',
      border: '2px solid var(--hot-pink)',
      padding: '40px 24px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative corner hearts */}
      <div style={{ position: 'absolute', top: '8px', left: '12px', fontSize: '1.5rem', opacity: 0.3 }}>💕</div>
      <div style={{ position: 'absolute', top: '8px', right: '12px', fontSize: '1.5rem', opacity: 0.3 }}>💕</div>
      <div style={{ position: 'absolute', bottom: '8px', left: '12px', fontSize: '1.5rem', opacity: 0.3 }}>💕</div>
      <div style={{ position: 'absolute', bottom: '8px', right: '12px', fontSize: '1.5rem', opacity: 0.3 }}>💕</div>

      {!revealed ? (
        <div>
          <h2 className="pixel-text rainbow-text" style={{
            fontSize: 'clamp(0.8rem, 3vw, 1.5rem)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>
            THE GRAND FINALE
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1.2rem' }}>
            Are you ready for the final surprise? 💕
          </p>
          <button
            className="retro-btn animate-pulse-glow"
            onClick={reveal}
            style={{ fontSize: '0.8rem', padding: '12px 32px' }}
          >
            ❤️ REVEAL THE FINALE ❤️
          </button>
        </div>
      ) : (
        <div className="animate-fade-in">
          <h2 className="pixel-text rainbow-text" style={{
            fontSize: 'clamp(1rem, 4vw, 2rem)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>
            HAPPY VALENTINE'S DAY!
          </h2>

          <div style={{ fontSize: '4rem', marginBottom: '24px' }} className="animate-heartbeat">
            ❤️
          </div>

          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '24px',
            background: 'rgba(255,20,147,0.05)',
            border: '1px solid rgba(255,20,147,0.2)',
            borderRadius: '0',
          }}>
            <p style={{
              fontFamily: 'var(--font-retro)',
              fontSize: '1.4rem',
              color: 'var(--text-primary)',
              lineHeight: 1.8,
            }}>
              Hey you. Yes, you — the one reading this with that beautiful face of yours.
              <br /><br />
              I made this ridiculous, over-the-top, pixel-art-filled website because
              a simple "I love you" never feels like enough. You deserve grand gestures
              and silly surprises and terrible jokes wrapped in terrible CSS.
              <br /><br />
              Every day with you is my favorite day. Every moment — even the ones where
              we're just sitting in silence, doing absolutely nothing — is perfect because
              you're in it.
              <br /><br />
              Thank you for being my person. My favorite notification. My emergency contact.
              My player two.
              <br /><br />
              I love you. Not 95-100% — that calculator was rigged and we both know it.
              It's more like... 1000%. Infinity percent. All the percent.
              <br /><br />
              Happy Valentine's Day, my love. 💕
            </p>
          </div>

          <div style={{ marginTop: '32px' }}>
            <button
              className="retro-btn"
              onClick={replayConfetti}
              style={{ fontSize: '0.6rem' }}
            >
              🎉 REPLAY CONFETTI 🎉
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
export default function ValentineDay() {
  return (
    <div className="container" style={{ maxWidth: 800 }}>
      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1
          className="pixel-text rainbow-text"
          style={{ fontSize: 'clamp(0.8rem, 3vw, 1.5rem)', marginBottom: '8px', lineHeight: 1.6 }}
        >
          ❤️ Day 8: Valentine's Day ❤️
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
          The grand finale. Three surprises await. 💕
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Section 1: Love Calculator */}
        <section>
          <LoveCalculator />
        </section>

        {/* Section 2: Love Letter Generator */}
        <section>
          <LoveLetterGenerator />
        </section>

        {/* Section 3: Grand Finale */}
        <section>
          <GrandFinale />
        </section>
      </div>

      <div style={{ textAlign: 'center', padding: '40px 0 20px' }}>
        <p style={{ color: '#555', fontSize: '0.85rem' }}>
          Made with more love than is probably healthy 💕
        </p>
      </div>
    </div>
  );
}
