
// ===================================
// MAHI SWEETS - WEBSITE JAVASCRIPT
// ===================================

// WhatsApp Business Number
const whatsappNumber = "916299626227";

// Products
const products = [
  { id: 1, name: "Rasgulla", emoji: "🍥", price: null },
  { id: 2, name: "Gulab Jamun", emoji: "🍮", price: null },
  { id: 3, name: "Kaju Katli", emoji: "🍬", price: null },
  { id: 4, name: "Peda", emoji: "🟡", price: null },
  { id: 5, name: "Barfi", emoji: "🍡", price: null },
  { id: 6, name: "Samosa", emoji: "🥟", price: null },
  { id: 7, name: "Namkeen", emoji: "🥨", price: null }
];

let cart = [];

// Display Products
function displayProducts() {
  const list = document.getElementById("product-list");

  list.innerHTML = products.map(product => `
    <div class="product-card">
      <div class="product-art">${product.emoji}</div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>Fresh and delicious from MAHI SWEETS.</p>
        <p><b>${product.price === null ? "Price available soon" : "₹" + product.price}</b></p>
        <button class="add-btn" onclick="addToCart(${product.id})">
          Add to Cart +
        </button>
      </div>
    </div>
  `).join("");
}

// Add to Cart
function addToCart(id) {
  const product = products.find(item => item.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  alert(product.name + " added to cart!");
}

// Update Cart
function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.getElementById("cart-count").textContent = count;

  const items = document.getElementById("cart-items");

  if (cart.length === 0) {
    items.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cart-total").textContent = "Total: ₹0";
    return;
  }

  items.innerHTML = cart.map(item => `
    <div class="cart-row">
      <span>${item.emoji} ${item.name} × ${item.quantity}</span>
      <button onclick="removeItem(${item.id})">Remove</button>
    </div>
  `).join("");

  const allPricesAvailable = cart.every(item => item.price !== null);

  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity, 0
  );

  document.getElementById("cart-total").textContent =
    allPricesAvailable ? "Total: ₹" + total : "Total: Price to be confirmed";
}

// Remove Item
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Show Cart
function showCart() {
  document.getElementById("cart-modal").style.display = "flex";
  updateCart();
}

// Close Cart
function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

// WhatsApp Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Please add products to your cart first.");
    return;
  }

  const allPricesAvailable = cart.every(item => item.price !== null);

  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity, 0
  );

  let message = "Hello MAHI SWEETS! ❤️\n";
  message += "I want to place an order.\n\n";
  message += "My Order Details:\n";

  cart.forEach(item => {
    message += `${item.name} x ${item.quantity}`;

    if (item.price !== null) {
      message += ` = Rs. ${item.price * item.quantity}`;
    } else {
      message += " = Price confirmation required";
    }

    message += "\n";
  });

  message += "\n";

  message += allPricesAvailable
    ? `Total Amount: Rs. ${total}\n`
    : "Total Amount: To be confirmed by shop\n";

  message += "Payment: Cash on Delivery\n";
  message += "\nThank you!";

  const url =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

// Start Website
displayProducts();
updateCart();
