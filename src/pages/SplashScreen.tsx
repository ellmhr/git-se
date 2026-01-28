import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-teal flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center animate-fade-up">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 animate-float">
          <BookOpen className="w-12 h-12 text-white" strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
          BookBridge
        </h1>
        <p className="text-white/80 text-center mb-12">
          Jembatan menuju dunia literasi
        </p>
      </div>

      <Button
        variant="splash"
        size="xl"
        onClick={() => navigate('/welcome')}
        className="w-full max-w-xs animate-fade-in"
        style={{ animationDelay: '0.3s' }}
      >
        Mulai
      </Button>
    </div>
  );
};

export default SplashScreen;
