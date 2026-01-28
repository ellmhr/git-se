import { useState, useEffect } from 'react';

const PURCHASED_STORAGE_KEY = 'bookbridge_purchased';

export const usePurchasedBooks = () => {
  const [purchasedBooks, setPurchasedBooks] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(PURCHASED_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(PURCHASED_STORAGE_KEY, JSON.stringify(purchasedBooks));
  }, [purchasedBooks]);

  const addPurchasedBook = (bookId: string) => {
    setPurchasedBooks(prev => {
      if (prev.includes(bookId)) return prev;
      return [...prev, bookId];
    });
  };

  const addPurchasedBooks = (bookIds: string[]) => {
    setPurchasedBooks(prev => {
      const newIds = bookIds.filter(id => !prev.includes(id));
      return [...prev, ...newIds];
    });
  };

  const isPurchased = (bookId: string) => {
    return purchasedBooks.includes(bookId);
  };

  const canRead = (bookId: string, isFree: boolean) => {
    return isFree || purchasedBooks.includes(bookId);
  };

  return {
    purchasedBooks,
    addPurchasedBook,
    addPurchasedBooks,
    isPurchased,
    canRead,
  };
};
