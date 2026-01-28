import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid3X3, List, X } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import BookCard from '@/components/BookCard';
import BottomNav from '@/components/BottomNav';
import { books, categories, popularSearches } from '@/data/books';

const ExplorePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Novel',
    'Fantasi',
    'Crime',
    'Romance',
  ]);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Semua' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query)) {
      setRecentSearches((prev) => [query, ...prev.slice(0, 4)]);
    }
  };

  const removeRecentSearch = (search: string) => {
    setRecentSearches((prev) => prev.filter((s) => s !== search));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-4 pt-4 pb-4 sticky top-0 bg-background/95 backdrop-blur-sm z-40">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground">Jelajahi</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Cari buku, penulis, kategori..."
        />

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-4 -mx-4 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`tag-chip whitespace-nowrap ${
                selectedCategory === category ? 'active' : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4">
        {!searchQuery ? (
          <div className="space-y-6 animate-fade-in">
            {/* Popular Searches */}
            <section>
              <h3 className="font-semibold text-foreground mb-3">Pencarian Populer</h3>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
                {books.slice(0, 5).map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    variant="compact"
                    onClick={() => navigate(`/book/${book.id}`)}
                  />
                ))}
              </div>
            </section>

            {/* Recent Searches */}
            <section>
              <h3 className="font-semibold text-foreground mb-3">Pencarian Terbaru</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search) => (
                  <button
                    key={search}
                    className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm text-muted-foreground hover:bg-muted/80 transition-colors"
                    onClick={() => setSearchQuery(search)}
                  >
                    {search}
                    <X
                      className="w-4 h-4 hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(search);
                      }}
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* Popular Keywords */}
            <section>
              <h3 className="font-semibold text-foreground mb-3">Kata Kunci Populer</h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => setSearchQuery(keyword)}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="animate-fade-in">
            <p className="text-sm text-muted-foreground mb-4">
              {filteredBooks.length} hasil ditemukan
            </p>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 gap-4">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onClick={() => navigate(`/book/${book.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    variant="horizontal"
                    onClick={() => navigate(`/book/${book.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default ExplorePage;
