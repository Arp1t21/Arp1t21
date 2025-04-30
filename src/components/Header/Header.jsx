import React from "react";
import "./Header.css";
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ user, handleLogout }) => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const logout = () => {
    handleLogout();
  };

  return (
    <header className="header">
      <div className="LEAGUE-header">
        <h1>LEAGUE</h1>
      </div>
      <div className="line-header"></div>
      <nav className="navigation">
        <ul className="ul-header">
          <li className="li-header" onClick={() => scrollToSection("Figure")}><a className="a-header">ФИГУРА</a></li>
          <li className="li-header" onClick={() => scrollToSection("Tissue")}><a className="a-header">ТКАНЬ</a></li>
          <li className="li-header" onClick={() => scrollToSection("Color")}><a className="a-header">ЦВЕТА</a></li>
          <li className="li-header" onClick={() => scrollToSection("Styles")}><a className="a-header">СТИЛИ</a></li>
          <li className="li-header" onClick={() => scrollToSection("Footer")}><a className="a-header">ПРО НАС</a></li>

          {user ? (
            <>
              <li className="li-header">
                <Link to="/profile" className="a-header">ПРОФИЛЬ</Link>
              </li>
              <li className="li-header">
                <Link onClick={logout} className="a-header">
                  ВЫЙТИ
                </Link>
              </li>
            </>
          ) : (
            <li className="li-header">
              <Link to="/auth" className="a-header">РЕГИСТРАЦИЯ</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
