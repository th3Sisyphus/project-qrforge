# QRForge

Kode QR yang dibuat di perangkat Anda. Tanpa unggah.

## Fitur aplikasi

- **Lima format isi** — tautan, teks, Wi-Fi, kontak (vCard), dan gambar kecil.
- **Print and paste** — kode QR langsung tampil di workbench. Perubahan live saat isi atau gaya berubah.
- **Import image** — gambar dikompres otomatis ke WebP data URI agar muat di kapasitas kode QR.
- **Import logo** — logo tengah dengan koreksi galat naik ke level H.
- **Format QR** — pilih warna modul, warna latar, bentuk modul, bingkai sudut, titik sudut, dan margin.
- **Ekspor** — unduh PNG atau SVG sampai 2048 piksel. Salin gambar ke papan klip.
- **Riwayat** — simpan kode terbaru di perangkat ini, pilih dari daftar, hapus semua.
- **Privat dan offline** — semua diolah di browser. Tidak ada data yang dikirim ke server.

## Keunggulan

- **Lokal terus-menerus** — kerja di perangkat Anda. Tidak perlu akun, tidak ada unggah.
- **Ringkas dan terukur** — ukuran isi tampil di bagian bawah, dengan peringatan simpan saat di atas batas kode QR.
- **Tampilan disegerakan** — skema kontras langsung, bingkai sudut, dan titik sudut yang bisa dipilih.
- **Kustomisasi penuh** — warna modul dan latar, bentuk modul, dan logo kustom di salah satu dari lima format.
- **Lima skema yang dikenal pemindai** — tautan, teks, Wi-Fi, vCard, dan data URI gambar. Tidak ada tautan perantara milik layanan pihak ketiga.

## Tech stack

- **React 19** — antarmuka ini menggunakan komponen reaktif.
- **Vite 8** — pengelola paket dan pengembangan.
- **Tailwind CSS 4** — halaman gaya, dipakai lewat `@tailwindcss/vite`.
- **qr-code-styling** — rendering kode QR dengan pola, logo, dan tingkat koreksi galat.
- **lucide-react** — ikon antarmuka.

## Instalasi dan penggunaan

```bash
npm install
npm run dev
```

## Kontrol

- **Ruang kerja** — isi di kiri, pratinjau di kanan.
- **Format** — pilih jenis isi dari bilah atas, isi detail di ruang kerja.
- **Tampilan** — pilih dari tab `Isi` atau `Tampilan` di bagian bawah ruang kerja.
- **Ekspor** — pilih resolusi, lalu unduh PNG atau SVG, atau salin gambar.
- **Riwayat** — buka menu `Riwayat` untuk simpan dan pilih kode yang sudah dibuat.
