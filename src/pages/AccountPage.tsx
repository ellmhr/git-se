import { useNavigate } from 'react-router-dom';
import {
  User,
  Settings,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  BookOpen,
  Star,
  Clock,
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const AccountPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: 'Profil Saya', path: '/profile' },
    { icon: CreditCard, label: 'Metode Pembayaran', path: '/payment' },
    { icon: Bell, label: 'Notifikasi', path: '/notifications' },
    { icon: Settings, label: 'Pengaturan', path: '/settings' },
    { icon: HelpCircle, label: 'Bantuan', path: '/help' },
  ];

  const stats = [
    { icon: BookOpen, value: '12', label: 'Buku Dibaca' },
    { icon: Star, value: '8', label: 'Wishlist' },
    { icon: Clock, value: '24h', label: 'Waktu Baca' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-teal px-4 pt-10 pb-16">
        <div className="max-w-5xl mx-auto flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Pembaca</h1>
            <p className="text-white/80 text-sm">pembaca@email.com</p>
            <span className="inline-block mt-3 px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white">
              Member Premium
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4">
        {/* Stats */}
        <div className="-mt-10 bg-card rounded-2xl p-6 shadow-card animate-fade-up">
          <div className="grid grid-cols-3 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xl font-bold text-foreground">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div
          className="mt-8 space-y-3 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          {menuItems.map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="w-full flex items-center justify-between p-5 bg-card rounded-xl hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-muted rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <span className="font-medium text-foreground text-base">
                  {label}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-5 bg-card rounded-xl hover:bg-destructive/10 transition-colors mt-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-destructive/10 rounded-xl flex items-center justify-center">
                <LogOut className="w-5 h-5 text-destructive" />
              </div>
              <span className="font-medium text-destructive text-base">
                Keluar
              </span>
            </div>
          </button>
        </div>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground mt-10">
          BookBridge v1.0.0
        </p>
      </main>

      <BottomNav />
    </div>
  );
};

export default AccountPage;
