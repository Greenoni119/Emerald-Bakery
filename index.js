const mobileMenuButton = document.getElementById('mobile-menu-button');
const closeMenuButton = document.getElementById('close-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.add('open');
});

closeMenuButton.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
});

const mobileNavLinks = mobileMenu.querySelectorAll('a');
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

const products = [
  {
    id: 1,
    name: "Mini Custom Decorated Sugar Cookies (2 inch)",
    price: 42.00,
    image: "images/download-3.webp",
    category: "cookies",
    description: "Sold by the dozen. Custom designs available for any theme.",
    options: ["Quantity (dozens)"]
  },
  {
    id: 2,
    name: "Regular-Size Custom Decorated Sugar Cookies (3-4 inch)",
    price: 48.00,
    image: "images/download-4.webp",
    category: "cookies",
    description: "Sold by the dozen. Custom designs available for any theme.",
    options: ["Quantity (dozens)"]
  },
  {
    id: 3,
    name: "Smores Stuffed Chocolate Chip Cookies",
    price: 40.00,
    image: "images/download.webp",
    category: "cookies",
    description: "Sold by the dozen. Made with honey graham crackers, marshmallows, and chocolate.",
    options: ["Quantity (dozens)"]
  },
  {
    id: 4,
    name: "Cranberry-Orange Scone (Regular Size)",
    price: 40.00,
    image: "images/download-1.webp",
    category: "scones",
    description: "Sold by the dozen. Made with cranberries, fresh orange peel.",
    options: ["Quantity (dozens)"]
  },
  {
    id: 5,
    name: "Cranberry-Orange Scookie (Cookie Sized Scone)",
    price: 20.00,
    image: "images/download-1.webp",
    category: "scones",
    description: "Sold by the dozen. Made with cranberries, fresh orange peel.",
    options: ["Quantity (dozens)"]
  },
  {
    id: 6,
    name: "Mini Cupcakes (Standard Flavors)",
    price: 25.00,
    image: "images/download-2.webp",
    category: "cupcakes",
    description: "Sold by the dozen. Additional customizations can be requested.",
    options: ["Quantity (dozens)", "Flavor"],
    flavors: ["Vanilla Cake/Vanilla Frosting", "Vanilla Cake/Chocolate Frosting", "Chocolate Cake/Vanilla Frosting", "Chocolate Cake/Chocolate Frosting"]
  },
  {
    id: 7,
    name: "Mini Cupcakes (Custom Flavors)",
    price: 30.00,
    image: "images/download-2.webp",
    category: "cupcakes",
    description: "Sold by the dozen. Specialty flavors available.",
    options: ["Quantity (dozens)", "Flavor"],
    flavors: ["Confetti", "Chocolate-Raspberry", "Dulce de Leche", "Red Velvet", "Tiramisu", "Vanilla-Berry"]
  },
  {
    id: 8,
    name: "Cupcakes (Standard Flavors)",
    price: 45.00,
    image: "images/download-2.webp",
    category: "cupcakes",
    description: "Sold by the dozen. Regular-sized cupcakes.",
    options: ["Quantity (dozens)", "Flavor"],
    flavors: ["Vanilla Cake/Vanilla Frosting", "Vanilla Cake/Chocolate Frosting", "Chocolate Cake/Vanilla Frosting", "Chocolate Cake/Chocolate Frosting"]
  },
  {
    id: 9,
    name: "Cupcakes (Custom Flavors)",
    price: 50.00,
    image: "images/download-2.webp",
    category: "cupcakes",
    description: "Sold by the dozen. Specialty flavors available.",
    options: ["Quantity (dozens)", "Flavor"],
    flavors: ["Confetti", "Chocolate-Raspberry", "Dulce de Leche", "Red Velvet", "Tiramisu", "Vanilla-Berry"]
  },
  {
    id: 10,
    name: "9\" Frosted 2-Layer Cake (Standard Flavors)",
    price: 65.00,
    image: "images/download-2.webp",
    category: "cakes",
    description: "Price may vary with added toppings and fillings.",
    options: ["Quantity", "Flavor"],
    flavors: ["Vanilla Cake/Vanilla Frosting", "Vanilla Cake/Chocolate Frosting", "Chocolate Cake/Vanilla Frosting", "Chocolate Cake/Chocolate Frosting"]
  },
  {
    id: 11,
    name: "9\" Frosted 2-Layer Cake (Custom Flavors)",
    price: 75.00,
    image: "images/download-2.webp",
    category: "cakes",
    description: "Price may vary with added toppings and fillings.",
    options: ["Quantity", "Flavor"],
    flavors: ["Confetti", "Chocolate-Raspberry", "Dulce de Leche", "Red Velvet", "Tiramisu", "Vanilla-Berry"]
  },
  {
    id: 12,
    name: "Emerald Sampler",
    price: 65.00,
    image: "images/download-3.webp",
    category: "packages",
    description: "1 dozen regular-sized Cranberry-Orange Scones and 1 dozen Smores Stuffed Chocolate Chip Cookies.",
    options: ["Quantity"]
  }
];

// Initialize cart from localStorage or empty array if none exists
let cart = JSON.parse(localStorage.getItem('emeraldBakeryCart') || '[]');

// Update cart display immediately on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartDisplay();
});

const productsGrid = document.getElementById('products-grid');
const cartCount = document.getElementById('cart-count');
const mobileCartCount = document.getElementById('mobile-cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const viewCartBtn = document.getElementById('view-cart-btn');
const mobileViewCartBtn = document.getElementById('mobile-view-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartModal = document.getElementById('cart-modal');
const checkoutForm = document.getElementById('checkout-form');
const formOrderDetails = document.getElementById('form-order-details');
const formOrderTotal = document.getElementById('form-order-total');
const confirmationModal = document.getElementById('confirmation-modal');
const closeConfirmationBtn = document.getElementById('close-confirmation-btn');
const categoryButtons = document.querySelectorAll('.category-btn');

function displayProducts(category = 'all') {
  productsGrid.innerHTML = '';
  
  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(product => product.category === category);
  
  filteredProducts.forEach(product => {
    const productHTML = `
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="h-40 overflow-hidden">
          <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
        </div>
        <div class="p-4">
          <h4 class="font-bold text-green-800">${product.name}</h4>
          <p class="text-sm text-gray-600 mb-2">${product.description}</p>
          <div class="flex justify-between items-center">
            <span class="font-bold text-green-700">$${product.price.toFixed(2)}</span>
            <button class="add-to-cart-btn bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-lg text-sm" 
              data-id="${product.id}">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
    
    productsGrid.innerHTML += productHTML;
  });
  
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
      const productId = parseInt(button.getAttribute('data-id'));
      const product = products.find(p => p.id === productId);
      
      showProductOptionsModal(product);
    });
  });
}

function showProductOptionsModal(product) {
  const modalElement = document.createElement('div');
  modalElement.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  
  let flavorOptionsHTML = '';
  if (product.flavors) {
    flavorOptionsHTML = `
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Flavor</label>
        <select id="product-flavor" class="w-full px-3 py-2 border border-gray-300 rounded-md">
          ${product.flavors.map(flavor => `<option value="${flavor}">${flavor}</option>`).join('')}
        </select>
      </div>
    `;
  }
  
  modalElement.innerHTML = `
    <div class="bg-white rounded-xl max-w-md w-full p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold text-green-800">${product.name}</h3>
        <button class="close-options-modal text-gray-500 hover:text-gray-700">
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">${product.options[0]}</label>
        <select id="product-quantity" class="w-full px-3 py-2 border border-gray-300 rounded-md">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
      
      ${flavorOptionsHTML}
      
      <div class="flex justify-end">
        <button id="add-to-cart-confirm" class="bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-6 rounded-lg">
          Add to Cart
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modalElement);
  
  modalElement.querySelector('.close-options-modal').addEventListener('click', () => {
    document.body.removeChild(modalElement);
  });
  
  modalElement.querySelector('#add-to-cart-confirm').addEventListener('click', () => {
    const quantity = parseInt(modalElement.querySelector('#product-quantity').value);
    let flavor = '';
    
    if (product.flavors) {
      flavor = modalElement.querySelector('#product-flavor').value;
    }
    
    addToCart(product, quantity, flavor);
    document.body.removeChild(modalElement);
  });
}

function addToCart(product, quantity, flavor = '') {
  const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: quantity,
    flavor: flavor,
    subtotal: product.price * quantity
  };
  
  const existingItemIndex = cart.findIndex(item => 
    item.id === cartItem.id && item.flavor === cartItem.flavor
  );
  
  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += quantity;
    cart[existingItemIndex].subtotal = cart[existingItemIndex].price * cart[existingItemIndex].quantity;
  } else {
    cart.push(cartItem);
  }
  
  updateCartDisplay();
  
  const feedback = document.createElement('div');
  feedback.className = 'fixed bottom-5 right-5 bg-green-700 text-white py-2 px-4 rounded-lg shadow-lg z-50';
  feedback.innerHTML = 'Item added to cart';
  document.body.appendChild(feedback);
  
  setTimeout(() => {
    document.body.removeChild(feedback);
  }, 2000);
}

function updateCartDisplay() {
  // Save cart to localStorage
  localStorage.setItem('emeraldBakeryCart', JSON.stringify(cart));

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
  if (mobileCartCount) mobileCartCount.textContent = totalItems;
  
  cartItems.innerHTML = '';
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
  } else {
    cart.forEach((item, index) => {
      const itemHTML = `
        <div class="flex items-center border-b pb-4 mb-4">
          <div class="w-16 h-16 mr-4">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover rounded">
          </div>
          <div class="flex-1">
            <h4 class="font-medium">${item.name}</h4>
            ${item.flavor ? `<p class="text-sm text-gray-600">Flavor: ${item.flavor}</p>` : ''}
            <div class="flex justify-between items-center mt-2">
              <div class="flex items-center">
                <button class="decrease-quantity bg-gray-200 px-2 rounded-l" data-index="${index}">-</button>
                <span class="px-3 bg-gray-100">${item.quantity}</span>
                <button class="increase-quantity bg-gray-200 px-2 rounded-r" data-index="${index}">+</button>
              </div>
              <span class="font-medium">$${item.subtotal.toFixed(2)}</span>
            </div>
          </div>
          <button class="remove-item ml-4 text-red-500" data-index="${index}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `;
      
      cartItems.innerHTML += itemHTML;
    });
  }
  
  const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
  formOrderTotal.value = `$${total.toFixed(2)}`;
  
  const orderDetails = cart.map(item => {
    return `${item.name} x ${item.quantity} ${item.flavor ? `(${item.flavor})` : ''} - $${item.subtotal.toFixed(2)}`;
  }).join('\n');
  formOrderDetails.value = orderDetails;
  
  const jotformProductsContainer = document.getElementById('jotform-products-container');
  jotformProductsContainer.innerHTML = '';
  
  cart.forEach(item => {
    let productId = getJotformProductId(item.id);
    if (productId) {
      const productCheckbox = document.createElement('input');
      productCheckbox.type = 'checkbox';
      productCheckbox.name = 'q43_myProducts[][id]';
      productCheckbox.value = productId;
      productCheckbox.checked = true;
      jotformProductsContainer.appendChild(productCheckbox);
      
      const quantityField = document.createElement('input');
      quantityField.type = 'hidden';
      quantityField.name = `q43_myProducts[special_${productId}][item_0]`;
      quantityField.value = item.quantity;
      jotformProductsContainer.appendChild(quantityField);
      
      if (item.flavor) {
        const flavorField = document.createElement('input');
        flavorField.type = 'hidden';
        flavorField.name = `q43_myProducts[special_${productId}][item_1]`;
        flavorField.value = item.flavor;
        jotformProductsContainer.appendChild(flavorField);
      }
    }
  });
  
  document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.getAttribute('data-index'));
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        cart[index].subtotal = cart[index].price * cart[index].quantity;
        updateCartDisplay();
      }
    });
  });
  
  document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.getAttribute('data-index'));
      cart[index].quantity++;
      cart[index].subtotal = cart[index].price * cart[index].quantity;
      updateCartDisplay();
    });
  });
  
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.getAttribute('data-index'));
      cart.splice(index, 1);
      updateCartDisplay();
    });
  });
}

function getJotformProductId(id) {
  const productMap = {
    1: "1013", 
    2: "1004", 
    3: "1005", 
    4: "1001", 
    5: "1006", 
    6: "1011", 
    7: "1012", 
    8: "1002", 
    9: "1003", 
    10: "1007", 
    11: "1008", 
    12: "1010", 
  };
  
  return productMap[id] || null;
}

viewCartBtn.addEventListener('click', () => {
  cartModal.classList.remove('hidden');
});

if (mobileViewCartBtn) {
  mobileViewCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('hidden');
    mobileMenu.classList.remove('open');
  });
}

closeCartBtn.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

checkoutForm.addEventListener('submit', (e) => {
  if (cart.length === 0) {
    e.preventDefault();
    alert('Your cart is empty!');
    return;
  }
  
  const deliveryDate = document.getElementById('delivery-date').value;
  if (deliveryDate) {
    const date = new Date(deliveryDate);
    const month = document.createElement('input');
    month.type = 'hidden';
    month.name = 'q45_desiredDelivery[month]';
    month.value = date.getMonth() + 1;
    
    const day = document.createElement('input');
    day.type = 'hidden';
    day.name = 'q45_desiredDelivery[day]';
    day.value = date.getDate();
    
    const year = document.createElement('input');
    year.type = 'hidden';
    year.name = 'q45_desiredDelivery[year]';
    year.value = date.getFullYear();
    
    checkoutForm.appendChild(month);
    checkoutForm.appendChild(day);
    checkoutForm.appendChild(year);
  }
  
  const jotformFields = [
    { name: 'simple_spc', value: '242531013871145' },
    { name: 'q43_myProducts[payment_total]', value: cart.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2) }
  ];
  
  jotformFields.forEach(field => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = field.name;
    input.value = field.value;
    checkoutForm.appendChild(input);
  });
  
  localStorage.setItem('orderSubmitted', 'true');
});

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('orderSubmitted') === 'true') {
    confirmationModal.classList.remove('hidden');
    localStorage.removeItem('orderSubmitted');
    
    cart = [];
    updateCartDisplay();
  }

  // Update sticky categories container position
  const categoriesContainer = document.getElementById('categories-container');
  if (categoriesContainer) {
    const stickyContainer = categoriesContainer.querySelector('div');
    const headerHeight = document.querySelector('header').offsetHeight;
    stickyContainer.style.top = (headerHeight + 4) + 'px';
  }
});

closeConfirmationBtn.addEventListener('click', () => {
  confirmationModal.classList.add('hidden');
});

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(btn => {
      btn.classList.remove('bg-green-700', 'text-white');
      btn.classList.add('hover:bg-green-100');
    });
    
    button.classList.add('bg-green-700', 'text-white');
    button.classList.remove('hover:bg-green-100');
    
    const category = button.getAttribute('data-category');
    displayProducts(category);
  });
});

displayProducts();