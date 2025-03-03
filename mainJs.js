document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        }
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here would be the AJAX call to your backend
            
            // For demo purposes, show a success message
            alert('Obrigado por se inscrever! Você receberá nossas novidades em ' + email);
            this.reset();
        });
    }

    // Cart functionality
    setupCart();
});

// Cart Setup
function setupCart() {
    // Load cart from localStorage if exists
    let cart = JSON.parse(localStorage.getItem('cdPerfumesCart')) || [];
    updateCartCount(cart.length);

    // Add to cart event listeners
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-name') || 'Produto';
            const productPrice = parseFloat(this.getAttribute('data-price')) || 0;
            const productImage = this.getAttribute('data-image') || '';
            const quantity = document.getElementById('quantity') ? parseInt(document.getElementById('quantity').value) : 1;
            const size = document.querySelector('input[name="size"]:checked') ? document.querySelector('input[name="size"]:checked').value : '100ml';
            
            addToCart(productName, productImage, productPrice, quantity, size);
        });
    });
}

// Add to cart function
function addToCart(name, image, price, quantity = 1, size = '100ml') {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cdPerfumesCart')) || [];
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.name === name && item.size === size
    );
    
    if (existingItemIndex > -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item
        cart.push({
            id: Date.now().toString(),
            name: name,
            image: image,
            price: price,
            quantity: quantity,
            size: size
        });
    }
    
    // Save updated cart
    localStorage.setItem('cdPerfumesCart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount(cart.length);
    
    // Show confirmation message
    showAddToCartConfirmation(name, quantity);
}

// Update cart count in header
function updateCartCount(count) {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

// Show add to cart confirmation
function showAddToCartConfirmation(productName, quantity) {
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('cart-notification');
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <p>${quantity}x ${productName} adicionado ao carrinho!</p>
            <a href="carrinho.html" class="view-cart">Ver Carrinho</a>
        </div>
        <button class="close-notification">×</button>
    `;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.right = '20px';
    notification.style.bottom = '20px';
    notification.style.backgroundColor = 'white';
    notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '9999';
    notification.style.display = 'flex';
    notification.style.justifyContent = 'space-between';
    notification.style.alignItems = 'center';
    notification.style.minWidth = '300px';
    
    // Style the notification content
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.display = 'flex';
    notificationContent.style.alignItems = 'center';
    notificationContent.style.gap = '10px';
    
    // Style the check icon
    const checkIcon = notification.querySelector('.fa-check-circle');
    checkIcon.style.color = '#4CAF50';
    checkIcon.style.fontSize = '20px';
    
    // Style the view cart link
    const viewCartLink = notification.querySelector('.view-cart');
    viewCartLink.style.marginLeft = '10px';
    viewCartLink.style.color = '#d4af37';
    viewCartLink.style.textDecoration = 'underline';
    
    // Style the close button
    const closeButton = notification.querySelector('.close-notification');
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.marginLeft = '10px';
    
    // Add the notification to the document
    document.body.appendChild(notification);
    
    // Add event listener to close button
    closeButton.addEventListener('click', function() {
        document.body.removeChild(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 5000);
}

// Handle quantity changes
function incrementQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    }
}

function decrementQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput && parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}
