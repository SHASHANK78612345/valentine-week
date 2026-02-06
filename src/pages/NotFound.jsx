import { Link } from 'react-router-dom';
import RetroWindow from '../components/retro/RetroWindow';

export default function NotFound() {
  return (
    <div className="container text-center" style={{ paddingTop: '60px' }}>
      <RetroWindow title="404_love_not_found.exe">
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>💔</div>
          <h1
            className="pixel-text"
            style={{ fontSize: '1.2rem', color: 'var(--hot-pink)', marginBottom: '16px' }}
          >
            ERROR 404: LOVE NOT FOUND
          </h1>
          <p style={{ color: '#000', marginBottom: '24px', fontSize: '1.3rem' }}>
            The page you're looking for has been lost in the void of cyberspace.
            <br />
            Maybe it ran away like the "No" button on Propose Day?
          </p>
          <Link to="/">
            <button className="win98-btn win98-btn--primary">
              ← Return to Love HQ
            </button>
          </Link>
        </div>
      </RetroWindow>
    </div>
  );
}
