import { startLoading, stopLoading } from "./loader.js";
import { getHeaders } from './autorizzazione.js'; // Aggiungi questa riga

const name = document.getElementById('name');
const price = document.getElementById('price');
const avaible = document.getElementById('avaible');
const save = document.getElementById('save');
const url = new URLSearchParams(location.search);
const id = url.get('id');

async function fillForm() {
    startLoading();
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: 'GET',
            headers: getHeaders() // Usa getHeaders per includere il token
        });
        const data = await response.json();
        stopLoading();

        name.value = data.name;
        price.value = dati.price;
        avaible.checked = dati.avaible;
    } catch (err) {
        stopLoading();
        console.error("Errore nel caricamento del prodotto:", err);
        alert("Errore nel caricamento del prodotto");
    }
}

fillForm();

save.addEventListener('click', updateCellulare);

async function updateCellulare(e) {
    e.preventDefault();

    const cellulare = {
        name: name.value,
        price: Number(price.value),
        avaible: avaible.checked
    };

    startLoading();
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: 'PUT',
            headers: getHeaders(), // Usa getHeaders per includere il token
            body: JSON.stringify(cellulare)
        });
        const data = await response.json();
        stopLoading();
        
        alert('Cellulare aggiornato con successo');
    } catch (err) {
        stopLoading();
        console.error("Errore nell'aggiornamento del cellulare:", err);
        alert("Errore nell'aggiornamento del cellulare");
    }
}
