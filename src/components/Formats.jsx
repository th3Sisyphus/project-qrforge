import { Link2, Type, Wifi, Contact, Image as ImageIcon } from 'lucide-react';

export const FORMAT_CARDS = [
  {
    id: 'url',
    icon: Link2,
    title: 'Tautan',
    body: 'Satu alamat web dipindai langsung ke browser. Cocok untuk menu, portofolio, dan tautan kampanye.',
    code: 'https://contoh.id/halaman',
  },
  {
    id: 'text',
    icon: Type,
    title: 'Teks',
    body: 'Catatan pendek yang terbaca di aplikasi pemindai mana pun, tanpa koneksi ke server.',
    code: 'Meja 12 · Wi-Fi tamu ada di resepsionis',
  },
  {
    id: 'wifi',
    icon: Wifi,
    title: 'Wi-Fi',
    body: 'Tamu memindai, jaringan langsung tersambung. Sandi disimpan di dalam kode, bukan di kertas.',
    code: 'WIFI:T:WPA;S:nama-jaringan;P:••••••;H:false;;',
  },
  {
    id: 'vcard',
    icon: Contact,
    title: 'Kontak',
    body: 'Kartu nama digital berformat vCard 3.0: nama, telepon, email, dan organisasi masuk ke buku alamat.',
    code: 'BEGIN:VCARD · VERSION:3.0 · FN:…',
    wide: true,
  },
  {
    id: 'image',
    icon: ImageIcon,
    title: 'Gambar',
    body: 'Gambar kecil dikompres ke WebP lalu ditanam sebagai data URI, muat di kapasitas kode QR.',
    code: 'data:image/webp;base64,UklGR…',
    wide: true,
  },
];
