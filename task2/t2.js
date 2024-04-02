'use strict';

import { restaurantModal, restaurantRow } from "./components.js";
import { fetchAPI } from "./utils.js";

const getAPI = async () => {
    try {
        const response = await fetchAPI('restaurants');
        displayRestaurants(response);
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
        alert('Failed to fetch restaurant data. Please try again later.');
    }
};


const getMenu = async (restaurantID) => {
    try {
        const response = await fetch(`https://10.120.32.94/restaurant/api/v1/restaurants/daily/${restaurantID}/fi`);
        if (!response.ok) {
            throw new Error('Failed to fetch menu data');
        }
        const menu = await response.json();
        return menu;
    } catch (error) {
        console.error('Error fetching menu data:', error);
        alert('Failed to fetch menu data. Please try again later.');
    }
}

const displayRestaurants = (restaurants) => {
    const table = document.querySelector('table');
    restaurants.forEach(restaurant => {
        const row = restaurantRow(restaurant);

        row.addEventListener('click', async () => {
            document.querySelectorAll('tr').forEach(item => {
                item.classList.remove('highlight');
            });

            row.classList.add('highlight');
            const menu = await getMenu(restaurant._id);
            openModal(restaurant, menu);
        });
        table.appendChild(row);
    });
};

const openModal = (restaurant, menu) => {
    const modal = document.querySelector('dialog');
    const modalContent = restaurantModal(restaurant, menu);
    modal.innerHTML = modalContent;
    modal.showModal();

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
        modal.close();
    });

    modal.appendChild(closeButton);
}

getAPI();