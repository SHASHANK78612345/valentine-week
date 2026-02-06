import { useCountdown } from '../../hooks/useCountdown';

export default function CountdownTimer({ targetDate, compact = false }) {
  const { days, hours, minutes, seconds, isUnlocked } = useCountdown(targetDate);

  if (isUnlocked) {
    return (
      <span style={{ color: 'var(--neon-green)', fontFamily: 'var(--font-pixel)', fontSize: compact ? '0.5rem' : '0.6rem' }}>
        ✓ UNLOCKED
      </span>
    );
  }

  const pad = (n) => String(n).padStart(2, '0');

  if (compact) {
    return (
      <span
        className="led-display"
        style={{ fontSize: '0.6rem', padding: '4px 8px', letterSpacing: '2px' }}
      >
        {days > 0 ? `${days}d ` : ''}{pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </span>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
      {[
        { label: 'DAYS', value: pad(days) },
        { label: 'HRS', value: pad(hours) },
        { label: 'MIN', value: pad(minutes) },
        { label: 'SEC', value: pad(seconds) },
      ].map(({ label, value }) => (
        <div key={label} style={{ textAlign: 'center' }}>
          <div className="led-display" style={{ fontSize: '1.2rem', minWidth: 50 }}>
            {value}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.4rem',
              color: 'var(--text-secondary)',
              marginTop: 4,
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
