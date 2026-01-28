import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronRight, ShoppingCart } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import BookCard from '@/components/BookCard';
import BottomNav from '@/components/BottomNav';
import { books } from '@/data/books';
import { useCart } from '@/hooks/use-cart';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();

  const popularBooks = books.filter((book) => book.isPopular);
  const bestSellers = books.filter((book) => book.isBestSeller);
  const freeBooks = books.filter((book) => book.isFree);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-4 pt-4 pb-4 sticky top-0 bg-background/95 backdrop-blur-sm z-40">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Selamat datang,</p>
            <h1 className="text-xl font-bold text-foreground">Pembaca 📚</h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/cart')}
              className="relative p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="relative p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
          </div>
        </div>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onFocus={() => navigate('/explore')}
        />
      </header>

      {/* Content */}
      <main className="px-4 space-y-6">
        {/* Popular Section */}
        <section className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Terpopuler</h2>
            <button className="flex items-center text-sm text-primary font-medium hover:underline">
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
            {popularBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => navigate(`/book/${book.id}`)}
              />
            ))}
          </div>
        </section>

        {/* Best Seller Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Best Seller</h2>
            <button className="flex items-center text-sm text-primary font-medium hover:underline">
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
            {bestSellers.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => navigate(`/book/${book.id}`)}
              />
            ))}
          </div>
        </section>

        {/* Free Books Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Baca Gratis</h2>
            <button className="flex items-center text-sm text-primary font-medium hover:underline">
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
            {freeBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => navigate(`/book/${book.id}`)}
              />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default HomePage;
