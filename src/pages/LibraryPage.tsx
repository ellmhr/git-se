import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Download, Heart, Play } from 'lucide-react';
import BookCard from '@/components/BookCard';
import BottomNav from '@/components/BottomNav';
import { books } from '@/data/books';
import { usePurchasedBooks } from '@/hooks/use-purchased-books';
import { Button } from '@/components/ui/button';

type TabType = 'reading' | 'purchased' | 'wishlist' | 'downloaded';

const LibraryPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('reading');
  const { purchasedBooks, canRead } = usePurchasedBooks();

  const tabs = [
    { id: 'reading' as TabType, label: 'Sedang Dibaca', icon: BookOpen },
    { id: 'purchased' as TabType, label: 'Dimiliki', icon: Clock },
    { id: 'wishlist' as TabType, label: 'Wishlist', icon: Heart },
    { id: 'downloaded' as TabType, label: 'Unduhan', icon: Download },
  ];

  // Get reading progress from localStorage
  const getReadingProgress = (bookId: string): number => {
    const progress = localStorage.getItem(`reading_progress_${bookId}`);
    if (progress) {
      const currentPage = parseInt(progress, 10);
      // Assuming 5 pages per book for demo
      return Math.round(((currentPage + 1) / 5) * 100);
    }
    return 0;
  };

  // Books currently being read (have progress)
  const readingBooks = books.filter(book => {
    const progress = localStorage.getItem(`reading_progress_${book.id}`);
    return progress !== null && canRead(book.id, book.isFree || false);
  });

  // Purchased + free books
  const ownedBooks = books.filter(book => 
    purchasedBooks.includes(book.id) || book.isFree
  );

  // Mock wishlist
  const wishlistBooks = books.slice(4, 7);
  
  // Mock downloads
  const downloadedBooks = books.slice(1, 3);

  const libraryData = {
    reading: readingBooks.length > 0 ? readingBooks : books.slice(0, 2).filter(b => canRead(b.id, b.isFree || false)),
    purchased: ownedBooks,
    wishlist: wishlistBooks,
    downloaded: downloadedBooks,
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-foreground mb-4">Perpustakaan</h1>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {id === 'purchased' && ownedBooks.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-white/20 rounded-full">
                  {ownedBooks.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 mt-4">
        {libraryData[activeTab].length > 0 ? (
          <div className="space-y-3 animate-fade-in">
            {libraryData[activeTab].map((book) => (
              <div key={book.id} className="relative">
                <BookCard
                  book={book}
                  variant="horizontal"
                  onClick={() => navigate(`/book/${book.id}`)}
                />
                {/* Continue Reading Button for reading tab */}
                {activeTab === 'reading' && canRead(book.id, book.isFree || false) && (
                  <Button
                    size="sm"
                    className="absolute bottom-4 right-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/reader/${book.id}`);
                    }}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Lanjutkan
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Belum ada buku</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              {activeTab === 'purchased' 
                ? 'Beli buku untuk menambahkan ke koleksimu'
                : 'Mulai jelajahi dan tambahkan buku ke perpustakaanmu'
              }
            </p>
            <Button onClick={() => navigate('/explore')}>
              Jelajahi Buku
            </Button>
          </div>
        )}

        {/* Reading Progress Card */}
        {activeTab === 'reading' && libraryData.reading.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl animate-fade-in">
            <h3 className="font-semibold text-foreground mb-3">Progress Membaca</h3>
            {libraryData.reading.slice(0, 1).map((book) => {
              const progress = getReadingProgress(book.id);
              return (
                <div key={book.id} className="flex items-center gap-3">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground line-clamp-1">{book.title}</p>
                    <p className="text-xs text-muted-foreground">{book.author}</p>
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all" 
                        style={{ width: `${progress || 20}%` }}
                      />
                    </div>
                    <p className="text-xs text-primary mt-1">{progress || 20}% selesai</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => navigate(`/reader/${book.id}`)}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Baca
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default LibraryPage;
