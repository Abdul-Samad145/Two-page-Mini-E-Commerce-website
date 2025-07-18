const products = [
  { id: 1, name: "Headphone", price: 5000, image: "https://d2v5dzhdg4zhx3.cloudfront.net/Test2024/ai_headphones_photoshoot/WEBP/style_3_graphics/thumb002.webp" },
  { id: 2, name: "Headphone", price: 7500, image: "https://img.freepik.com/premium-photo/headphones_920207-9738.jpg" },
  { id: 3, name: "Shoes", price: 30000, image: "https://cdn.prod.website-files.com/5ee0a01c741b15ab8ec28a14/65e1f1d29e9aa16e6e41e181_%3Fid%3D965.webp" },
  { id: 4, name: "Shoes", price: 9000, image: "https://img.freepik.com/premium-photo/pink-women-s-shoes_256487-192.jpg" },
   { id: 5, name: "iphone 16  ", price: 350000, image: "https://cdn.mockupnest.com/wp-content/uploads/edd/2024/09/01-Free-iPhone-16-Pro-Mockup.jpg" },
    { id: 6, name: "samsung s24", price: 480000, image: "https://cellmart.pk/wp-content/uploads/2024/07/S24-Ultra-Yellow-cellmart.jpg" },
     { id:7, name: "Hp Laptop ", price: 150000, image: "https://laptopmart.pk/wp-content/uploads/2024/03/pri1-1425-1911670-041223115415211-e1709537678585.jpg" },
];


function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = totalCount;
}

function goToCart() {
  window.location.href = "cart.html";
}



function renderProducts() {
  const container = document.getElementById("product-container");
  if (!container) return;

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Rs ${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}




function addToCart(id) {
  let cart = getCart();
  const index = cart.findIndex(item => item.id === id);
  if (index > -1) {
    cart[index].quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }
  setCart(cart);
  updateCartCount();
}


function renderCartPage() {
  const cartContainer = document.getElementById("cart-items");
  const cart = getCart();
  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  let totalQuantity = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <div>
        <h4>${product.name}</h4>
        <p>Rs ${product.price}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <div>
        <button onclick="changeQuantity(${item.id}, -1)">-</button>
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
      </div>
    `;

    cartContainer.appendChild(itemDiv);
    totalQuantity += item.quantity;
    totalPrice += item.quantity * product.price;
  });

  document.getElementById("total-quantity").textContent = totalQuantity;
  document.getElementById("total-price").textContent = totalPrice;
}


function changeQuantity(id, delta) {
  let cart = getCart();
  const index = cart.findIndex(item => item.id === id);

  if (index > -1) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    setCart(cart);
    renderCartPage();
  }
}


document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCartPage();
  updateCartCount();
});
