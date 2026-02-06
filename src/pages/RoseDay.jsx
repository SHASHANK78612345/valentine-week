import { useState, useCallback } from 'react';
import RetroWindow from '../components/retro/RetroWindow';
import { roseCompliments } from '../data/compliments';
import { fireConfettiCannon } from '../components/particles/ConfettiExplosion';

const GRID_SIZE = 5;
const STAGES = ['🟫', '🌱', '🌿', '🌷', '🌹'];
const STAGE_NAMES = ['Soil', 'Sprout', 'Stem', 'Bud', 'Bloom!'];

function getRandomCompliment(usedSet) {
  const available = roseCompliments.filter((_, i) => !usedSet.has(i));
  if (available.length === 0) return roseCompliments[Math.floor(Math.random() * roseCompliments.length)];
  const idx = Math.floor(Math.random() * available.length);
  return available[idx];
}

export default function RoseDay() {
  const [grid, setGrid] = useState(() =>
    Array(GRID_SIZE * GRID_SIZE).fill(null).map(() => ({
      stage: 0,
      growing: false,
      compliment: null,
    }))
  );
  const [usedCompliments] = useState(() => new Set());
  const [bloomCount, setBloomCount] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [hoveredCell, setHoveredCell] = useState(null);

  const plantRose = useCallback((index) => {
    setGrid((prev) => {
      const newGrid = [...prev];
      const cell = { ...newGrid[index] };

      if (cell.stage >= 4 || cell.growing) return prev;

      cell.growing = true;
      newGrid[index] = cell;

      // Animate through stages
      const growStep = (currentStage) => {
        if (currentStage > 4) return;
        setTimeout(() => {
          setGrid((g) => {
            const updated = [...g];
            updated[index] = {
              ...updated[index],
              stage: currentStage,
              growing: currentStage < 4,
              compliment: currentStage === 4 ? getRandomCompliment(usedCompliments) : null,
            };
            if (currentStage === 4) {
              setBloomCount((c) => {
                const newCount = c + 1;
                if (newCount === GRID_SIZE * GRID_SIZE) {
                  setTimeout(() => {
                    setShowComplete(true);
                    fireConfettiCannon();
                  }, 300);
                }
                return newCount;
              });
            }
            return updated;
          });
          growStep(currentStage + 1);
        }, 600);
      };

      growStep(cell.stage + 1);
      return newGrid;
    });
  }, [usedCompliments]);

  return (
    <div className="container" style={{ maxWidth: 800 }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1
          className="pixel-text"
          style={{ fontSize: 'clamp(0.8rem, 3vw, 1.2rem)', color: '#ff4444', marginBottom: '8px' }}
        >
          🌹 Day 1: Rose Day 🌹
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Click the soil to plant pixel roses. Each bloom reveals a compliment!
        </p>
      </header>

      <RetroWindow
        title="pixel_rose_garden.exe"
        statusBar={`Roses bloomed: ${bloomCount}/${GRID_SIZE * GRID_SIZE}`}
      >
        <div
          style={{
            background: '#0a1a0a',
            padding: '16px',
            border: '2px inset #333',
          }}
        >
          {/* Progress bar */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: 'var(--neon-green)', fontFamily: 'var(--font-retro)', fontSize: '0.9rem' }}>
                Garden Progress
              </span>
              <span style={{ color: 'var(--neon-green)', fontFamily: 'var(--font-retro)', fontSize: '0.9rem' }}>
                {Math.round((bloomCount / (GRID_SIZE * GRID_SIZE)) * 100)}%
              </span>
            </div>
            <div className="neon-progress" style={{ borderColor: 'var(--neon-green)' }}>
              <div
                className="neon-progress-bar"
                style={{
                  width: `${(bloomCount / (GRID_SIZE * GRID_SIZE)) * 100}%`,
                  background: 'linear-gradient(90deg, #22cc22, #39ff14)',
                  boxShadow: '0 0 10px var(--neon-green)',
                }}
              />
            </div>
          </div>

          {/* Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gap: '4px',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            {grid.map((cell, i) => (
              <div
                key={i}
                onClick={() => plantRose(i)}
                onMouseEnter={() => setHoveredCell(i)}
                onMouseLeave={() => setHoveredCell(null)}
                style={{
                  aspectRatio: '1',
                  background: cell.stage === 0
                    ? 'repeating-conic-gradient(#3a2a1a 0% 25%, #2a1a0a 0% 50%) 50% / 8px 8px'
                    : '#1a3a1a',
                  border: `2px solid ${cell.stage === 4 ? '#ff4444' : '#333'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                  cursor: cell.stage < 4 ? 'pointer' : 'default',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  transform: cell.growing ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: cell.stage === 4 ? '0 0 10px #ff444444' : 'none',
                }}
              >
                {STAGES[cell.stage]}
                {/* Tooltip */}
                {cell.compliment && hoveredCell === i && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 'calc(100% + 8px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#000',
                      border: '1px solid var(--pink)',
                      color: 'var(--pink)',
                      padding: '8px 12px',
                      fontFamily: 'var(--font-retro)',
                      fontSize: '0.85rem',
                      zIndex: 50,
                      maxWidth: '280px',
                      whiteSpace: 'normal',
                      textAlign: 'center',
                      lineHeight: 1.4,
                    }}
                  >
                    {cell.compliment}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Stage legend */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '12px',
              flexWrap: 'wrap',
            }}
          >
            {STAGES.map((emoji, i) => (
              <span
                key={i}
                style={{
                  color: 'var(--neon-green)',
                  fontFamily: 'var(--font-retro)',
                  fontSize: '0.85rem',
                }}
              >
                {emoji} {STAGE_NAMES[i]}
              </span>
            ))}
          </div>
        </div>
      </RetroWindow>

      {/* Completion message */}
      {showComplete && (
        <div
          className="animate-fade-in-scale"
          style={{
            background: 'var(--bg-panel)',
            border: '2px solid var(--neon-green)',
            padding: '24px',
            textAlign: 'center',
            marginTop: '24px',
          }}
        >
          <h2 className="pixel-text glow-green" style={{ fontSize: '0.8rem', marginBottom: '12px' }}>
            🌹 GARDEN COMPLETE! 🌹
          </h2>
          <p style={{ color: 'var(--neon-green)', fontSize: '1.2rem' }}>
            You grew 25 beautiful pixel roses! Now go touch some real grass. 🌿
          </p>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            (Hover over each rose to read your compliments)
          </p>
        </div>
      )}
    </div>
  );
}
