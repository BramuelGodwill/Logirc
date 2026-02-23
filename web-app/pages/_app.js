import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuthStore } from '../store/authStore';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, []);

  useEffect(() => {
    // Redirect to login if not authenticated
    const publicRoutes = ['/', '/login', '/signup'];
    if (mounted && !isAuthenticated && !publicRoutes.includes(router.pathname)) {
      router.push('/login');
    }
  }, [isAuthenticated, router.pathname, mounted]);

  const isAuthPage = router.pathname === '/login' || router.pathname === '/signup' || router.pathname === '/';

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Logirc AI - Your Vision, Our Code</title>
        <meta name="description" content="Logirc AI Chat - Logic meets creativity. Innovation, Simplified." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isAuthPage ? (
        <Component {...pageProps} />
      ) : (
        <div className="flex h-screen overflow-hidden bg-dark-950">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            
            <main className="flex-1 overflow-y-auto custom-scrollbar">
              <Component {...pageProps} />
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default MyApp;
