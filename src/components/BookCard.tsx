import React from 'react';
import { Book } from '@/data/books';
import { Star } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onClick?: () => void;
  variant?: 'default' | 'compact' | 'horizontal';
}

const BookCard = React.forwardRef<HTMLDivElement, BookCardProps>(
  ({ book, onClick, variant = 'default' }, ref) => {
    const formatPrice = (price: number) => {
      if (price === 0) return 'Rp0';
      return `Rp${price.toLocaleString('id-ID')}`;
    };

    if (variant === 'horizontal') {
      return (
        <div
          ref={ref}
          onClick={onClick}
          className="book-card flex gap-4 cursor-pointer animate-fade-in"
        >
          <img
            src={book.cover}
            alt={book.title}
            className="w-20 h-28 object-cover rounded-xl flex-shrink-0"
          />
          <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
            <div>
              <h3 className="font-semibold text-foreground line-clamp-2 text-sm">
                {book.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{book.author}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="format-badge">{book.format}</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-xs text-muted-foreground">{book.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-bold text-sm ${book.isFree ? 'text-primary' : 'text-foreground'}`}>
                {formatPrice(book.price)}
              </span>
              {book.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(book.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          onClick={onClick}
          className="cursor-pointer group animate-fade-in"
        >
          <div className="relative overflow-hidden rounded-xl mb-2">
            <img
              src={book.cover}
              alt={book.title}
              className="w-24 h-32 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {book.isFree && (
              <div className="absolute top-1 right-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                GRATIS
              </div>
            )}
          </div>
          <h3 className="font-medium text-foreground text-xs line-clamp-2 leading-tight">
            {book.title}
          </h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">{book.author}</p>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        onClick={onClick}
        className="book-card cursor-pointer group animate-fade-in w-[140px] flex-shrink-0"
      >
        <div className="relative overflow-hidden rounded-xl mb-3">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-[180px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {book.isFree && (
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-lg">
              GRATIS
            </div>
          )}
          {book.isBestSeller && !book.isFree && (
            <div className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
              BEST SELLER
            </div>
          )}
        </div>
        <h3 className="font-semibold text-foreground text-sm line-clamp-2 leading-tight mb-1">
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
        <div className="flex items-center gap-2 mb-2">
          <span className="format-badge">{book.format}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs text-muted-foreground">{book.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-bold text-sm ${book.isFree ? 'text-primary' : 'text-foreground'}`}>
            {formatPrice(book.price)}
          </span>
          {book.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(book.originalPrice)}
            </span>
          )}
        </div>
      </div>
    );
  }
);

BookCard.displayName = 'BookCard';

export default BookCard;
