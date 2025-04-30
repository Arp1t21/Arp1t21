import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-about">
          <h3>О нас</h3>
          <p>Мы предоставляем стильные решения для каждого. Будьте уверены в своем выборе!</p>
        </div>

        <div className="footer-links">
          <h3>Ссылки</h3>
          <ul>
            <li><a href="#">О нас</a></li>
            <li><a href="#">Контакты</a></li>
            <li><a href="#">Политика конфиденциальности</a></li>
            <li><a href="#">Термины и условия</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Следите за нами</h3>
          <div className="social-icons">
            <a href="#" className="social-icon">📘</a>
            <a href="#" className="social-icon">🐦</a>
            <a href="#" className="social-icon">📸</a>
            <a href="#" className="social-icon">🔗</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Моя платформа | Все права защищены</p>
      </div>
    </footer>
  );
};

export default Footer;
