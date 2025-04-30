const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const db = require('./db'); // подключение к базе
const { registerUser, loginUser, addComment, getComments } = require('./queries');

const app = express();
const PORT = 3001;

// Создаем директорию для загрузок, если она не существует
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Настройка multer для загрузки аватаров
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Создание таблиц
db.serialize(() => {
  // db.run(`drop table users`)
  // db.run(`drop table comments`)
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      email TEXT UNIQUE,
      avatar TEXT,
      description TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Валидация входных данных
function validateRegisterInput(req, res, next) {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
  }
  
  if (username.length < 3) {
    return res.status(400).json({ error: 'Имя пользователя должно содержать минимум 3 символа' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'Пароль должен содержать минимум 6 символов' });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Введите корректный email' });
  }
  
  next();
}

// Роуты

app.post('/api/register', validateRegisterInput, (req, res) => {
  const { username, email, password } = req.body;
  registerUser(username, email, password, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(result);
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email и пароль обязательны' });
  }
  
  loginUser(email, password, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Неверный email или пароль' });
    res.json(user);
  });
});

app.post('/api/save-profile', upload.single('avatar'), (req, res) => {
  const { userId, username, email, description } = req.body;
  
  if (!userId || !username || !email) {
    return res.status(400).json({ error: 'Не все обязательные поля заполнены' });
  }
  
  const avatarPath = req.file ? `/uploads/${req.file.filename}` : null;

  let sql = 'UPDATE users SET username = ?, email = ?, description = ?';
  const params = [username, email, description || ''];

  if (avatarPath) {
    sql += ', avatar = ?';
    params.push(avatarPath);
  }
  
  sql += ' WHERE id = ?';
  params.push(userId);

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    
    // Получаем обновленные данные пользователя
    db.get('SELECT id, username, email, avatar, description FROM users WHERE id = ?', [userId], (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(user);
    });
  });
});

app.post('/api/check-session', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Не все данные предоставлены' });
  }

  loginUser(email, password, (err, user) => {
    if (err) return res.status(500).json({ error: 'Ошибка сервера' });
    if (!user) return res.status(401).json({ error: 'Неверные данные' });
    res.json(user);
  });
});

app.post('/api/add-comment', (req, res) => {
  const { userId, content } = req.body;
  
  if (!userId || !content) {
    return res.status(400).json({ error: 'Не все данные предоставлены' });
  }
  
  addComment(userId, content, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

app.get('/api/comments', (req, res) => {
  getComments((err, comments) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(comments);
  });
});

// Add debug routes to help identify issues
app.get('/api/debug', (req, res) => {
  res.json({ 
    message: 'Server is running correctly',
    routes: [
      '/api/register (POST)',
      '/api/login (POST)',
      '/api/check-session (POST)',
      '/api/save-profile (POST)',
      '/api/comments (GET)',
      '/api/add-comment (POST)'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
  console.log('Доступные маршруты:');
  console.log('- POST /api/register - Регистрация пользователя');
  console.log('- POST /api/login - Авторизация пользователя');
  console.log('- POST /api/check-session - Проверка сессии');
  console.log('- POST /api/save-profile - Сохранение профиля');
  console.log('- GET /api/comments - Получение комментариев');
  console.log('- POST /api/add-comment - Добавление комментария');
  console.log('- GET /api/debug - Отладочная информация');
});