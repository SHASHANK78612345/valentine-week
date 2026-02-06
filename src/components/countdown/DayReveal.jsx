import { Link } from 'react-router-dom';
import { useCountdown } from '../../hooks/useCountdown';
import CountdownTimer from './CountdownTimer';

export default function DayReveal({ day }) {
  const { isUnlocked } = useCountdown(day.date);

  const cardStyle = {
    background: isUnlocked ? 'var(--bg-card)' : '#111',
    border: `2px solid ${isUnlocked ? day.color : '#333'}`,
    borderRadius: 0,
    padding: '16px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    cursor: isUnlocked ? 'pointer' : 'default',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  };

  const hoverStyle = isUnlocked
    ? {
        boxShadow: `0 0 15px ${day.color}40, 0 0 30px ${day.color}20`,
        transform: 'translateY(-2px)',
      }
    : {};

  const content = (
    <div
      style={cardStyle}
      onMouseEnter={(e) => {
        if (isUnlocked) {
          Object.assign(e.currentTarget.style, hoverStyle);
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '';
        e.currentTarget.style.transform = '';
      }}
    >
      {!isUnlocked && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)',
            zIndex: 1,
          }}
        />
      )}
      <div style={{ fontSize: '2rem', position: 'relative', zIndex: 2 }}>
        {isUnlocked ? day.emoji : '🔒'}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.6rem',
          color: isUnlocked ? day.color : '#555',
          position: 'relative',
          zIndex: 2,
        }}
      >
        Day {day.id}: {day.name}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-retro)',
          fontSize: '0.85rem',
          color: isUnlocked ? 'var(--text-secondary)' : '#333',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {isUnlocked ? day.tagline : 'Coming soon...'}
      </div>
      <div style={{ marginTop: 8, position: 'relative', zIndex: 2 }}>
        <CountdownTimer targetDate={day.date} compact />
      </div>
    </div>
  );

  if (isUnlocked) {
    return (
      <Link to={day.path} style={{ textDecoration: 'none', color: 'inherit' }}>
        {content}
      </Link>
    );
  }

  return content;
}
