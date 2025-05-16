// =======================
// MiniStore Script
// =======================

// Cart and Product Variables
const cart = [];
const cartAmount = document.querySelector(".cartAmount");
let allProducts = [];

// Load cart from localStorage
const cartValue = localStorage.getItem("cartValue");
if (cartValue) {
  try {
    const parsedCart = JSON.parse(cartValue);
    cart.push(...parsedCart);
    updateCartDisplay();
  } catch (error) {
    console.error("Failed to parse cart from localStorage", error);
    localStorage.removeItem("cartValue");
  }
}

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
      localStorage.setItem("cartValue", JSON.stringify(cart))
    }
  }
});

// -----------------------
// Fetch Products from API
// -----------------------

async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products')
    if(!response.ok) {
      throw new Error('Something went wrong while fetching products');
    }
    allProducts = await response.json()
    const products = [];
    for (let i = 0; i < 12; i++) {
      const random = Math.floor(Math.random() * allProducts.length);
      products.push(allProducts[random]);
    }
    return displayProducts(products);
  } catch (error) {
    console.error(error)
  }
}

// -----------------------
// Initialize
// -----------------------

fetchProducts();
