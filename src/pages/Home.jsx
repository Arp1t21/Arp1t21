import React from 'react';
import { Link } from 'react-router-dom';
import MainSection from '../components/MainSection/MainSection';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './Home.css';

export default function Home({ user, handleLogout }) {
  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <MainSection />
      <section className='home-comments'>
        <div className="comments-section-container">
          <h2>Обсуждения</h2>
          <p>Поделитесь своим мнением или прочитайте комментарии других пользователей</p>
          <Link to="/comments" className="comments-link">
            Загрузить комментарии
          </Link>
        </div>
      </section>
      <div id="Footer">
        <Footer />
      </div>
    </>
  );
}