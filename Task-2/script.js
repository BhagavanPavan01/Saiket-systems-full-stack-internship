// Product data
const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 240.99,
        originalPrice: 290.99,
        description: "Comfortable and versatile white t-shirt made from 100% organic cotton. Perfect for everyday wear.",
        category: "men",
        image: "https://p3india.com/cdn/shop/files/19_560ab2e2-7e84-4407-bd41-03616c904951.jpg?v=1722007189&width=1946",
        rating: 4.5,
        reviews: 128,
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Black", "Gray"],
        inStock: true,
        features: ["Organic Cotton", "Machine Wash", "Pre-shrunk"]
    },
    {
        id: 2,
        name: "Slim Fit Jeans",
        price: 590.99,
        originalPrice: 790.99,
        description: "Modern slim fit jeans with stretch for maximum comfort and style. Perfect for casual outings.",
        category: "men",
        image: "https://www.jackjones.in/cdn/shop/files/900793001_g0.jpg?v=1745342669&width=2048",
        rating: 4.3,
        reviews: 89,
        sizes: ["30", "32", "34", "36", "38"],
        colors: ["Dark Blue", "Black", "Light Blue"],
        inStock: true,
        features: ["Stretch Denim", "5 Pocket", "Machine Wash"]
    },
    {
        id: 3,
        name: "Floral Summer Dress",
        price: 490.99,
        originalPrice: 690.99,
        description: "Beautiful floral print summer dress with comfortable fit and breathable fabric.",
        category: "women",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRVegKVSIUTpvW4h8jmOTaL1WdD63dLe4utFZGjBNQIN1GdYtVPjvwOp7Q1WLHK3mmLLphvDzGKH20lvidwYSCD3TW91f7KDjWMIkitcUHtcVqM7g1TzNeb",
        rating: 4.7,
        reviews: 203,
        sizes: ["XS", "S", "M", "L"],
        colors: ["Floral Print", "Blue", "Pink"],
        inStock: true,
        features: ["Breathable Fabric", "Machine Wash", "Free Size Belt"]
    },
    {
        id: 4,
        name: "Leather Crossbody Bag",
        price: 790.99,
        originalPrice: 990.99,
        description: "Elegant leather crossbody bag with multiple compartments and adjustable strap.",
        category: "accessories",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmvRgtykRmLfiMyk-rLaQ4MioM5hbypAkIeg&s",
        rating: 4.6,
        reviews: 156,
        colors: ["Brown", "Black", "Tan"],
        inStock: true,
        features: ["Genuine Leather", "Adjustable Strap", "Multiple Compartments"]
    },
    {
        id: 5,
        name: "Running Sneakers",
        price: 790.99,
        originalPrice: 990.99,
        description: "Lightweight running sneakers with superior cushioning and support for all-day comfort.",
        category: "men",
        image: "https://image.made-in-china.com/202f0j00sJGVvjwMKArZ/2023-Latest-Running-Shoes-Fashion-Sneaker-Men-Sports-Casual-Shoe-High-Quality-Air-Cushion.webp",
        rating: 4.4,
        reviews: 112,
        sizes: ["8", "9", "10", "11", "12"],
        colors: ["White", "Black", "Blue"],
        inStock: true,
        features: ["Lightweight", "Cushioned Sole", "Breathable"]
    },
    {
        id: 6,
        name: "Knit Sweater",
        price: 450.99,
        originalPrice: 590.99,
        description: "Warm and comfortable knit sweater perfect for chilly days. Available in multiple colors.",
        category: "women",
        image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/33283766/2025/7/24/7f8e4805-2101-4571-aa6b-1fadb2c92ac11753356233037-Mast--Harbour-Cable-Knit-Drop-Shoulder-Sleeves-Acrylic-Pullo-1.jpg",
        rating: 4.2,
        reviews: 76,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Cream", "Gray", "Navy"],
        inStock: true,
        features: ["100% Wool", "Machine Wash", "Ribbed Cuffs"]
    },
    {
        id: 7,
        name: "Silver Pendant Necklace",
        price: 340.99,
        originalPrice: 490.99,
        description: "Elegant silver pendant necklace with crystal accent. Perfect for special occasions.",
        category: "accessories",
        image: "https://stellajewellery.in/wp-content/uploads/2024/11/20241114_005451-scaled.jpg",
        rating: 4.8,
        reviews: 94,
        inStock: true,
        features: ["Sterling Silver", "Crystal Accent", "Adjustable Chain"]
    },
    {
        id: 8,
        name: "Denim Jacket",
        price: 690.99,
        originalPrice: 890.99,
        description: "Classic denim jacket with modern fit. Perfect for layering in transitional weather.",
        category: "women",
        image: "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/30659784/2024/12/3/6980bb36-31fb-431d-990a-289d15b5e9701733229891366-Roadster-Men-Jackets-6151733229890711-1.jpg",
        rating: 4.5,
        reviews: 134,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Light Wash", "Dark Wash", "Black"],
        inStock: true,
        features: ["100% Cotton", "Machine Wash", "Classic Fit"]
    }
];

// Cart functionality
let cart = [];
let cartCount = 0;
let currentFilter = 'all';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Load products
    loadProducts();

    // Setup event listeners
    setupEventListeners();

    // Initialize cart count
    updateCartCount();

    // Start countdown timer
    startCountdown();

    // Check theme preference
    checkThemePreference();
});

// Setup event listeners
function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleTheme);

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', validateNewsletter);

    // Contact form
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', validateContactForm);

    // Filter buttons
    document.querySelectorAll('[data-filter]').forEach(button => {
        button.addEventListener('click', filterProducts);
    });

    // Search functionality
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
        searchInput.addEventListener('input', searchProducts);
    }
}

// Load products to the page
function loadProducts(filter = 'all') {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(product => product.category === filter);

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create product card HTML
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'col-md-6 col-lg-3 mb-4';
    productCard.innerHTML = `
        <div class="card product-card h-100">
            <div class="product-image position-relative">
                ${product.originalPrice ? `<span class="product-badge badge bg-danger">Sale</span>` : ''}
                <div class="product-actions">
                    <button class="btn btn-light btn-sm quick-view" data-id="${product.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-light btn-sm add-to-wishlist" data-id="${product.id}">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                <div class="h-100 d-flex align-items-center justify-content-center">
                    <div class="text-center text-muted">
                        
                        <img src="${product.image}" alt="Image">
                    </div>
                </div>
            </div>
            <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h5 class="card-title">${product.name}</h5>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <span class="ms-1">${product.rating}</span>
                    </div>
                </div>
                <p class="card-text flex-grow-1 small">${product.description}</p>
                <div class="d-flex justify-content-between align-items-center mt-auto">
                    <div class="price">
                        ${product.originalPrice ?
            `<span class="text-muted text-decoration-line-through me-2">₹${product.originalPrice.toFixed(2)}</span>` :
            ''
        }
                        <span class="h5 mb-0 text-primary">₹${product.price.toFixed(2)}</span>
                    </div>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
                <div class="mt-2">
                    <small class="text-muted">${product.reviews} reviews</small>
                </div>
            </div>
        </div>
    `;

    // Add event listeners to buttons
    const addToCartBtn = productCard.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => addToCart(product.id));

    const quickViewBtn = productCard.querySelector('.quick-view');
    quickViewBtn.addEventListener('click', () => showQuickView(product));

    const wishlistBtn = productCard.querySelector('.add-to-wishlist');
    wishlistBtn.addEventListener('click', () => addToWishlist(product.id));

    return productCard;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product) {
        // Check if product is already in cart
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        cartCount += 1;
        updateCartCount();

        // Show confirmation message
        showNotification(`${product.name} added to cart!`, 'success');

        // Update cart modal if open
        updateCartModal();
    }
}

// Update cart count in navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Show quick view modal
function showQuickView(product) {
    // In a real application, this would open a modal with product details
    showNotification(`Quick view: ${product.name}`, 'info');
}

// Add to wishlist
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        showNotification(`${product.name} added to wishlist!`, 'success');

        // Toggle heart icon
        const wishlistBtn = document.querySelector(`.add-to-wishlist[data-id="${productId}"]`);
        if (wishlistBtn) {
            const icon = wishlistBtn.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            icon.classList.toggle('text-danger');
        }
    }
}

// Filter products by category
function filterProducts(event) {
    const filter = event.target.getAttribute('data-filter');
    currentFilter = filter;

    // Update active button
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Load filtered products
    loadProducts(filter);
}

// Search products
function searchProducts(event) {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm.length < 2) {
        loadProducts(currentFilter);
        return;
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification`;
    notification.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <span>${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Toggle dark/light theme
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
}

// Check for saved theme preference
function checkThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Validate newsletter form
function validateNewsletter(event) {
    event.preventDefault();

    const email = document.getElementById('newsletterEmail');
    const messageDiv = document.getElementById('newsletterMessage');

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value)) {
        messageDiv.innerHTML = '<div class="alert alert-danger">Please enter a valid email address.</div>';
        return;
    }

    // If validation passes
    messageDiv.innerHTML = '<div class="alert alert-success">Thank you for subscribing to our newsletter!</div>';
    email.value = '';

    // Clear message after 5 seconds
    setTimeout(() => {
        messageDiv.innerHTML = '';
    }, 5000);
}

// Validate contact form
function validateContactForm(event) {
    event.preventDefault();

    const form = event.target;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    let isValid = true;

    // Reset validation styles
    [name, email, subject, message].forEach(field => {
        field.classList.remove('is-invalid');
    });

    // Validate name
    if (name.value.trim() === '') {
        name.classList.add('is-invalid');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    }

    // Validate subject
    if (subject.value.trim() === '') {
        subject.classList.add('is-invalid');
        isValid = false;
    }

    // Validate message
    if (message.value.trim() === '') {
        message.classList.add('is-invalid');
        isValid = false;
    }

    // If form is valid
    if (isValid) {
        // In a real application, you would send the form data to a server here
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        form.reset();
    }
}

// Countdown timer for special offer
function startCountdown() {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 7); // 7 days from now

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
        document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownTimer);
            document.querySelector('.countdown').innerHTML = "Sale Ended!";
        }
    }

    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);
}

// Update cart modal
function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartItems) return;

    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-muted py-4">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item d-flex align-items-center';
        cartItem.innerHTML = `
            <div class="cart-item-image me-3">
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
            <div class="flex-grow-1">
                <h6 class="mb-1">${item.name}</h6>
                <p class="mb-1 text-muted">$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
                </div>
            </div>
            <div class="text-end">
                <div class="fw-bold">$${itemTotal.toFixed(2)}</div>
                <button class="btn btn-sm btn-outline-danger remove-item mt-2" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    // Add event listeners to quantity buttons
    document.querySelectorAll('.increase-quantity').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            increaseQuantity(id);
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            decreaseQuantity(id);
        });
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            removeFromCart(id);
        });
    });

    cartTotal.textContent = total.toFixed(2);
}

// Increase item quantity
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        cartCount += 1;
        updateCartCount();
        updateCartModal();
    }
}

// Decrease item quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        cartCount -= 1;
        updateCartCount();
        updateCartModal();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cartCount -= cart[itemIndex].quantity;
        cart.splice(itemIndex, 1);
        updateCartCount();
        updateCartModal();
        showNotification('Item removed from cart', 'info');
    }
}