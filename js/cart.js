let cart = [];

const addToCart = (phoneName) => {
    cart.push(phoneName);
    updateCartUI();
    updateCartCount();
};

const removeFromCart = (phoneName) => {
    cart = cart.filter(item => item !== phoneName);
    updateCartUI();
    updateCartCount();
};

const updateCartUI = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(phone => {
        const li = document.createElement('li');
        li.textContent = phone;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'btn btn-error btn-sm ml-2 mt-5 gap-5';
        removeButton.onclick = () => removeFromCart(phone);

        li.appendChild(removeButton);
        cartItemsContainer.appendChild(li);
    });
};

const updateCartCount = () => {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
};

const toggleCart = () => {
    const cartModal = document.getElementById('cart_modal');
    if (cartModal.open) {
        closeCart();
    } else {
        cartModal.showModal();
    }
};
//for closing the cart
const closeCart = () => {
    const cartModal = document.getElementById('cart_modal');
    cartModal.close();
};
