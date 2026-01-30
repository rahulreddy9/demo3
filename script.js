// Shopping Cart Management
let cart = JSON.parse(localStorage.getItem('luxeCart')) || [];

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCart();
});

// Toggle Cart Modal
function toggleCart() {
    const modal = document.getElementById('cartModal');
    const overlay = document.getElementById('cartOverlay');
    modal.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Add Item to Cart
function addToCart(name, price, icon) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            icon: icon,
            quantity: 1
        });
    }
    
    saveCart();
    updateCart();
    showSuccess(`${name} added to cart!`);
}

// Update Cart Display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartCount || !cartTotal) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartCount.textContent = '0';
        cartTotal.textContent = '$0';
        return;
    }
    
    let total = 0;
    let itemCount = 0;
    
    cartItems.innerHTML = cart.map((item, index) => {
        total += item.price * item.quantity;
        itemCount += item.quantity;
        
        return `
            <div class="cart-item">
                <div class="cart-item-image">${item.icon}</div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        `;
    }).join('');
    
    cartCount.textContent = itemCount;
    cartTotal.textContent = `$${total.toLocaleString()}`;
}

// Update Item Quantity
function updateQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    saveCart();
    updateCart();
}

// Remove Item from Cart
function removeItem(index) {
    const itemName = cart[index].name;
    cart.splice(index, 1);
    saveCart();
    updateCart();
    showSuccess(`${itemName} removed from cart`);
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('luxeCart', JSON.stringify(cart));
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        showSuccess('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    showSuccess(`Proceeding to checkout... ${itemCount} items, Total: $${total.toLocaleString()}`);
    
    setTimeout(() => {
        cart = [];
        saveCart();
        updateCart();
        toggleCart();
        showSuccess('Thank you for your order!');
    }, 2000);
}

// Form Submission
function submitForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    showSuccess('Thank you! We will contact you soon.');
    event.target.reset();
}

// Newsletter Subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    console.log('Newsletter subscription:', email);
    
    showSuccess('Successfully subscribed to our newsletter!');
    event.target.reset();
}

// Show Success Message
function showSuccess(message) {
    const successMsg = document.getElementById('successMessage');
    if (!successMsg) return;
    
    successMsg.textContent = message;
    successMsg.classList.add('show');
    
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 3000);
}

// Smooth Scroll for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});