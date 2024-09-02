import { startLoading, stopLoading } from './loader.js';
import { getHeaders } from './autorizzazione.js';

const form = document.getElementById('product-form');
const pageTitle = document.getElementById('page-title');
const productId = new URLSearchParams(window.location.search).get('id');

if (productId) {
    pageTitle.textContent = 'Modify Product';
    await fillForm();
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const product = {
        name: form.modello.value,
        price: Number(form.prezzo.value),
        description: form.description.value ,
        brand: form.brand.value,
        imageUrl: form.imageUrl.value
    };

    console.log('Product to be sent:', product); 

    startLoading();
    try {
        const method = productId ? 'PUT' : 'POST';
        const url = productId 
            ? `https://striveschool-api.herokuapp.com/api/product/${productId}`
            : 'https://striveschool-api.herokuapp.com/api/product/';

        const response = await fetch(url, {
            method,
            headers: getHeaders(),
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
        }

        stopLoading();
        alert('Product saved successfully');
        window.location.href = 'index.html';
    } catch (error) {
        stopLoading();
        console.error("Error saving product:", error);
        alert("Error saving product");
    }
});

async function fillForm() {
    startLoading();
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
        }
        const product = await response.json();
        console.log(product)
        stopLoading();

        form.modello.value = product.name; 
        form.prezzo.value = product.price;
        form.description.value = product.description;
        form.brand.value = product.brand;
        form.imageUrl.value = product.imageUrl;
        
    } catch (error) {
        stopLoading();
        console.error("Error loading product data:", error);
        alert("Error loading product data");
    }
}