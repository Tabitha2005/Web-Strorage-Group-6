/**
 * Task 3: Session-Specific Shopping Cart
 * Implements shopping cart functionality using sessionStorage
 */

// Sample products for the store
const PRODUCTS = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Smartphone', price: 699.99 },
  { id: 3, name: 'Tablet', price: 399.99 },
  { id: 4, name: 'Headphones', price: 149.99 },
  { id: 5, name: 'Smart Watch', price: 249.99 },
];

/**
 * Initialize cart system on page load
 * Display products and set up event listeners
 */
function initializeCart() {
  displayProducts();
  renderCart();
  attachCartEventListeners();
}

/**
 * Display all products in the product list
 */
function displayProducts() {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  PRODUCTS.forEach((product) => {
    const productElement = document.createElement('div');
    productElement.className = 'product-card';
    productElement.innerHTML = `
      <div class="product-header">
        <h3>${product.name}</h3>
        <span class="product-price">$${product.price.toFixed(2)}</span>
      </div>
      <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}">
        Add to Cart
      </button>
    `;
    productList.appendChild(productElement);
  });
}

/**
 * Get the current cart from sessionStorage
 * Returns an array of cart items
 * CORRECT IMPLEMENTATION: Uses JSON.parse() to properly deserialize the stored array
 */
function getCart() {
  const cartData = sessionStorage.getItem('cart');
  // This is the CORRECT approach - it properly handles null from sessionStorage
  const cart = JSON.parse(cartData) || [];
  return cart;
}

/**
 * Save cart to sessionStorage
 */
function saveCart(cart) {
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Add a product to the cart
 * If product already exists, increment quantity; otherwise add new item
 */
function addToCart(productName, productPrice) {
  const cart = getCart();

  // Check if product already exists in cart
  const existingItem = cart.find((item) => item.product === productName);

  if (existingItem) {
    // Product already in cart - increment quantity
    existingItem.quantity += 1;
    console.log(`✓ Increased quantity of ${productName} to ${existingItem.quantity}`);
  } else {
    // New product - add to cart
    cart.push({
      product: productName,
      quantity: 1,
      price: productPrice,
    });
    console.log(`✓ Added ${productName} to cart`);
  }

  // Save updated cart to sessionStorage
  saveCart(cart);

  // Re-render cart display
  renderCart();
}

/**
 * Render the cart items in the DOM
 * Display product name, quantity, and subtotal for each item
 * Display the total at the bottom
 */
function renderCart() {
  const cart = getCart();
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount');

  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Cart is empty</p>';
    cartTotal.textContent = '0.00';
    cartCount.textContent = '0';
    return;
  }

  let total = 0;
  let itemCount = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    itemCount += item.quantity;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-details">
        <div class="cart-item-name">${item.product}</div>
        <div class="cart-item-info">
          <span>Qty: <strong>${item.quantity}</strong></span>
          <span>Price: <strong>$${item.price.toFixed(2)}</strong></span>
          <span>Subtotal: <strong>$${subtotal.toFixed(2)}</strong></span>
        </div>
      </div>
      <div class="cart-item-actions">
        <button class="btn btn-small btn-secondary remove-item-btn" data-index="${index}">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = itemCount;

  // Attach remove button listeners
  const removeButtons = document.querySelectorAll('.remove-item-btn');
  removeButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      removeFromCart(parseInt(this.dataset.index));
    });
  });
}

/**
 * Remove an item from the cart by index
 */
function removeFromCart(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    const removedItem = cart[index];
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
    console.log(`✓ Removed ${removedItem.product} from cart`);
  }
}

/**
 * Clear the entire cart
 * Removes the cart from sessionStorage
 */
function clearCart() {
  if (confirm('Are you sure you want to clear the cart?')) {
    sessionStorage.removeItem('cart');
    renderCart();
    console.log('✓ Cart cleared | sessionStorage cart removed');
  }
}

/**
 * Attach event listeners for cart functionality
 */
function attachCartEventListeners() {
  // Add to cart buttons
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  addToCartBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const productName = this.dataset.productName;
      const productPrice = parseFloat(this.dataset.productPrice);
      addToCart(productName, productPrice);
    });
  });

  // Clear cart button
  const clearCartBtn = document.getElementById('clearCartBtn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }
}

// Initialize cart when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCart);
} else {
  initializeCart();
}