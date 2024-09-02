import { startLoading, stopLoading } from './loader.js';
import { getHeaders } from './autorizzazione.js';

const productId = new URLSearchParams(window.location.search).get('id');
const productContainer = document.getElementById('product-details');

async function loadProduct() {
    startLoading();
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            method: 'GET',
            headers: getHeaders()
        });
        const product = await response.json();
        stopLoading();
        console.log(product)
        productContainer.innerHTML = `
            <h1>${product.name}</h1>
            <img src="${product.imageUrl}" alt="Immagine non diponibile" width="300" heigth="300">
            <p>Prezzo: ${product.price}</p>
            <p>Brand: ${product.brand}</p>
            <p>Descrizione: ${product.description}</p>
        `;
    } catch (error) {
        stopLoading();
        console.error("Error loading product:", error);
        alert("Error loading product");
    }
}

loadProduct();