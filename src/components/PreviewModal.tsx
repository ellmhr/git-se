import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Book } from '@/data/books';
import { getPreviewContent } from '@/data/book-content';

interface PreviewModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  onReadFull: () => void;
}

const PreviewModal = ({ book, isOpen, onClose, onReadFull }: PreviewModalProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const previewContent = getPreviewContent(book.id);
  const totalPages = previewContent.length;

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 max-h-[90vh] bg-card rounded-3xl shadow-elevated animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground text-sm line-clamp-1">{book.title}</h3>
              <p className="text-xs text-muted-foreground">Preview - Halaman {currentPage + 1} dari {totalPages}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[50vh] overflow-y-auto">
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground leading-relaxed whitespace-pre-line text-base">
              {previewContent[currentPage]}
            </p>
          </div>
        </div>

        {/* Preview Limit Notice */}
        <div className="px-6 py-3 bg-primary/5 border-t border-primary/10">
          <p className="text-sm text-primary text-center">
            📖 Ini adalah preview terbatas. {book.isFree ? 'Baca gratis selengkapnya!' : 'Beli atau pinjam untuk membaca selengkapnya.'}
          </p>
        </div>

        {/* Navigation */}
        <div className="sticky bottom-0 p-4 border-t border-border bg-card">
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Sebelumnya
            </Button>
            
            {currentPage === totalPages - 1 ? (
              <Button
                size="sm"
                onClick={onReadFull}
                className="flex-1"
              >
                {book.isFree ? 'Baca Selengkapnya' : 'Beli Buku'}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                className="flex-1"
              >
                Berikutnya
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
