import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/cart.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";

const CartPage = () => {
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
    showAlert("تم حذف المنتج من السلة", "error");
  };

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const handleOrder = () => {
    if (cartItems.length === 0) {
      showAlert("السلة فارغة", "error");
      return;
    }
    if (!selectedPayment) {
      showAlert("الرجاء اختيار طريقة الدفع", "warning");
      return;
    }

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    showAlert(
      `تمت عملية الشراء بنجاح<br>طريقة الدفع: ${selectedPayment}<br>الإجمالي: ${total} ريال`,
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

  const handleLogout = (e) => {
    e.preventDefault();
    alert("تم تسجيل الخروج بنجاح");
    navigate("/login");
  };

  return (
    <div dir="rtl">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand logo" to="/">Desert clothes</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto nav-links">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/signin">Signup</Link></li>
              <li className="nav-item">
                <button className="nav-link logout btn btn-link" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Cart Section */}
      <section className="cart-container">
        <h2 className="text-center mb-4">سلتك</h2>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">السلة فارغة</div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>{item.price} ريال × {item.quantity}</p>
                </div>
                <button className="remove-item" onClick={() => handleRemoveItem(item.id)}>حذف</button>
              </div>
            ))
          )}
        </div>

        <div className="cart-total">
          الإجمالي: <span>{total.toFixed(2)}</span> ريال
        </div>

        <div className="payment-methods">
          <h3 className="mb-3">اختر طريقة الدفع:</h3>
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

        <button className="btn-order mt-4" onClick={handleOrder}>إتمام الشراء</button>
      </section>
    </div>
  );
};

export default CartPage;
