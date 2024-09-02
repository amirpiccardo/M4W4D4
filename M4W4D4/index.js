import { startLoading, stopLoading } from './loader.js';
import { getHeaders } from './autorizzazione.js';

const cart = JSON.parse(localStorage.getItem('cart')) || [];

async function fetchProducts() {
    startLoading();
    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
            method: 'GET',
            headers: getHeaders()
        });
        const products = await response.json();
        stopLoading();
        displayProducts(products);
    } catch (error) {
        stopLoading();
        console.error("Error fetching products:", error);
        alert("Error fetching products");
    }
}

function displayProducts(products) {
    const target = document.getElementById('target');
    target.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        const col = document.createElement('div');
        const card = document.createElement('div');
        const img = document.createElement('img');
        const cardBody = document.createElement('div');
        const title = document.createElement('h5');
        const link = document.createElement('a');
        const deleteButton = document.createElement('button');
        const editButton = document.createElement('a');
        const addToCartButton = document.createElement('button');

        col.classList.add('col');
        card.classList.add('card', 'h-100');
        img.classList.add('card-img-top');
        img.src = product.imageUrl;
        img.alt = product.name;
        img.style.height = '150px';
        img.style.objectFit = 'cover';

        cardBody.classList.add('card-body');
        title.classList.add('card-title');
        link.classList.add('btn', 'btn-primary', 'btn-sm');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
        editButton.classList.add('btn', 'btn-warning', 'btn-sm', 'ms-2');
        addToCartButton.classList.add('btn', 'btn-success', 'btn-sm', 'ms-2');

        title.textContent = product.name;
        link.href = `prodotto.html?id=${product._id}`;
        link.textContent = 'View Details';
        deleteButton.textContent = 'Delete';
        editButton.href = `create.html?id=${product._id}`;
        editButton.textContent = 'Edit';
        addToCartButton.textContent = 'Add to Cart';

        addToCartButton.addEventListener('click', () => {
            addToCart(product);
        });

        deleteButton.addEventListener('click', async () => {
            if (confirm('Are you sure you want to delete this product?')) {
                startLoading();
                try {
                    await fetch(`https://striveschool-api.herokuapp.com/api/product/${product._id}`, {
                        method: 'DELETE',
                        headers: getHeaders()
                    });
                    stopLoading();
                    col.remove();
                } catch (error) {
                    stopLoading();
                    console.error("Error deleting product:", error);
                    alert("Error deleting product");
                }
            }
        });

        cardBody.append(title, link, editButton, deleteButton, addToCartButton);
        card.append(img, cardBody);
        col.append(card);
        target.append(col);
    });

    updateCartCount();
}

function addToCart(product) {
    const existingProduct = cart.find(item => item._id === product._id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

fetchProducts();
