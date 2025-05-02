window.onload = function () {
    const savedEmail = localStorage.getItem('savedEmail');
    
    if (savedEmail) {
        document.getElementById('email').value = savedEmail;
    }
};

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        let password = document.getElementById('password').value.trim();
        const rememberMe = document.getElementById('rememberMe').checked;
        const errorMessage = document.getElementById('error-message');

        if (!email || !password) {
            errorMessage.innerText = "⚠️ يرجى إدخال البريد الإلكتروني وكلمة المرور.";
            errorMessage.style.display = 'block';
            return;
        }

        let users = JSON.parse(localStorage.getItem('users') || "[]");
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            if (rememberMe) {
                localStorage.setItem('savedEmail', email);
            } else {
                localStorage.removeItem('savedEmail');
            }

            alert("✅ تسجيل الدخول ناجح! مرحبًا بك، " + user.name);
            window.location.href = 'HelloPage.html';
        } else {
            errorMessage.innerText = "❌ البريد الإلكتروني أو كلمة المرور غير صحيحة.";
            errorMessage.style.display = 'block';
        }
    });
});
