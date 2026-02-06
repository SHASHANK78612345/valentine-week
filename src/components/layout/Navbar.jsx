import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { days } from '../../data/days';

function isDayUnlocked(dateStr) {
  return new Date() >= new Date(dateStr + 'T00:00:00');
}

export default function Navbar() {
  const location = useLocation();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d) => {
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <nav className="taskbar">
      <Link to="/" className="taskbar-start">
        <span>💕</span>
        <span>Start</span>
      </Link>

      <div className="taskbar-items">
        <Link
          to="/"
          className={`taskbar-item ${location.pathname === '/' ? 'active' : ''}`}
        >
          🏠 Home
        </Link>
        {days.map((day) => {
          const unlocked = isDayUnlocked(day.date);
          if (unlocked) {
            return (
              <Link
                key={day.id}
                to={day.path}
                className={`taskbar-item ${location.pathname === day.path ? 'active' : ''}`}
              >
                {day.emoji} {day.name}
              </Link>
            );
          }
          return (
            <span
              key={day.id}
              className="taskbar-item"
              style={{ opacity: 0.4, cursor: 'not-allowed' }}
              title={`Unlocks on ${day.date}`}
            >
              🔒 {day.name}
            </span>
          );
        })}
      </div>

      <div className="taskbar-clock">
        <span>💖</span>
        <span>{formatTime(time)}</span>
      </div>
    </nav>
  );
}
