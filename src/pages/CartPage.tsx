import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  const formatPrice = (price: number) => {
    if (price === 0) return 'Rp0';
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 px-4 py-3 flex items-center gap-3 glass-effect border-b border-border">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-bold text-lg text-foreground">Keranjang</h1>
        </header>

        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Keranjang Kosong</h2>
          <p className="text-muted-foreground mb-6">Belum ada buku yang ditambahkan ke keranjang</p>
          <Button onClick={() => navigate('/explore')}>
            Jelajahi Buku
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between glass-effect border-b border-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-bold text-lg text-foreground">Keranjang ({items.length})</h1>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-destructive hover:underline"
        >
          Hapus Semua
        </button>
      </header>

      {/* Cart Items */}
      <div className="p-4 space-y-4">
        {items.map(({ book, quantity }) => (
          <div
            key={book.id}
            className="flex gap-4 p-4 bg-card rounded-2xl shadow-card animate-fade-in"
          >
            <img
              src={book.cover}
              alt={book.title}
              className="w-20 h-28 object-cover rounded-xl"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{book.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
              <p className="font-bold text-primary">{formatPrice(book.price)}</p>
              
              {/* Quantity Controls */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(book.id, quantity - 1)}
                    className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(book.id, quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(book.id)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border glass-effect">
        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground">Total Pembayaran</span>
          <span className="text-2xl font-bold text-foreground">{formatPrice(totalPrice)}</span>
        </div>
        <Button 
          size="lg" 
          className="w-full"
          onClick={() => navigate('/checkout')}
        >
          Checkout ({items.length} buku)
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
