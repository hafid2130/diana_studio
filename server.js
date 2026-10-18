// backend/server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = 'super_secret_key_diana_studio_2026';

// Database Sementara di Memori (Bisa diganti ke MongoDB Atlas)
let servicesData = [
    { id: 1, name: 'Potong & Styling Rambut', category: 'Hair Care', image: 'image2.jpeg' },
    { id: 2, name: 'Facial & Massage Wajah', category: 'Skin & Spa', image: 'image3.jpeg' },
    { id: 3, name: 'Hair Treatment L\'Oréal', category: 'Hair Treatment', image: 'image4.jpeg' }
];

// User Admin Terenkripsi (Password default: admin123)
const adminUser = {
    username: 'admin_diana',
    passwordHash: bcrypt.hashSync('admin123', 10)
};

// 1. PUBLIC API: Mengambil data layanan untuk pengunjung web
app.get('/api/services', (req, res) => {
    res.json(servicesData);
});

// 2. ADMIN AUTH API: Login Admin & Generate JWT Token
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === adminUser.username && bcrypt.compareSync(password, adminUser.passwordHash)) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
        return res.json({ success: true, token });
    }
    res.status(401).json({ success: false, message: 'Username/Password Salah' });
});

// Middleware Keamanan Token JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// 3. ADMIN PROTECTED API: Tambah/Ubah Layanan
app.post('/api/admin/services', authenticateToken, (req, res) => {
    const newService = { id: Date.now(), ...req.body };
    servicesData.push(newService);
    res.json({ success: true, message: 'Layanan berhasil ditambahkan!', data: servicesData });
});

app.listen(5000, () => console.log('Backend Server berjalan di port 5000'));