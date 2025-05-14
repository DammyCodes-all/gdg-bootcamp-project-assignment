// =======================
// MiniStore Script
// =======================

// Cart and Product Variables
const cart = [];
let allProducts = [];

// Token Check for Authentication
const token = localStorage.getItem("token");

if (!token) {
  // Redirect to login if not logged in
  window.location.href = "login.html";
}

// -----------------------
// Logout Functionality
// -----------------------

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html"; // Adjust path if needed
}

const logoutBtn = document.querySelector(".logoutBtn");
logoutBtn.addEventListener("click", logout);

// -----------------------
// Cart Display Update
// -----------------------

const cartAmount = document.querySelector(".cartAmount");

function updateCartDisplay() {
  cartAmount.innerText = `${cart.length}`;
}

// -----------------------
// Display Products
// -----------------------

const productContainer = document.getElementById("productContainer");

function displayProducts(products) {
  products.forEach((product) => {
    productContainer.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="product-card">
        <img src="${product.image}" alt="${product.title}">
        <div class="product-card-content">
          <h3>${product.title}</h3>
          <p>${product.description.slice(0, 100)}...</p>
          <div class="price">$${product.price}</div>
          <button class="add-to-cart" data-index="${product.id}">
            Add to cart
          </button>
        </div>
      </div>
    `
    );
  });
}

// -----------------------
// Add to Cart (Event Delegation)
// -----------------------

productContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    const id = e.target.getAttribute("data-index");
    const product = allProducts.find((p) => p.id == id);

    if (product) {
      cart.push(product);
      updateCartDisplay();
    }
  }
});

// -----------------------
// Fetch Products from API
// -----------------------

async function fetchProducts() {
  
}

// -----------------------
// Initialize
// -----------------------

fetchProducts();
