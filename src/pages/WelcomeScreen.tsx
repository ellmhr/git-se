import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col py-12">
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Book Illustration */}
          <div className="relative w-64 h-64 mb-8 animate-fade-up">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-primary/20 rounded-full blur-xl" />

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-52 bg-primary/10 rounded-2xl rotate-[-5deg] transform-gpu" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-52 bg-primary/20 rounded-2xl rotate-[3deg] transform-gpu" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-52 bg-gradient-to-br from-primary to-teal-dark rounded-2xl shadow-elevated flex flex-col items-center justify-center p-4">
              <div className="w-full h-1 bg-white/30 rounded-full mb-3" />
              <div className="w-3/4 h-1 bg-white/20 rounded-full mb-3" />
              <div className="w-full h-1 bg-white/30 rounded-full mb-3" />
              <div className="w-2/3 h-1 bg-white/20 rounded-full mb-6" />
              <div className="w-12 h-12 bg-white/20 rounded-xl" />
            </div>
          </div>

          <h2
            className="text-2xl font-bold text-foreground text-center mb-3 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            Selamat Datang di BookBridge
          </h2>

          <p
            className="text-muted-foreground text-center mb-10 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            Temukan ribuan buku digital dan akses perpustakaan dimanapun kamu berada
          </p>
        </div>

        <div
          className="space-y-3 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <Button
            variant="welcome"
            size="lg"
            onClick={() => navigate('/register')}
            className="w-full rounded-xl"
          >
            Daftar
          </Button>

          <Button
            variant="welcomeOutline"
            size="lg"
            onClick={() => navigate('/login')}
            className="w-full rounded-xl"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
