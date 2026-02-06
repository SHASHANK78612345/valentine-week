import { useState, useCallback } from 'react';
import RetroWindow from '../components/retro/RetroWindow';

const ACCESSORIES = [
  { id: 'top-hat', emoji: '🎩', name: 'Top Hat', slot: 'head', tooltip: 'For the distinguished teddy of culture' },
  { id: 'crown', emoji: '👑', name: 'Crown', slot: 'head', tooltip: 'Because you deserve royalty (the teddy, I mean)' },
  { id: 'cowboy', emoji: '🤠', name: 'Cowboy Hat', slot: 'head', tooltip: 'Yeehaw! This bear means business' },
  { id: 'bow', emoji: '🎀', name: 'Bow', slot: 'head', tooltip: 'Cute? Check. Adorable? Double check.' },
  { id: 'sunglasses', emoji: '😎', name: 'Sunglasses', slot: 'eyes', tooltip: 'Too cool for the toy shelf' },
  { id: 'glasses', emoji: '🤓', name: 'Nerd Glasses', slot: 'eyes', tooltip: 'Smart AND huggable' },
  { id: 'monocle', emoji: '🧐', name: 'Monocle', slot: 'eyes', tooltip: 'Hmm, yes, quite the sophisticated plushie' },
  { id: 'scarf', emoji: '🧣', name: 'Scarf', slot: 'neck', tooltip: 'For a teddy who runs cold (emotionally stable though)' },
  { id: 'tie', emoji: '👔', name: 'Necktie', slot: 'neck', tooltip: 'Business casual bear reporting for duty' },
  { id: 'bowtie', emoji: '🎀', name: 'Bowtie', slot: 'neck', tooltip: 'Bow ties are cool — the 11th Doctor said so' },
  { id: 'cape', emoji: '🦸', name: 'Cape', slot: 'body', tooltip: 'Not all heroes wear capes. This one does.' },
  { id: 'tutu', emoji: '🩰', name: 'Tutu', slot: 'body', tooltip: 'Pirouette! Plié! Fall over because you\'re a stuffed bear!' },
  { id: 'heart', emoji: '❤️', name: 'Heart', slot: 'hand', tooltip: 'Holding a heart. How on the nose can you get?' },
  { id: 'rose', emoji: '🌹', name: 'Rose', slot: 'hand', tooltip: 'A rose by any other name... is still held by a teddy' },
  { id: 'sword', emoji: '⚔️', name: 'Sword', slot: 'hand', tooltip: 'Sir Teddy of the Round Coffee Table' },
  { id: 'wand', emoji: '🪄', name: 'Magic Wand', slot: 'hand', tooltip: 'Expecto PAW-tronum!' },
];

const SLOT_POSITIONS = {
  head: { top: '2%', left: '50%', transform: 'translateX(-50%)' },
  eyes: { top: '18%', left: '50%', transform: 'translateX(-50%)' },
  neck: { top: '35%', left: '50%', transform: 'translateX(-50%)' },
  body: { top: '50%', left: '50%', transform: 'translateX(-50%)' },
  hand: { top: '55%', left: '80%', transform: 'translateX(-50%)' },
};

export default function TeddyDay() {
  const [equipped, setEquipped] = useState({});
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleAccessoryClick = useCallback((accessory) => {
    setSelectedAccessory((prev) => (prev?.id === accessory.id ? null : accessory));
  }, []);

  const handleSlotClick = useCallback((slot) => {
    if (selectedAccessory && selectedAccessory.slot === slot) {
      setEquipped((prev) => ({ ...prev, [slot]: selectedAccessory }));
      setSelectedAccessory(null);
    }
  }, [selectedAccessory]);

  const handleTeddyClick = useCallback(() => {
    if (selectedAccessory) {
      setEquipped((prev) => ({ ...prev, [selectedAccessory.slot]: selectedAccessory }));
      setSelectedAccessory(null);
    }
  }, [selectedAccessory]);

  const removeAccessory = useCallback((slot) => {
    setEquipped((prev) => {
      const next = { ...prev };
      delete next[slot];
      return next;
    });
  }, []);

  const equippedCount = Object.keys(equipped).length;

  return (
    <div className="container" style={{ maxWidth: 900 }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1
          className="pixel-text"
          style={{ fontSize: 'clamp(0.8rem, 3vw, 1.2rem)', color: '#DEB887', marginBottom: '8px' }}
        >
          🧸 Day 4: Teddy Day 🧸
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {selectedAccessory
            ? `Click on the teddy to place: ${selectedAccessory.emoji} ${selectedAccessory.name}`
            : 'Select an accessory, then click the teddy to dress it up!'}
        </p>
      </header>

      <div className="two-panel-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'start' }}>
        {/* Teddy Display */}
        <RetroWindow title="teddy_dresser.exe" statusBar={`Accessories: ${equippedCount}/5 slots`}>
          <div
            onClick={handleTeddyClick}
            style={{
              background: '#1a1020',
              padding: '20px',
              border: '2px inset #333',
              position: 'relative',
              minHeight: '350px',
              cursor: selectedAccessory ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Teddy bear built from emoji */}
            <div style={{ position: 'relative', width: '200px', height: '300px' }}>
              {/* Base teddy */}
              <div style={{
                fontSize: '8rem',
                textAlign: 'center',
                lineHeight: 1,
                filter: 'drop-shadow(0 0 10px rgba(222,184,135,0.3))',
                userSelect: 'none',
              }}>
                🧸
              </div>

              {/* Equipped accessories */}
              {Object.entries(equipped).map(([slot, acc]) => (
                <div
                  key={slot}
                  onClick={(e) => { e.stopPropagation(); removeAccessory(slot); }}
                  style={{
                    position: 'absolute',
                    ...SLOT_POSITIONS[slot],
                    fontSize: '2.5rem',
                    cursor: 'pointer',
                    zIndex: 10,
                    filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))',
                    transition: 'transform 0.2s',
                  }}
                  title={`Click to remove ${acc.name}`}
                  className="animate-pop-in"
                >
                  {acc.emoji}
                </div>
              ))}

              {/* Slot indicators when accessory selected */}
              {selectedAccessory && !equipped[selectedAccessory.slot] && (
                <div
                  onClick={(e) => { e.stopPropagation(); handleSlotClick(selectedAccessory.slot); }}
                  style={{
                    position: 'absolute',
                    ...SLOT_POSITIONS[selectedAccessory.slot],
                    width: '50px',
                    height: '50px',
                    border: '2px dashed var(--cyan)',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    zIndex: 5,
                  }}
                  className="animate-pulse"
                />
              )}
            </div>
          </div>
        </RetroWindow>

        {/* Accessories Panel */}
        <RetroWindow title="accessories.dll" statusBar="Tap an item, then tap the teddy">
          <div style={{ background: '#1a1020', padding: '12px', border: '2px inset #333' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
              }}
            >
              {ACCESSORIES.map((acc) => {
                const isEquipped = Object.values(equipped).some((e) => e.id === acc.id);
                const isSelected = selectedAccessory?.id === acc.id;
                return (
                  <div
                    key={acc.id}
                    onClick={() => !isEquipped && handleAccessoryClick(acc)}
                    onMouseEnter={() => setHoveredItem(acc.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      background: isSelected ? '#333' : isEquipped ? '#0a0a0a' : '#1a1a2e',
                      border: `2px solid ${isSelected ? 'var(--cyan)' : isEquipped ? '#333' : '#444'}`,
                      padding: '8px 4px',
                      textAlign: 'center',
                      cursor: isEquipped ? 'default' : 'pointer',
                      opacity: isEquipped ? 0.4 : 1,
                      transition: 'all 0.2s',
                      position: 'relative',
                      boxShadow: isSelected ? '0 0 10px var(--cyan)' : 'none',
                    }}
                  >
                    <div style={{ fontSize: '1.8rem' }}>{acc.emoji}</div>
                    <div style={{
                      fontFamily: 'var(--font-retro)',
                      fontSize: '0.7rem',
                      color: isEquipped ? '#555' : 'var(--text-secondary)',
                      marginTop: '2px',
                    }}>
                      {acc.name}
                    </div>
                    {/* Tooltip */}
                    {hoveredItem === acc.id && !isEquipped && (
                      <div style={{
                        position: 'absolute',
                        bottom: 'calc(100% + 6px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#000',
                        border: '1px solid var(--pink)',
                        color: 'var(--pink)',
                        padding: '4px 8px',
                        fontFamily: 'var(--font-retro)',
                        fontSize: '0.75rem',
                        whiteSpace: 'nowrap',
                        zIndex: 50,
                      }}>
                        {acc.tooltip}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Reset button */}
            {equippedCount > 0 && (
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <button
                  className="retro-btn"
                  onClick={() => setEquipped({})}
                  style={{ fontSize: '0.6rem' }}
                >
                  RESET TEDDY
                </button>
              </div>
            )}
          </div>
        </RetroWindow>
      </div>

      {/* Fun message */}
      {equippedCount >= 3 && (
        <div
          className="animate-fade-in-up"
          style={{
            background: 'var(--bg-panel)',
            border: '2px solid #DEB887',
            padding: '20px',
            textAlign: 'center',
            marginTop: '24px',
          }}
        >
          <p style={{ color: '#DEB887', fontSize: '1.2rem' }}>
            {equippedCount >= 5
              ? '🧸 MAXIMUM DRIP ACHIEVED! This teddy is ready for Fashion Week! 🌟'
              : '🧸 Looking good! Keep accessorizing — this teddy deserves the best! ✨'}
          </p>
        </div>
      )}
    </div>
  );
}
