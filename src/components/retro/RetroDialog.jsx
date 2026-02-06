export default function RetroDialog({ title = 'Dialog', icon = '⚠️', message, children, buttons, style }) {
  return (
    <div className="win98-window" style={{ maxWidth: 400, margin: '0 auto', ...style }}>
      <div className="win98-titlebar">
        <span>{title}</span>
        <div className="win98-titlebar-buttons">
          <button className="win98-titlebar-btn">×</button>
        </div>
      </div>
      <div className="win98-body" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <span style={{ fontSize: '2rem', flexShrink: 0 }}>{icon}</span>
        <div style={{ flex: 1 }}>
          {message && <p style={{ margin: '0 0 12px', color: '#000' }}>{message}</p>}
          {children}
        </div>
      </div>
      {buttons && (
        <div style={{ padding: '0 12px 12px', display: 'flex', gap: 8, justifyContent: 'center' }}>
          {buttons}
        </div>
      )}
    </div>
  );
}
