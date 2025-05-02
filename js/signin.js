document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("signupForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault();  
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const dob = document.getElementById("dob").value;

        
        if (!name || !email || !password || !gender || !dob) {
            alert("⚠️ الرجاء ملء جميع الحقول المطلوبة.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        
        const existingUser = users.find(user => user.email === email);
        const existingPassword = users.find(user => user.password === password);

        if (existingUser) {
            alert("❌ البريد الإلكتروني مسجل بالفعل. الرجاء استخدام بريد إلكتروني آخر.");
            return;
        }

        if (existingPassword) {
            alert("❌ كلمة المرور مستخدمة بالفعل. الرجاء اختيار كلمة مرور أخرى.");
            return;
        }
        
        const newUser = {
            name,
            email,
            password,
            gender,
            dob
        };

        users.push(newUser);

      
        localStorage.setItem("users", JSON.stringify(users));
3
        alert("✅ تم التسجيل بنجاح! مرحبًا بك.");
        window.location.href = "HelloPage.html";  
    });

    
    document.querySelector('.cancel').addEventListener('click', function() {
        form.reset();  
    });
});
