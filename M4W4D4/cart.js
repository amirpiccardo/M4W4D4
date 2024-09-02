const cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing content

    cart.forEach(item => {
        const col = document.createElement('div');
        const card = document.createElement('div');
        const img = document.createElement('img');
        const cardBody = document.createElement('div');
        const title = document.createElement('h5');
        const quantity = document.createElement('p');
        const removeButton = document.createElement('button');

        col.classList.add('col');
        card.classList.add('card', 'h-100');
        img.classList.add('card-img-top');
        img.src = item.imageUrl;
        img.alt = item.name;
        img.style.height = '150px';
        img.style.objectFit = 'cover';

        cardBody.classList.add('card-body');
        title.classList.add('card-title');
        quantity.classList.add('card-text');
        removeButton.classList.add('btn', 'btn-danger', 'btn-sm');

        title.textContent = item.name;
        quantity.textContent = `Quantity: ${item.quantity} | Price: $${item.price.toFixed(2)} each`;
        removeButton.textContent = 'Remove';

        removeButton.addEventListener('click', () => {
            removeFromCart(item._id);
        });

        cardBody.append(title, quantity, removeButton);
        card.append(img, cardBody);
        col.append(card);
        cartItemsContainer.append(col);
    });

    updateCartTotal();
}

function updateCartTotal() {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function removeFromCart(productId) {
    const updatedCart = cart.filter(item => item._id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.location.reload(); // Reload the page to reflect changes
}

displayCart();
