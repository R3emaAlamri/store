import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';  // استيراد useTranslation
import LanguageAndThemeToggle from "../components/LanguageAndThemeToggle"; // استيراد المكون للتحكم في السمة واللغة
import "../styles/signin.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SignIn = () => {
  const { t } = useTranslation();  // استخدام التابع t للترجمة
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
  });

  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light");  // إضافة حالة السمة
  const navigate = useNavigate();

  // تغيير السمة بين الفاتح والداكن
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.toggle("dark-theme", newTheme === "dark");
    localStorage.setItem("theme", newTheme); // حفظ السمة في localStorage
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "radio" ? value : e.target.value;

    setForm((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, gender, dob } = form;

    if (!name || !email || !password || !gender || !dob) {
      setError(t('pleaseFillAllFields'));
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(user => user.email === email);
    const existingPassword = users.find(user => user.password === password);

    if (existingUser) {
      setError(t('emailAlreadyRegistered'));
      return;
    }

    if (existingPassword) {
      setError(t('passwordAlreadyUsed'));
      return;
    }

    const newUser = { name, email, password, gender, dob };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert(t('registrationSuccess'));
    setError("");
    navigate("/login"); // أو أي صفحة أخرى بعد التسجيل
  };

  const handleCancel = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      gender: "",
      dob: "",
    });
    setError("");
  };

  return (
    <div className={`container d-flex ${theme}`}>
      <div className="image-section flex-fill text-center">
        <h2>{t('hello')}</h2>
        <p>{t('welcomeMessage')}</p>
      </div>

      <div className="form-section flex-fill">
        <LanguageAndThemeToggle toggleTheme={toggleTheme} /> {/* إضافة مكون التبديل */}

        <h2>{t('createAccount')}</h2>
        <form onSubmit={handleSubmit}>
          <label>{t('name')}:</label>
          <input
            type="text"
            name="name"
            placeholder={t('enterYourName')}
            value={form.name}
            onChange={handleChange}
          />

          <label>{t('email')}:</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={form.email}
            onChange={handleChange}
          />

          <label>{t('password')}:</label>
          <input
            type="password"
            name="password"
            placeholder={t('enterYourPassword')}
            value={form.password}
            onChange={handleChange}
          />

          <label>{t('gender')}:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={form.gender === "male"}
                onChange={handleChange}
              /> {t('male')}
            </label>
            <label style={{ marginLeft: "15px" }}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={form.gender === "female"}
                onChange={handleChange}
              /> {t('female')}
            </label>
          </div>

          <label>{t('dob')}:</label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
          />

          <div className="buttons mt-3">
            <button type="button" className="cancel mr-2" onClick={handleCancel}>
              {t('cancel')}
            </button>
            <button type="submit" className="confirm">
              {t('signUp')}
            </button>
          </div>

          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
          )}

          <div className="login-link mt-3">
            {t('alreadyHaveAccount')} <Link to="/login">{t('loginHere')}</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
