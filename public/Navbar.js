// src/components/Navbar/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // استيراد useTranslation
import "./Navbar.css";
import LanguageAndThemeToggle from "../LanguageAndThemeToggle";

const Navbar = ({ handleLogout, cartCount, toggleTheme }) => {
  const { t, i18n } = useTranslation(); // استخدام useTranslation للحصول على الدوال
  const navigate = useNavigate();

  // دالة لتغيير اللغة
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng); // تغيير اللغة
  };

  const handleLogoutAndRedirect = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">{t('welcome')}</div> {/* مثال لاستخدام الترجمة */}
      
      <div className="nav-actions">
        <ul className="nav-links">
          <li><Link to="/home">{t('home')}</Link></li>
          <li><a href="#products">{t('products')}</a></li>
          <li><a href="#about">{t('about')}</a></li>
          <li><Link to="/signup">{t('signup')}</Link></li>
          <li>
            <button onClick={handleLogoutAndRedirect} className="logout">{t('logout')}</button>
          </li>
          <li className="cart-icon">
            <Link to="/cart">🛒 ({cartCount})</Link>
          </li>
        </ul>

        <div className="extra-actions">
          <LanguageAndThemeToggle
            toggleTheme={toggleTheme}
            changeLanguage={handleLanguageChange} // استخدام الدالة هنا
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
