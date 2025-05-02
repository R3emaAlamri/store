// استرجاع السلة من localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedPayment = null;

// عرض عناصر السلة
function displayCartItems() {
    const cartItemsEl = document.querySelector('.cart-items');
    const cartTotalEl = document.querySelector('.cart-total span');
    
    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<div class="empty-cart">السلة فارغة</div>';
        cartTotalEl.textContent = '0';
        return;
    }

    cartItemsEl.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>${item.price} ريال × ${item.quantity}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">حذف</button>
        `;
        cartItemsEl.appendChild(itemEl);
    });

    cartTotalEl.textContent = total.toFixed(2);
}

// حذف عنصر من السلة
document.querySelector('.cart-items').addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-item')) {
        const itemId = parseInt(e.target.dataset.id);
        cart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        
        // إظهار تأكيد الحذف
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = 'تم حذف المنتج من السلة';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }
});

// اختيار طريقة الدفع
document.querySelectorAll('.payment-box').forEach(box => {
    box.addEventListener('click', function() {
        document.querySelectorAll('.payment-box').forEach(b => {
            b.classList.remove('selected');
        });
        this.classList.add('selected');
        selectedPayment = this.textContent;
    });
});

// إتمام الشراء
document.querySelector('.btn-order').addEventListener('click', function() {
    if (cart.length === 0) {
        showAlert('السلة فارغة', 'error');
        return;
    }
    
    if (!selectedPayment) {
        showAlert('الرجاء اختيار طريقة الدفع', 'warning');
        return;
    }

    const total = document.querySelector('.cart-total span').textContent;
    showAlert(
        `تمت عملية الشراء بنجاح<br>طريقة الدفع: ${selectedPayment}<br>الإجمالي: ${total} ريال`, 
        'success',
        5000
    );
    
    // تفريغ السلة بعد الشراء
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    document.querySelectorAll('.payment-box').forEach(b => b.classList.remove('selected'));
    selectedPayment = null;
});

// عرض رسالة للمستخدم
function showAlert(message, type, duration = 3000) {
    const alertBox = document.createElement('div');
    alertBox.className = `alert-box ${type}`;
    alertBox.innerHTML = message;
    document.body.appendChild(alertBox);
    
    setTimeout(() => {
        alertBox.classList.add('fade-out');
        setTimeout(() => alertBox.remove(), 500);
    }, duration);
}

// عرض العناصر عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    
    // إضافة تأثير عند التحميل
    document.querySelector('.cart-container').style.opacity = '1';
});
