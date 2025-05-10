// src/components/LanguageAndThemeToggle.js
import React from "react";
import { useTranslation } from "react-i18next";

const LanguageAndThemeToggle = ({ toggleTheme, changeLanguage }) => {
  const { i18n } = useTranslation();

  return (
    <div className="language-theme-toggle">
      {/* ✅ أزرار تغيير اللغة */}
      <button onClick={() => changeLanguage("ar")}>🇸🇦</button>
      <button onClick={() => changeLanguage("en")}>🇺🇸</button>

      {/* ✅ زر تبديل الثيم */}
      <button onClick={toggleTheme}>
        🌓
      </button>
    </div>
  );
};

export default LanguageAndThemeToggle;
