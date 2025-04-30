import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { login } from '../../api'; // Используем функцию из api.js вместо прямого fetch

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState(''); // Изменено с name на username для соответствия бэкенду
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }) // Изменено с name на username
      });
      const data = await response.json();
      if (response.ok) {
        alert('✅ Регистрация прошла успешно!');
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        navigate('/');
      } else {
        alert('❌ Ошибка регистрации: ' + data.error);
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      alert('❌ Произошла ошибка при регистрации');
    }
  };

  const handleLogin = async () => {
    try {
      // Используем функцию из api.js
      const data = await login(email, password);
      
      if (!data.error) {
        alert('✅ Успешный вход!');
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        navigate('/');
      } else {
        alert('❌ Ошибка входа: ' + data.error);
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
      alert('❌ Произошла ошибка при входе');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-toggle">
        <span className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>
          Регистрация
        </span>
        <span className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>
          Войти
        </span>
      </div>
      <div className="auth-forms">
        {/* Форма регистрации */}
        <div className={`form registration-form ${!isLogin ? 'active' : ''}`}>
          <input type="text" placeholder="Имя" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="auth-btn" onClick={handleRegister}>Зарегистрироваться</button>
        </div>
        {/* Форма входа */}
        <div className={`form login-form ${isLogin ? 'active' : ''}`}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="auth-btn" onClick={handleLogin}>Войти</button>
        </div>
      </div>
    </div>
  );
}

export default Auth;