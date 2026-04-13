/**
 * 1. CONFIGURATION & INITIALIZATION
 */
const firebaseConfig = {
  apiKey: "AIzaSyBmy70vkeZLD4HQFPMXXL2WZBCqPQyaCzQ",
  authDomain: "smartstock-e691b.firebaseapp.com",
  projectId: "smartstock-e691b",
  storageBucket: "smartstock-e691b.appspot.com",
  messagingSenderId: "116818389248",
  appId: "1:116818389248:web:8f6be45e7aa7ceeeafabe5",
  databaseURL: "https://smartstock-e691b-default-rtdb.asia-southeast1.firebasedatabase.app"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let state = {
    inventory: [],
    transactions: [],
    cart: []
};

const DB_USERS = {
    "ADMIN": { pw: "Admin23", role: "admin", name: "Manager" },
    "KASIR": { pw: "Kasir23", role: "kasir", name: "Staf Kasir" },
    "GUDANG": { pw: "Gudang23", role: "gudang", name: "Staf Gudang" }
};

/**
 * 2. REAL-TIME CLOUD SYNC
 */
db.ref('inventory').on('value', (snapshot) => {
    const data = snapshot.val();
    state.inventory = data ? Object.values(data) : [];
    if (typeof app !== 'undefined' && app.currentUser) app.renderDashboard();
});

db.ref('transactions').on('value', (snapshot) => {
    const data = snapshot.val();
    state.transactions = data ? Object.values(data) : [];
    if (typeof app !== 'undefined' && app.currentUser) app.renderDashboard();
});

/**
 * 3. CORE APPLICATION CLASS
 */
class SmartStockApp {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        console.log("App Started & Connected to Firebase");
    }

    handleLogin() {
        const u = document.getElementById('username').value.toUpperCase();
        const p = document.getElementById('password').value;

        if (DB_USERS[u] && DB_USERS[u].pw === p) {
            this.currentUser = DB_USERS[u];
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('dashboard-screen').classList.remove('hidden');
            this.renderDashboard();
        } else {
            alert("Username atau Password Salah!");
        }
    }

    // --- FUNGSI GUDANG (SIMPAN KE CLOUD) ---
    simpanBarangGudang() {
        const jenis = document.getElementById('g_jenis').value;
        const nama = document.getElementById('g_nama').value;
        const stok = parseInt(document.getElementById('g_stok').value);
        const modal = parseInt(document.getElementById('g_modal').value);
        const jual = parseInt(document.getElementById('g_jual').value);
        const spesifik = document.getElementById('g_spesifik').value;

        if (!nama || stok <= 0) return alert("Data tidak valid!");

        let prefix = jenis === 'Makanan' ? 'A' : (jenis === 'Minuman' ? 'B' : 'C');
        let newId = prefix + (state.inventory.length + 1).toString().padStart(3, '0');

        // KIRIM KE CLOUD
        db.ref('inventory/' + newId).set({
            id: newId, nama, jenis, stock: stok, modal, jual,
            spesifik: (jenis === 'Pecah Belah' ? 'Bahan: ' : 'Exp: ') + spesifik
        }).then(() => {
            alert("Barang Tersimpan di Cloud!");
            this.renderDashboard();
        });
    }

    // --- FUNGSI TRANSAKSI (SIMPAN KE CLOUD) ---
    prosesTransaksi() {
        if (state.cart.length === 0) return alert("Keranjang Kosong!");
        
        const notaId = 'TRX' + Date.now();
        const date = new Date();
        const totalJual = state.cart.reduce((sum, item) => sum + (item.jual * item.qty), 0);

        const dataTransaksi = {
            id: notaId,
            waktu: `${date.getHours()}:${date.getMinutes()}`,
            items: [...state.cart],
            total: totalJual
        };

        // 1. Simpan Transaksi ke Cloud
        db.ref('transactions/' + notaId).set(dataTransaksi).then(() => {
            // 2. Update Stok di Cloud untuk setiap barang
            state.cart.forEach(item => {
                const itemRef = db.ref('inventory/' + item.id);
                itemRef.child('stock').set(item.originalStock - item.qty);
            });

            alert("Transaksi Sukses & Stok Berkurang!");
            state.cart = [];
            this.renderDashboard();
        });
    }

    // --- RENDER DASHBOARD (CONTOH) ---
    renderDashboard() {
        const screen = document.getElementById('dashboard-screen');
        screen.innerHTML = `
            <div class="sidebar">
                <h3>Halo, ${this.currentUser.name}</h3>
                <button onclick="app.viewInventory()">Inventaris</button>
                <button onclick="app.logout()">Keluar</button>
            </div>
            <div class="main-content" id="main-content">
                <h1>Selamat Datang di Sistem ${this.currentUser.role}</h1>
            </div>
        `;
    }

    logout() {
        location.reload();
    }
}

// MENJALANKAN APLIKASI
const app = new SmartStockApp();