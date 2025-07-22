# 💰 Paroan Split Bill

Aplikasi web modern untuk membagi tagihan dengan teman-teman secara mudah dan transparan. Dibangun dengan React, TypeScript, dan Tailwind CSS.

<img width="2861" height="1528" alt="Image" src="https://github.com/user-attachments/assets/b14d1713-ce87-43be-9c29-5806979567a6" />

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


## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

