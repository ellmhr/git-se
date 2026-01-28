import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, BookOpen, Calendar, Building2, FileText, Globe, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { books } from '@/data/books';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import { usePurchasedBooks } from '@/hooks/use-purchased-books';
import PreviewModal from '@/components/PreviewModal';

const BookDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { addToCart, isInCart } = useCart();
  const { canRead, isPurchased } = usePurchasedBooks();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Buku tidak ditemukan</p>
      </div>
    );
  }

  const hasReadAccess = canRead(book.id, book.isFree || false);
  const alreadyInCart = isInCart(book.id);
  const alreadyPurchased = isPurchased(book.id);

  const formatPrice = (price: number) => {
    if (price === 0) return 'Rp0';
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  const handleAddToCart = () => {
    if (alreadyInCart) {
      navigate('/cart');
      return;
    }
    addToCart(book);
    toast({
      title: 'Ditambahkan ke Keranjang',
      description: `${book.title} berhasil ditambahkan`,
    });
  };

  const handleReadNow = () => {
    if (hasReadAccess) {
      navigate(`/reader/${book.id}`);
    } else {
      toast({
        title: 'Akses Diperlukan',
        description: 'Beli buku ini untuk membaca selengkapnya',
        variant: 'destructive',
      });
    }
  };

  const handlePreviewEnd = () => {
    setShowPreview(false);
    if (hasReadAccess) {
      navigate(`/reader/${book.id}`);
    } else if (!alreadyInCart) {
      handleAddToCart();
    } else {
      navigate('/cart');
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? 'Dihapus' : 'Ditambahkan',
      description: isWishlisted
        ? 'Buku dihapus dari wishlist'
        : 'Buku ditambahkan ke wishlist',
    });
  };

  const bookInfo = [
    { icon: Globe, label: 'Bahasa', value: book.language },
    { icon: Calendar, label: 'Terbit', value: book.releaseDate },
    { icon: Building2, label: 'Penerbit', value: book.publisher },
    { icon: FileText, label: 'Halaman', value: `${book.pages} hal` },
    { icon: BookOpen, label: 'Format', value: book.format },
  ];

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between glass-effect">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-background/50 hover:bg-background transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleWishlist}
            className="p-2 rounded-xl bg-background/50 hover:bg-background transition-colors"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isWishlisted ? 'fill-destructive text-destructive' : 'text-foreground'
              }`}
            />
          </button>
          <button className="p-2 rounded-xl bg-background/50 hover:bg-background transition-colors">
            <Share2 className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </header>

      {/* Book Cover */}
      <div className="pt-16 px-4 pb-6 bg-gradient-to-b from-primary/5 to-background">
        <div className="flex flex-col items-center animate-fade-up">
          <img
            src={book.cover}
            alt={book.title}
            className="w-48 h-72 object-cover rounded-2xl shadow-elevated"
          />
          <div className="mt-6 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-1">{book.title}</h1>
            <p className="text-muted-foreground">{book.author}</p>
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-foreground">{book.rating}</span>
            </div>
            <span className="text-muted-foreground text-sm">
              ({book.reviews.toLocaleString()} ulasan)
            </span>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-center gap-2">
            <span className={`text-2xl font-bold ${book.isFree ? 'text-primary' : 'text-foreground'}`}>
              {formatPrice(book.price)}
            </span>
            {book.originalPrice && (
              <span className="text-muted-foreground line-through">
                {formatPrice(book.originalPrice)}
              </span>
            )}
          </div>

          {/* Badges */}
          <div className="flex gap-2 mt-4 flex-wrap justify-center">
            <span className="format-badge">{book.format}</span>
            {book.isFree && (
              <span className="price-badge">GRATIS</span>
            )}
            {book.isBestSeller && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-amber-500/10 text-amber-600">
                BEST SELLER
              </span>
            )}
            {alreadyPurchased && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary">
                <Check className="w-3 h-3 mr-1" />
                DIMILIKI
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <section className="px-4 py-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="font-bold text-foreground mb-3">Deskripsi Buku</h2>
        <p className={`text-muted-foreground text-sm leading-relaxed ${!isDescriptionExpanded ? 'line-clamp-3' : ''}`}>
          {book.description}
        </p>
        <button
          onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          className="text-primary text-sm font-medium mt-2 hover:underline"
        >
          {isDescriptionExpanded ? 'Tutup' : 'Baca Selengkapnya'}
        </button>
      </section>

      {/* Book Info Table */}
      <section className="px-4 py-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="font-bold text-foreground mb-3">Informasi Buku</h2>
        <div className="bg-muted/50 rounded-2xl p-4 space-y-3">
          {bookInfo.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
              <span className="text-sm font-medium text-foreground">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border glass-effect">
        <div className="flex gap-3 max-w-md mx-auto">
          <Button 
            variant="outline" 
            size="lg" 
            className="flex-1"
            onClick={() => setShowPreview(true)}
          >
            Baca Preview
          </Button>
          
          {hasReadAccess ? (
            <Button size="lg" className="flex-1" onClick={handleReadNow}>
              <BookOpen className="w-4 h-4 mr-2" />
              Baca Sekarang
            </Button>
          ) : alreadyInCart ? (
            <Button size="lg" className="flex-1" onClick={() => navigate('/cart')}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Lihat Keranjang
            </Button>
          ) : (
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Tambah ke Keranjang
            </Button>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        book={book}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onReadFull={handlePreviewEnd}
      />
    </div>
  );
};

export default BookDetailPage;
