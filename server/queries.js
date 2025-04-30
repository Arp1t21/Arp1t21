const db = require('./db');
const crypto = require('crypto');

// Функция для хеширования пароля
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function registerUser(username, email, password, callback) {
  // Проверка на существующий email
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return callback(err);
    if (user) return callback(new Error('Пользователь с таким email уже существует'));

    // Проверка на существующий username
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
      if (err) return callback(err);
      if (user) return callback(new Error('Пользователь с таким именем уже существует'));

      // Хешируем пароль перед сохранением
      const hashedPassword = hashPassword(password);
      
      db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
        [username, email, hashedPassword], function (err) {
        if (err) return callback(err);
        
        // Возвращаем данные без пароля
        callback(null, { 
          id: this.lastID, 
          username, 
          email,
          password: hashedPassword // Включаем хеш пароля для сессии
        });
      });
    });
  });
}

function loginUser(email, password, callback) {
  const hashedPassword = hashPassword(password);
  
  db.get('SELECT id, username, email, avatar, description, password FROM users WHERE email = ?', 
    [email], (err, user) => {
    if (err) return callback(err);
    if (!user) return callback(null, null); // Пользователь не найден
    
    // Проверка пароля
    if (user.password !== hashedPassword) {
      return callback(null, null); // Неверный пароль
    }
    
    // Возвращаем данные пользователя для сессии
    callback(null, {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      description: user.description,
      password: hashedPassword // Включаем хеш пароля для сессии
    });
  });
}

function addComment(userId, content, callback) {
  db.run('INSERT INTO comments (user_id, content) VALUES (?, ?)', 
    [userId, content], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID });
  });
}

function getComments(callback) {
  // Объединяем комментарии с информацией о пользователях
  db.all(`
    SELECT 
      c.id, 
      c.content, 
      c.created_at, 
      u.id as user_id, 
      u.username, 
      u.avatar
    FROM comments c
    JOIN users u ON c.user_id = u.id
    ORDER BY c.created_at DESC
  `, (err, comments) => {
    if (err) return callback(err);
    callback(null, comments);
  });
}

module.exports = {
  registerUser,
  loginUser,
  addComment,
  getComments
};