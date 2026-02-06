import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingHearts from '../particles/FloatingHearts';

export default function Layout() {
  const [crtEnabled, setCrtEnabled] = useState(true);

  return (
    <>
      <Navbar />
      <FloatingHearts />
      {crtEnabled && <div className="crt-overlay crt-overlay--subtle" />}
      <main className="page-content" style={{ paddingBottom: '40px' }}>
        <Outlet />
      </main>
      <Footer />
      <button
        className="crt-toggle"
        onClick={() => setCrtEnabled(!crtEnabled)}
        title="Toggle CRT effect"
      >
        CRT: {crtEnabled ? 'ON' : 'OFF'}
      </button>
    </>
  );
}
