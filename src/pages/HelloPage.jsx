import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/HelloPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

const MainPage = () => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "بشت رجالي اسود", price: 250, image: "/images/bisht_black.jpg" },
    { id: 2, name: "بشت رجالي اشقر", price: 250, image: "/images/bisht_broun.jpg" },
    { id: 3, name: "بشت رجالي بيج", price: 250, image: "/images/bisht_beige.jpg" },
    { id: 4, name: "بشت رجالي سكري", price: 250, image: "/images/bisht_wieght.jpg" },
    { id: 5, name: "بشت رجالي وبر اشقر", price: 250, image: "/images/bisht_broun2.jpg" },
    { id: 6, name: "بشت رجالي وبر عودي", price: 250, image: "/images/bisht_broun3.jpg" },
  ];

  // تحميل السلة من localStorage عند بداية الصفحة
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    setCartCount(storedCart.reduce((acc, item) => acc + item.quantity, 0));
  }, []);

  const handleAddToCart = (product) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    setCartCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert(`تمت إضافة ${product.name} إلى السلة`);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login"); // أو "/signin" حسب اسم الصفحة عندك
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Desert clothes</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#products">Shop</a></li>
          <li><a href="#about">About Us</a></li>
          <li><Link to="/signin">Signup</Link></li>
          <li><button onClick={handleLogout} className="logout">Logout</button></li>
          <div className="cart-icon">
            <Link to="/cart">🛒 ({cartCount})</Link>
          </div>
        </ul>
      </nav>

      {/* Header */}
      <header id="home">
        <section className="hero">
          <div className="content">
            <h1>تراث</h1>
            <h1>المملكه العربيه السعودية</h1>
            <p>افضل انواع الاقمشه للبشوت تقدم عندنا</p>
          </div>
        </section>
      </header>

      {/* Products Section */}
      <section className="products" id="products">
        <h2>Our Products</h2>
        <div className="product-rows">
          {[0, 1].map((rowIndex) => (
            <div className="product-row" key={rowIndex}>
              {products.slice(rowIndex * 3, rowIndex * 3 + 3).map((product) => (
                <div key={product.id} className="product-card" data-id={product.id}>
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                    أضف إلى السلة
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About Us</h2>
        <p>نحن موقع يقدم افضل ملابس التراث ونتمى تراثنا ينتشر باوسع البلدان ونشركركم لزياره متجرنا.</p>
        <h3>Contact Us</h3>
        <p>remi.alamri.88@gmail.com</p>
        <p>Riyadh Saudi Arabia</p>
        <p>Phone: +966-055-7142302</p>
      </section>
    </>
  );
};

export default MainPage;
