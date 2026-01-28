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
      {/* Profile Header */}
      <div className="gradient-teal px-4 pt-8 pb-12">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Pembaca</h1>
            <p className="text-white/80 text-sm">pembaca@email.com</p>
            <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white">
              Member Premium
            </span>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="mx-4 -mt-6 bg-card rounded-2xl p-4 shadow-card animate-fade-up">
        <div className="grid grid-cols-3 gap-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <div className="w-10 h-10 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <p className="font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 mt-6 space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {menuItems.map(({ icon: Icon, label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="w-full flex items-center justify-between p-4 bg-card rounded-xl hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-foreground" />
              </div>
              <span className="font-medium text-foreground">{label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-4 bg-card rounded-xl hover:bg-destructive/10 transition-colors mt-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
              <LogOut className="w-5 h-5 text-destructive" />
            </div>
            <span className="font-medium text-destructive">Keluar</span>
          </div>
        </button>
      </div>

      {/* App Version */}
      <p className="text-center text-xs text-muted-foreground mt-8">
        BookBridge v1.0.0
      </p>

      <BottomNav />
    </div>
  );
};

export default AccountPage;
