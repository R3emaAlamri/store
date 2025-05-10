import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/cart.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";

const CartPage = () => {
  const { t } = useTranslation(); // استخدام الترجمة
  const [cartItems, setCartItems] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const updateLocalStorage = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateLocalStorage(updatedCart);
    showAlert(t("itemRemoved"), "error");
  };

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const handleOrder = () => {
    if (cartItems.length === 0) {
      showAlert(t("emptyCart"), "error");
      return;
    }
    if (!selectedPayment) {
      showAlert(t("selectPaymentMethod"), "warning");
      return;
    }

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    showAlert(
      `${t("orderSuccess")}<br>${t("paymentMethod")}: ${selectedPayment}<br>${t("total")}: ${total} ${t("currency")}`,
      "success",
      5000
    );

    updateLocalStorage([]);
    setSelectedPayment(null);
  };

  const showAlert = (message, type, duration = 3000) => {
    const alertBox = document.createElement("div");
    alertBox.className = `alert-box ${type}`;
    alertBox.innerHTML = message;
    document.body.appendChild(alertBox);
    setTimeout(() => {
      alertBox.classList.add("fade-out");
      setTimeout(() => alertBox.remove(), 500);
    }, duration);
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // دالة تسجيل الخروج
  const handleLogout = (e) => {
    e.preventDefault();
    alert(t("logoutSuccess"));
    navigate("/login");
  };

  return (
    <div dir="rtl">
      {/* Cart Section */}
      <section className="cart-container">
        <h2 className="text-center mb-4">{t("yourCart")}</h2>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">{t("emptyCart")}</div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>{item.price} {t("currency")} × {item.quantity}</p>
                </div>
                <button className="remove-item" onClick={() => handleRemoveItem(item.id)}>{t("remove")}</button>
              </div>
            ))
          )}
        </div>

        <div className="cart-total">
          {t("total")}: <span>{total.toFixed(2)}</span> {t("currency")}
        </div>

        <div className="payment-methods">
          <h3 className="mb-3">{t("choosePaymentMethod")}</h3>
          {["فيزا", "ماستركارد", "باي بال"].map((method) => (
            <div
              key={method}
              className={`payment-box ${selectedPayment === method ? "selected" : ""}`}
              onClick={() => handlePaymentSelect(method)}
            >
              {method}
            </div>
          ))}
        </div>

        <button className="btn-order mt-4" onClick={handleOrder}>{t("completePurchase")}</button>
      </section>

      {/* Logout Section */}
      <div className="logout-section mt-4 text-center">
        <button className="btn-logout" onClick={handleLogout}>
          {t("logout")}
        </button>
      </div>
    </div>
  );
};

export default CartPage;
