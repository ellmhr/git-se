import React from 'react';
import { Home, Search, BookOpen, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav = React.forwardRef<HTMLElement>((_, ref) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Beranda', path: '/home' },
    { icon: Search, label: 'Jelajahi', path: '/explore' },
    { icon: BookOpen, label: 'Perpustakaan', path: '/library' },
    { icon: User, label: 'Akun', path: '/account' },
  ];

  return (
    <nav ref={ref} className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 glass-effect">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon
                className={`w-6 h-6 transition-all duration-200 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-xs transition-colors duration-200 ${
                  isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});

BottomNav.displayName = 'BottomNav';

export default BottomNav;
