import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, CreditCard, Wallet, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import { usePurchasedBooks } from '@/hooks/use-purchased-books';
import { useToast } from '@/hooks/use-toast';

type Step = 'info' | 'payment' | 'confirmation';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { addPurchasedBooks } = usePurchasedBooks();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>('info');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const formatPrice = (price: number) => {
    if (price === 0) return 'Rp0';
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  const handleProceedToPayment = () => {
    if (!email || !name) {
      toast({
        title: 'Error',
        description: 'Mohon lengkapi data Anda',
        variant: 'destructive',
      });
      return;
    }
    setStep('payment');
  };

  const handleConfirmOrder = () => {
    if (!paymentMethod) {
      toast({
        title: 'Error',
        description: 'Pilih metode pembayaran',
        variant: 'destructive',
      });
      return;
    }
    
    // Mark books as purchased
    const bookIds = items.map(item => item.book.id);
    addPurchasedBooks(bookIds);
    
    // Clear cart
    clearCart();
    
    setStep('confirmation');
  };

  const paymentMethods = [
    { id: 'gopay', name: 'GoPay', icon: Wallet },
    { id: 'ovo', name: 'OVO', icon: Wallet },
    { id: 'card', name: 'Kartu Kredit/Debit', icon: CreditCard },
    { id: 'transfer', name: 'Transfer Bank', icon: CreditCard },
  ];

  if (items.length === 0 && step !== 'confirmation') {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 px-4 py-3 flex items-center gap-3 glass-effect border-b border-border">
        {step !== 'confirmation' && (
          <button
            onClick={() => step === 'payment' ? setStep('info') : navigate(-1)}
            className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        )}
        <h1 className="font-bold text-lg text-foreground">
          {step === 'info' && 'Informasi Pembeli'}
          {step === 'payment' && 'Pembayaran'}
          {step === 'confirmation' && 'Konfirmasi'}
        </h1>
      </header>

      {/* Step Indicator */}
      {step !== 'confirmation' && (
        <div className="px-4 py-4">
          <div className="flex items-center gap-2">
            <div className={`flex-1 h-1 rounded-full ${step === 'info' || step === 'payment' ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`flex-1 h-1 rounded-full ${step === 'payment' ? 'bg-primary' : 'bg-muted'}`} />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span className={step === 'info' ? 'text-primary font-medium' : ''}>Informasi</span>
            <span className={step === 'payment' ? 'text-primary font-medium' : ''}>Pembayaran</span>
          </div>
        </div>
      )}

      {/* Step: Info */}
      {step === 'info' && (
        <div className="p-4 space-y-6 animate-fade-in">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nama Lengkap
              </label>
              <Input
                type="text"
                placeholder="Masukkan nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl pl-12"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Buku digital akan dikirim ke email ini
              </p>
            </div>
          </div>

          {/* Order Summary Mini */}
          <div className="bg-muted/50 rounded-2xl p-4">
            <h3 className="font-semibold text-foreground mb-3">Ringkasan Pesanan</h3>
            <div className="space-y-2">
              {items.map(({ book, quantity }) => (
                <div key={book.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{book.title} x{quantity}</span>
                  <span className="text-foreground">{formatPrice(book.price * quantity)}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step: Payment */}
      {step === 'payment' && (
        <div className="p-4 space-y-4 animate-fade-in">
          <h3 className="font-semibold text-foreground">Pilih Metode Pembayaran</h3>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                  paymentMethod === method.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <method.icon className="w-6 h-6 text-foreground" />
                </div>
                <span className="flex-1 text-left font-medium text-foreground">{method.name}</span>
                {paymentMethod === method.id && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                {paymentMethod !== method.id && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            ))}
          </div>

          {/* Total */}
          <div className="bg-muted/50 rounded-2xl p-4 mt-6">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Pembayaran</span>
              <span className="text-2xl font-bold text-primary">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Step: Confirmation */}
      {step === 'confirmation' && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Check className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Pembelian Berhasil!</h2>
          <p className="text-muted-foreground mb-6">
            Terima kasih atas pembelian Anda. Buku digital telah ditambahkan ke perpustakaan Anda.
          </p>
          <div className="w-full space-y-3">
            <Button size="lg" className="w-full" onClick={() => navigate('/library')}>
              Lihat Perpustakaan
            </Button>
            <Button variant="outline" size="lg" className="w-full" onClick={() => navigate('/explore')}>
              Lanjut Belanja
            </Button>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      {step === 'info' && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border glass-effect">
          <Button size="lg" className="w-full" onClick={handleProceedToPayment}>
            Lanjut ke Pembayaran
          </Button>
        </div>
      )}

      {step === 'payment' && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border glass-effect">
          <Button size="lg" className="w-full" onClick={handleConfirmOrder}>
            Bayar Sekarang
          </Button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
