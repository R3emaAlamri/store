import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageAndThemeToggle from "../components/LanguageAndThemeToggle"; // استيراد المكون
import "../styles/login.css";

const Login = () => {
  const { t } = useTranslation(); // استخدام الترجمة
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState("light"); // إضافة حالة السمة
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) setEmail(savedEmail);
    // تعيين السمة المحفوظة من localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.toggle("dark-theme", savedTheme === "dark");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('⚠️ يرجى إدخال البريد الإلكتروني وكلمة المرور.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      if (rememberMe) {
        localStorage.setItem('savedEmail', email);
      } else {
        localStorage.removeItem('savedEmail');
      }
      alert(`✅ تسجيل الدخول ناجح! مرحبًا بك، ${user.name}`);
      navigate('/home');
    } else {
      setError('❌ البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.toggle("dark-theme", newTheme === "dark");
    localStorage.setItem("theme", newTheme); // حفظ السمة في localStorage
  };

  return (
<div className={`container ${theme}`}>
  <div className="image-section"></div>
  <div className="form-section">
    <LanguageAndThemeToggle toggleTheme={toggleTheme} /> {/* إضافة مكون التبديل */}

    <h2>{t("login")}</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">{t("email")}</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={t("enterEmail")}
        required
      />

      <label htmlFor="password">{t("password")}</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder={t("enterPassword")}
        required
      />

      <div className="remember-me">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={e => setRememberMe(e.target.checked)}
        />
        <label htmlFor="rememberMe">{t("rememberMe")}</label>
      </div>

      <div className="button">
        <button type="submit" className="confirm">{t("login")}</button>
      </div>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      <div className="signin-link">
        {t("dontHaveAccount")}{" "}
        <Link to="/signup">{t("signUpHere")}</Link>
      </div>
    </form>
  </div>
</div>

  );
};

export default Login;
