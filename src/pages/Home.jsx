import { useState, useEffect } from 'react';
import { days } from '../data/days';
import DayReveal from '../components/countdown/DayReveal';
import GlitchText from '../components/retro/GlitchText';
import BlinkingText from '../components/retro/BlinkingText';

export default function Home() {
  const [visitorCount, setVisitorCount] = useState(() => {
    const stored = localStorage.getItem('visitorCount');
    const count = stored ? parseInt(stored) + 1 : 1;
    localStorage.setItem('visitorCount', count);
    return count;
  });

  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSubtitle(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      {/* Header */}
      <header style={{ textAlign: 'center', padding: '40px 0 30px' }}>
        <h1
          className="rainbow-text pixel-text"
          style={{
            fontSize: 'clamp(1rem, 4vw, 2rem)',
            marginBottom: '16px',
            lineHeight: 1.6,
          }}
        >
          Hey! Future Wife 👋
        </h1>
        {showSubtitle && (
          <p
            className="animate-fade-in-up"
            style={{
              fontFamily: 'var(--font-retro)',
              fontSize: '1.5rem',
              color: 'var(--text-secondary)',
              marginBottom: '8px',
            }}
          >
            8 days. 1 incredible person (that's you, Miss Pritipriya).
          </p>
        )}
        <div style={{ marginTop: '12px' }}>
          <BlinkingText>
            <span style={{ color: 'var(--neon-green)', fontFamily: 'var(--font-pixel)', fontSize: '0.5rem' }}>
              ● LIVE
            </span>
          </BlinkingText>
          <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-retro)', marginLeft: '8px' }}>
            Visitor #{visitorCount.toLocaleString()}
          </span>
        </div>
      </header>

      {/* Subtitle banner */}
      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--pink)',
          padding: '12px',
          textAlign: 'center',
          marginBottom: '32px',
        }}
      >
        <GlitchText
          text="[ CLICK A DAY TO UNLOCK YOUR SURPRISE ]"
          style={{ fontSize: '0.6rem', color: 'var(--pink)' }}
        />
      </div>

      {/* Day Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
          marginBottom: '40px',
        }}
      >
        {days.map((day) => (
          <DayReveal key={day.id} day={day} />
        ))}
      </div>

      {/* Love Calculator Preview */}
      <div
        style={{
          background: 'var(--bg-panel)',
          border: '2px solid var(--hot-pink)',
          padding: '24px',
          textAlign: 'center',
          marginBottom: '32px',
        }}
      >
        <h2
          className="pixel-text glow-pink"
          style={{ fontSize: '0.8rem', marginBottom: '12px' }}
        >
          💕 LOVE CALCULATOR PREVIEW 💕
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Think you know your compatibility score? The full Love Calculator awaits on Valentine's Day...
        </p>
        <div
          className="led-display animate-pulse"
          style={{ fontSize: '1.5rem', color: 'var(--hot-pink)', textShadow: '0 0 10px var(--hot-pink)' }}
        >
          ??.??%
        </div>
        <p style={{ color: '#555', fontSize: '0.9rem', marginTop: '8px' }}>
          (Spoiler: It's going to be embarrassingly high)
        </p>
      </div>

      {/* Fun stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px',
          marginBottom: '32px',
        }}
      >
        {[
          { label: 'Pixels of Love', value: '∞', color: 'var(--pink)' },
          { label: 'Sarcasm Level', value: '9000+', color: 'var(--cyan)' },
          { label: 'Cringe Factor', value: '💯', color: 'var(--gold)' },
          { label: 'Love Status', value: 'YES', color: 'var(--neon-green)' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              background: '#111',
              border: `1px solid ${color}`,
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '1rem',
                color,
                textShadow: `0 0 10px ${color}`,
              }}
            >
              {value}
            </div>
            <div style={{ fontFamily: 'var(--font-retro)', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div style={{ textAlign: 'center', padding: '20px 0 40px' }}>
        <p style={{ color: '#555', fontSize: '0.9rem' }}>
          Made with 💕 and an unreasonable amount of CSS
        </p>
        <p style={{ color: '#333', fontSize: '0.8rem', marginTop: '4px' }}>
          Best viewed with us together 😊
        </p>
      </div>
    </div>
  );
}
