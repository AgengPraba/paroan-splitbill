# 💰 Paroan Split Bill

Aplikasi web modern untuk membagi tagihan dengan teman-teman secara mudah dan transparan. Dibangun dengan React, TypeScript, dan Tailwind CSS.

<img width="2861" height="1528" alt="Image" src="https://github.com/user-attachments/assets/b14d1713-ce87-43be-9c29-5806979567a6" />

## ✨ Fitur Utama

- 👥 **Manajemen Teman**: Tambah, hapus, dan kelola daftar teman
- 💸 **Split Bill**: Bagi tagihan dengan perhitungan otomatis
- 🔍 **Pencarian**: Cari teman dengan mudah menggunakan fitur search
- 📱 **Responsive**: Tampilan optimal di desktop dan mobile
- 💾 **Penyimpanan Lokal**: Data tersimpan di browser menggunakan localStorage
- 🌙 **Dark/Light Mode**: Toggle antara tema gelap dan terang
- 🎨 **UI Modern**: Menggunakan DaisyUI untuk tampilan yang menarik
- ⚡ **Notifikasi**: Sistem alert yang interaktif dan informatif

## 🛠️ Teknologi yang Digunakan

- **React** 19.1.0 - Library UI
- **TypeScript** - Type safety
- **Vite** - Build tool modern
- **Tailwind CSS** 4.1.11 - Utility-first CSS framework
- **DaisyUI** 5.0.46 - Component library untuk Tailwind
- **Lucide React** - Icon library

## 🚀 Cara Menjalankan Proyek

### Prasyarat

Pastikan Anda sudah menginstal:

- [Node.js](https://nodejs.org/) (versi 18 atau lebih baru)
- [npm](https://www.npmjs.com/) atau [pnpm](https://pnpm.io/)

### Instalasi

1. **Clone repository**

   ```bash
   git clone https://github.com/AgengPraba/paroan-splitbill.git
   cd paroan-splitbill
   ```

2. **Install dependencies**

   ```bash
   npm install
   # atau jika menggunakan pnpm
   pnpm install
   ```

3. **Jalankan development server**

   ```bash
   npm run dev
   # atau
   pnpm dev
   ```

4. **Buka aplikasi**
   - Aplikasi akan berjalan di `http://localhost:5173`
   - Development server mendukung hot reload

### Build untuk Production

```bash
npm run build
# atau
pnpm build
```

File hasil build akan tersimpan di folder `dist/`.

### Preview Production Build

```bash
npm run preview
# atau
pnpm preview
```

## 📁 Struktur Proyek

```
src/
├── components/          # Komponen React
│   ├── AddButton.tsx   # Tombol tambah teman
│   ├── Alert.tsx       # Komponen alert
│   ├── AlertContainer.tsx
│   ├── Friend.tsx      # Komponen item teman
│   ├── FriendList.tsx  # Daftar teman
│   ├── Footer.tsx      # Footer aplikasi
│   ├── ModalAlert.tsx  # Modal alert custom
│   └── Navbar.tsx      # Navigation bar
├── hooks/              # Custom React hooks
│   ├── useAlerts.ts    # Hook untuk sistem alert
│   └── useModalAlert.ts # Hook untuk modal alert
├── utils/              # Utility functions
│   └── localStorage.ts # Fungsi localStorage
├── App.tsx             # Komponen utama
└── main.tsx           # Entry point
```

## 🎯 Cara Menggunakan

### 1. Menambah Teman

- Klik tombol "+" di pojok kanan bawah
- Isi nama teman (3-30 karakter)
- Pilih foto: gunakan foto default atau upload foto sendiri
- Klik "Tambah Teman"

### 2. Split Bill

- Klik icon dollar ($) pada teman yang ingin diajak split bill
- Isi form split bill:
  - **Total Tagihan**: Jumlah total yang harus dibayar
  - **Tagihan Kamu**: Bagian yang harus kamu bayar
  - **Tagihan Teman**: Bagian yang harus dibayar teman (otomatis terhitung)
  - **Ditalangin sama**: Pilih siapa yang membayar terlebih dahulu
- Klik "Simpan Split Bill"

### 3. Mencari Teman

- Gunakan search bar di navbar
- Ketik nama teman yang ingin dicari
- Hasil akan muncul secara real-time

### 4. Menghapus Teman

- Klik icon trash (🗑️) pada teman yang ingin dihapus
- Konfirmasi penghapusan di modal yang muncul

## 💡 Fitur Khusus

### Sistem Balance

- **Positive Balance**: Teman berhutang ke kamu
- **Negative Balance**: Kamu berhutang ke teman
- **Zero Balance**: Tidak ada hutang

### Penyimpanan Data

- Data disimpan di localStorage browser
- Data persisten sampai user menghapus data browser
- Support untuk riwayat transaksi

### Alert System

- Alert sukses untuk aksi berhasil
- Alert error untuk menangani kesalahan
- Alert konfirmasi untuk aksi penting
- Auto-close dalam 3 detik untuk alert informasi

## 🎨 Kustomisasi

### Tema

Aplikasi menggunakan DaisyUI dengan dukungan multiple theme. Untuk mengubah tema:

1. Edit `tailwind.config.js`
2. Tambahkan tema yang diinginkan di array `themes`

### Warna

Warna utama dapat diubah melalui CSS variables di DaisyUI atau dengan mengmodifikasi kelas Tailwind.

## 🚧 Development

### Struktur Code Style

- Menggunakan TypeScript untuk type safety
- Komponen functional dengan React Hooks
- Custom hooks untuk logic yang dapat digunakan ulang
- Utility functions terpisah untuk operasi data

### ESLint Configuration

Proyek menggunakan ESLint dengan konfigurasi TypeScript-aware:

```bash
npm run lint
```

## 🤝 Kontribusi

1. Fork repository
2. Buat branch feature (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**AgengPraba**

- GitHub: [@AgengPraba](https://github.com/AgengPraba)

## 🙏 Acknowledgments

- [DaisyUI](https://daisyui.com/) untuk komponen UI yang indah
- [Lucide](https://lucide.dev/) untuk icon yang konsisten
- [Tailwind CSS](https://tailwindcss.com/) untuk utility classes
- [React](https://reactjs.org/) untuk library yang powerful

---

**Happy Split Billing! 💰✨**
