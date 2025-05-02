import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signin.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SignIn = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      setError("⚠️ الرجاء ملء جميع الحقول المطلوبة.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(user => user.email === email);
    const existingPassword = users.find(user => user.password === password);

    if (existingUser) {
      setError("❌ البريد الإلكتروني مسجل بالفعل. الرجاء استخدام بريد إلكتروني آخر.");
      return;
    }

    if (existingPassword) {
      setError("❌ كلمة المرور مستخدمة بالفعل. الرجاء اختيار كلمة مرور أخرى.");
      return;
    }

    const newUser = { name, email, password, gender, dob };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ تم التسجيل بنجاح! مرحبًا بك.");
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
    <div className="container d-flex">
      <div className="image-section flex-fill text-center">
        <h2>HELLO</h2>
        <p>WELCOME TO OUR WORLD</p>
      </div>

      <div className="form-section flex-fill">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={form.email}
            onChange={handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />

          <label>Gender:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={form.gender === "male"}
                onChange={handleChange}
              /> Male
            </label>
            <label style={{ marginLeft: "15px" }}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={form.gender === "female"}
                onChange={handleChange}
              /> Female
            </label>
          </div>

          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
          />

          <div className="buttons mt-3">
            <button type="button" className="cancel mr-2" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="confirm">
              Sign up
            </button>
          </div>

          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
          )}

          <div className="login-link mt-3">
            Already have an account? <Link to="/login">Login Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
