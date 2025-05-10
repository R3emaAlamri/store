import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/HelloPage";
import Cart from "./pages/cart";
import Navbar from "./components/Navbar/Navbar.js";

// فصل منطق الراوتر في مكون مستقل
const AppContent = ({
  isAuthenticated,
  handleLogin,
  handleLogout,
  cartCount,
  toggleTheme,
  changeLanguage,
  t,
}) => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* ✅ عرض Navbar إذا لم نكن في login/signup */}
      {!shouldHideNavbar && (
        <Navbar
          handleLogout={handleLogout}
          cartCount={cartCount}
          toggleTheme={toggleTheme}
          changeLanguage={changeLanguage}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
              {t("notFound", "الصفحة غير موجودة")}
            </h2>
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  const { t, i18n } = useTranslation();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("user")
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogin = () => {
    localStorage.setItem("user", "loggedIn");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const cartCount = 0;

  return (
    <Router>
      <AppContent
        isAuthenticated={isAuthenticated}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        cartCount={cartCount}
        toggleTheme={toggleTheme}
        changeLanguage={changeLanguage}
        t={t}
      />
    </Router>
  );
};

export default App;
