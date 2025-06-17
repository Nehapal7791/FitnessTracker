import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, HomeIcon, UserIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import type { JSX } from 'react/jsx-runtime';

interface LayoutProps {
  children: ReactNode;
}

interface NavigationLink {
  name: string;
  path: string;
  icon: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isDesktop = windowWidth >= 1024;

  // Define navigation links
  const navigationLinks: NavigationLink[] = [
    {
      name: 'Home',
      path: '/',
      icon: <HomeIcon className="w-6 h-6" />
    },
    {
      name: 'Diet',
      path: '/diet',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    },
    {
      name: 'Progress',
      path: '/progress',
      icon: <ChartBarIcon className="w-6 h-6" />
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <UserIcon className="w-6 h-6" />
    }
  ];

  // const isActive = (path: string) => {
  //   if (path === '/' && location.pathname === '/') return true;
  //   return location.pathname.startsWith(path) && path !== '/';
  // };

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      {isDesktop && (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg p-4 hidden lg:block overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Spocademy</h1>
          </div>

          <nav className="space-y-2">
            {navigationLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex items-center px-4 py-3 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-orange-100 text-orange-600 shadow-sm' 
                      : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500'}
                  `}
                >
                  <span className="mr-3">{link.icon}</span>
                  <span className="font-medium">{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
      )}

      {/* Mobile header with hamburger menu */}
      {!isDesktop && (
        <header className="fixed top-0 left-0 right-0 h-16 px-4 bg-white shadow-md flex items-center justify-between z-20">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-full hover:bg-orange-100 focus:outline-none"
            >
              <Bars3Icon className="w-6 h-6 text-white hover:text-orange-600" />
            </button>
            <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Spocademy</h1>
          </div>
          <div>
            {/* Additional header icons/actions can go here */}
          </div>
        </header>
      )}

      {/* Mobile slide-over menu */}
      {!isDesktop && isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-30" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl z-40" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 flex justify-between">
              <h2 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Spocademy</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-orange-100">
                <XMarkIcon className="w-6 h-6 text-orange-500" />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              {navigationLinks.map(link => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      flex items-center px-4 py-3 rounded-lg transition-all
                      ${isActive 
                        ? 'bg-orange-100 text-orange-600 shadow-sm' 
                        : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500'}
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3">{link.icon}</span>
                    <span className="font-medium">{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      <div className={`flex-1 flex flex-col ${isDesktop ? 'ml-64' : ''} min-h-0`}>
        {/* Main content area */}
        <main className={`flex-1 ${!isDesktop ? 'pt-16 pb-16' : 'overflow-y-auto'}`}>
          <div className="w-full h-full">
            <div className="w-full">
              {children}
            </div>
          </div>
        </main>

        {/* Mobile bottom navigation */}
        {!isDesktop && (
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around h-16 z-20 shadow-lg">
            {navigationLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex flex-col items-center justify-center w-full
                    ${isActive ? 'text-orange-500' : 'text-gray-500'}
                  `}
                >
                  <span className="h-6 w-6">{link.icon}</span>
                  <span className="text-xs mt-1">{link.name}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Layout;
