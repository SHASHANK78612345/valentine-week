export default function RetroWindow({ title = 'untitled', children, style, bodyStyle, statusBar }) {
  return (
    <div className="win98-window" style={{ width: '100%', ...style }}>
      <div className="win98-titlebar">
        <span>{title}</span>
        <div className="win98-titlebar-buttons">
          <button className="win98-titlebar-btn">_</button>
          <button className="win98-titlebar-btn">□</button>
          <button className="win98-titlebar-btn">×</button>
        </div>
      </div>
      <div className="win98-body" style={bodyStyle}>
        {children}
      </div>
      {statusBar && (
        <div className="win98-statusbar">
          <div className="win98-statusbar-section">{statusBar}</div>
        </div>
      )}
    </div>
  );
}
