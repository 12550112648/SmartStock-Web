# 📦 SmartStock V2 - Integrated Inventory & POS System

SmartStock V2 adalah aplikasi web manajemen stok dan terminal kasir yang dirancang untuk menyederhanakan operasional swalayan atau toko retail. Aplikasi ini membagi fungsi operasional berdasarkan peran pengguna untuk memastikan efisiensi dan akurasi data.

## Fitur Utama

### 1. Multi-User Access Control
Akses sistem yang disesuaikan berdasarkan peran:
* **Admin/Manager:** Memantau total omzet, potensi profit bersih, dan riwayat seluruh transaksi toko.
* **Gudang:** Mengelola input barang baru dengan atribut spesifik (makanan, minuman, pecah belah) dan memantau stok kritis.
* **Kasir:** Terminal POS yang responsif untuk memproses transaksi dengan pencarian barang berdasarkan ID unik.

### 2. Automated ID Generator
Sistem secara otomatis menghasilkan ID barang berdasarkan kategori:
* **Axxx** untuk jenis Makanan (Contoh: A001).
* **Bxxx** untuk jenis Minuman (Contoh: B001).
* **Cxxx** untuk jenis Pecah Belah (Contoh: C001).

### 3. Smart Analytics & Inventory
* Kalkulasi profit otomatis (Harga Jual - Harga Modal).
* Pengurangan stok otomatis setiap kali transaksi berhasil diproses.
* Atribut barang spesifik (Contoh: Tanggal Kedaluwarsa untuk makanan/minuman).

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3 (Modern UI dengan Google Fonts Poppins).
* **Logic:** Vanilla JavaScript (Object-Oriented Programming).
* **Deployment:** Vercel / GitHub Pages.


| Role | Username | Password |
| :--- | :--- | :--- |
| Admin | `ADMIN` | `Admin23` |
| Kasir | `KASIR` | `Kasir23` |
| Gudang | `GUDANG` | `Gudang23` |
