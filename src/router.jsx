import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home'));
const RoseDay = lazy(() => import('./pages/RoseDay'));
const ProposeDay = lazy(() => import('./pages/ProposeDay'));
const ChocolateDay = lazy(() => import('./pages/ChocolateDay'));
const TeddyDay = lazy(() => import('./pages/TeddyDay'));
const PromiseDay = lazy(() => import('./pages/PromiseDay'));
const HugDay = lazy(() => import('./pages/HugDay'));
const KissDay = lazy(() => import('./pages/KissDay'));
const ValentineDay = lazy(() => import('./pages/ValentineDay'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      fontFamily: 'var(--font-pixel)',
      fontSize: '0.8rem',
      color: 'var(--pink)',
    }}>
      <div className="animate-pulse">
        💕 Loading love... 💕
      </div>
    </div>
  );
}

function LazyPage({ Component }) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LazyPage Component={Home} /> },
      { path: 'rose-day', element: <LazyPage Component={RoseDay} /> },
      { path: 'propose-day', element: <LazyPage Component={ProposeDay} /> },
      { path: 'chocolate-day', element: <LazyPage Component={ChocolateDay} /> },
      { path: 'teddy-day', element: <LazyPage Component={TeddyDay} /> },
      { path: 'promise-day', element: <LazyPage Component={PromiseDay} /> },
      { path: 'hug-day', element: <LazyPage Component={HugDay} /> },
      { path: 'kiss-day', element: <LazyPage Component={KissDay} /> },
      { path: 'valentine-day', element: <LazyPage Component={ValentineDay} /> },
      { path: '*', element: <LazyPage Component={NotFound} /> },
    ],
  },
]);
