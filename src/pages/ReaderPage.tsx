import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Settings, ChevronLeft, ChevronRight, X, Sun, Moon, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { books } from '@/data/books';
import { getFullContent } from '@/data/book-content';
import { Progress } from '@/components/ui/progress';

type ThemeMode = 'light' | 'sepia' | 'dark';

const ReaderPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('light');

  const book = books.find((b) => b.id === id);
  const content = getFullContent(id || '');
  const totalPages = content.length;
  const progress = ((currentPage + 1) / totalPages) * 100;

  // Save reading progress
  useEffect(() => {
    if (id) {
      localStorage.setItem(`reading_progress_${id}`, currentPage.toString());
    }
  }, [currentPage, id]);

  // Load reading progress
  useEffect(() => {
    if (id) {
      const savedProgress = localStorage.getItem(`reading_progress_${id}`);
      if (savedProgress) {
        setCurrentPage(parseInt(savedProgress, 10));
      }
    }
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Buku tidak ditemukan</p>
      </div>
    );
  }

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'sepia':
        return 'bg-amber-50 text-amber-950';
      case 'dark':
        return 'bg-zinc-900 text-zinc-100';
      default:
        return 'bg-background text-foreground';
    }
  };

  const getHeaderClasses = () => {
    switch (theme) {
      case 'sepia':
        return 'bg-amber-100/90 border-amber-200';
      case 'dark':
        return 'bg-zinc-800/90 border-zinc-700';
      default:
        return 'bg-card/90 border-border';
    }
  };

  return (
    <div className={`min-h-screen ${getThemeClasses()} transition-colors duration-300`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between backdrop-blur-lg border-b ${getHeaderClasses()}`}>
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl hover:bg-black/5 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="text-center flex-1 px-4">
          <h1 className="font-semibold text-sm line-clamp-1">{book.title}</h1>
          <p className="text-xs opacity-60">Halaman {currentPage + 1} dari {totalPages}</p>
        </div>

        <button
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-xl hover:bg-black/5 transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-[60px] left-0 right-0 z-40 px-4">
        <Progress value={progress} className="h-1" />
      </div>

      {/* Content */}
      <main className="pt-20 pb-24 px-6 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <p 
            className="leading-relaxed whitespace-pre-line transition-all duration-200"
            style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
          >
            {content[currentPage]}
          </p>
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className={`fixed bottom-0 left-0 right-0 p-4 backdrop-blur-lg border-t ${getHeaderClasses()}`}>
        <div className="flex items-center justify-between gap-4 max-w-2xl mx-auto">
          <Button
            variant="ghost"
            size="lg"
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="flex-1"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Sebelumnya
          </Button>
          
          <div className="flex items-center gap-2 text-sm opacity-60">
            <Bookmark className="w-4 h-4" />
            {Math.round(progress)}%
          </div>

          <Button
            variant="ghost"
            size="lg"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="flex-1"
          >
            Berikutnya
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </footer>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div 
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowSettings(false)}
          />
          <div className={`relative w-full max-w-lg rounded-t-3xl p-6 animate-slide-in-right ${theme === 'dark' ? 'bg-zinc-800' : 'bg-card'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Pengaturan Baca</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Font Size */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Ukuran Font</label>
              <div className="flex items-center gap-4">
                <span className="text-sm opacity-60">A</span>
                <Slider
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  min={12}
                  max={24}
                  step={1}
                  className="flex-1"
                />
                <span className="text-lg opacity-60">A</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{fontSize}px</p>
            </div>

            {/* Theme */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-3">Tema</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    theme === 'light' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Sun className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Terang</span>
                </button>
                <button
                  onClick={() => setTheme('sepia')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    theme === 'sepia' 
                      ? 'border-primary bg-amber-50' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="w-5 h-5 mx-auto mb-1 rounded-full bg-amber-200" />
                  <span className="text-xs">Sepia</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    theme === 'dark' 
                      ? 'border-primary bg-zinc-700' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Moon className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Gelap</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReaderPage;
