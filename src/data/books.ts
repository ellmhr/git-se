import lautBerceritaCover from '@/assets/covers/laut-bercerita.jpg';
import bumiCover from '@/assets/covers/bumi.jpg';
import filosofiTerasCover from '@/assets/covers/filosofi-teras.jpg';
import pulangCover from '@/assets/covers/pulang.jpg';
import atomicHabitsCover from '@/assets/covers/atomic-habits.jpg';
import cantikItuLukaCover from '@/assets/covers/cantik-itu-luka.jpg';
import sapiensCover from '@/assets/covers/sapiens.jpg';
import hujanCover from '@/assets/covers/hujan.jpg';
import psychologyOfMoneyCover from '@/assets/covers/psychology-of-money.jpg';
import negeri5MenaraCover from '@/assets/covers/negeri-5-menara.jpg';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  cover: string;
  format: 'PDF' | 'EPUB' | 'Digital';
  rating: number;
  reviews: number;
  description: string;
  language: string;
  releaseDate: string;
  publisher: string;
  pages: number;
  category: string;
  isFree?: boolean;
  isBestSeller?: boolean;
  isPopular?: boolean;
}

export const books: Book[] = [
  {
    id: '1',
    title: 'Laut Bercerita',
    author: 'Leila S. Chudori',
    price: 89000,
    cover: lautBerceritaCover,
    format: 'PDF',
    rating: 4.8,
    reviews: 2341,
    description: 'Novel yang mengisahkan tentang perjuangan aktivis mahasiswa pada era Orde Baru. Sebuah kisah tentang cinta, pengorbanan, dan keberanian menghadapi ketidakadilan.',
    language: 'Indonesia',
    releaseDate: '2017',
    publisher: 'Kepustakaan Populer Gramedia',
    pages: 394,
    category: 'Novel',
    isPopular: true,
    isBestSeller: true,
  },
  {
    id: '2',
    title: 'Bumi',
    author: 'Tere Liye',
    price: 79000,
    cover: bumiCover,
    format: 'Digital',
    rating: 4.9,
    reviews: 5672,
    description: 'Kisah petualangan Raib, Ali, dan Seli yang menemukan dunia paralel penuh keajaiban. Seri pertama dari serial Bumi yang fenomenal.',
    language: 'Indonesia',
    releaseDate: '2014',
    publisher: 'Gramedia Pustaka Utama',
    pages: 440,
    category: 'Fantasi',
    isPopular: true,
    isBestSeller: true,
  },
  {
    id: '3',
    title: 'Filosofi Teras',
    author: 'Henry Manampiring',
    price: 0,
    cover: filosofiTerasCover,
    format: 'PDF',
    rating: 4.7,
    reviews: 3890,
    description: 'Buku filsafat Stoa yang dikemas dengan gaya bahasa yang ringan dan mudah dipahami untuk pembaca Indonesia modern.',
    language: 'Indonesia',
    releaseDate: '2018',
    publisher: 'Kompas',
    pages: 320,
    category: 'Filsafat',
    isFree: true,
    isPopular: true,
  },
  {
    id: '4',
    title: 'Pulang',
    author: 'Tere Liye',
    price: 85000,
    cover: pulangCover,
    format: 'EPUB',
    rating: 4.6,
    reviews: 4521,
    description: 'Novel tentang perjalanan pulang seorang anak ke kampung halamannya, menghadapi masa lalu dan menemukan makna kehidupan.',
    language: 'Indonesia',
    releaseDate: '2015',
    publisher: 'Republika',
    pages: 400,
    category: 'Novel',
    isBestSeller: true,
  },
  {
    id: '5',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 0,
    originalPrice: 129000,
    cover: atomicHabitsCover,
    format: 'PDF',
    rating: 4.9,
    reviews: 8934,
    description: 'Cara mudah dan terbukti untuk membangun kebiasaan baik dan menghilangkan kebiasaan buruk.',
    language: 'Indonesia',
    releaseDate: '2019',
    publisher: 'Gramedia',
    pages: 352,
    category: 'Self-Help',
    isFree: true,
  },
  {
    id: '6',
    title: 'Cantik Itu Luka',
    author: 'Eka Kurniawan',
    price: 95000,
    cover: cantikItuLukaCover,
    format: 'Digital',
    rating: 4.5,
    reviews: 2156,
    description: 'Novel magis realis yang menceritakan kisah Dewi Ayu dan empat putrinya di sebuah kota pesisir.',
    language: 'Indonesia',
    releaseDate: '2002',
    publisher: 'Gramedia Pustaka Utama',
    pages: 520,
    category: 'Novel',
    isPopular: true,
  },
  {
    id: '7',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    price: 149000,
    cover: sapiensCover,
    format: 'PDF',
    rating: 4.8,
    reviews: 6723,
    description: 'Sejarah singkat umat manusia dari zaman batu hingga era modern.',
    language: 'Indonesia',
    releaseDate: '2017',
    publisher: 'Kepustakaan Populer Gramedia',
    pages: 560,
    category: 'Sejarah',
    isBestSeller: true,
  },
  {
    id: '8',
    title: 'Hujan',
    author: 'Tere Liye',
    price: 0,
    cover: hujanCover,
    format: 'EPUB',
    rating: 4.7,
    reviews: 3245,
    description: 'Kisah cinta yang berlatar dunia masa depan dengan teknologi canggih dan tantangan baru.',
    language: 'Indonesia',
    releaseDate: '2016',
    publisher: 'Gramedia',
    pages: 320,
    category: 'Fiksi Ilmiah',
    isFree: true,
  },
  {
    id: '9',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    price: 119000,
    cover: psychologyOfMoneyCover,
    format: 'PDF',
    rating: 4.8,
    reviews: 5432,
    description: 'Pelajaran tentang kekayaan, keserakahan, dan kebahagiaan yang tidak pernah diajarkan di sekolah.',
    language: 'Indonesia',
    releaseDate: '2021',
    publisher: 'Bentang Pustaka',
    pages: 280,
    category: 'Bisnis',
    isPopular: true,
    isBestSeller: true,
  },
  {
    id: '10',
    title: 'Negeri 5 Menara',
    author: 'Ahmad Fuadi',
    price: 75000,
    cover: negeri5MenaraCover,
    format: 'Digital',
    rating: 4.6,
    reviews: 4123,
    description: 'Kisah inspiratif tentang persahabatan dan mimpi enam santri di pesantren.',
    language: 'Indonesia',
    releaseDate: '2009',
    publisher: 'Gramedia',
    pages: 424,
    category: 'Novel',
    isPopular: true,
  },
];

export const categories = [
  'Semua',
  'Novel',
  'Fantasi',
  'Crime',
  'Romance',
  'Filsafat',
  'Self-Help',
  'Bisnis',
  'Sejarah',
  'Fiksi Ilmiah',
];

export const popularSearches = [
  'Tere Liye',
  'Novel Indonesia',
  'Self-Help',
  'Filsafat',
  'Bisnis',
];
