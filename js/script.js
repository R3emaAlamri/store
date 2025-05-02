document.getElementById("logout-btn").addEventListener("click", function(event) {
  event.preventDefault(); 
  window.location.replace("login.html");
  });
const products = [
    { id: 1, name: "بشت رجالي اسود", price: 250, image: "./images/bisht_black.jpg"},
    { id: 2, name: "بشت رجالي اشقر", price: 250, image: "./images/bisht_broun.jpg"},
    { id: 3, name: "بشت رجالي بيج", price: 250, image: "./images/bisht_beige.jpg"},
    { id: 4, name: "بشت رجالي سكري", price: 250, image: "./images/bisht_wieght.jpg"},
    { id: 5, name: "بشت رجالي وبر اشقر", price: 250, image: "./images/bisht_broun2.jpg"},
    { id: 6, name: "بشت رجالي وبر عودي", price: 250, image: "./images/bisht_broun3.jpg" },
  ];

 // تخزين السلة في localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const productId = parseInt(productCard.dataset.id);
  });
});
// إضافة منتج للسلة
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productId = productCard.dataset.id;
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));
        const productImage = productCard.querySelector('img').src;

        // التحقق إذا كان المنتج موجوداً بالفعل
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIcon();
        
        // إشعار بإضافة المنتج
        alert(`تمت إضافة ${productName} إلى السلة`);
    });
});

// تحديث الأيقونة عند تحميل الصفحة
