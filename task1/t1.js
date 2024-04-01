'use strict';

async function getAPI() {
    try {
        const response = await fetch('https://10.120.32.94/restaurant/api/v1/restaurants');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const restaurants = await response.json();
        displayRestaurants(restaurants);
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
        alert('Failed to fetch restaurant data. Please try again later.');
    }
}

async function getMenu(restaurantID) {
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

function displayRestaurants(restaurants) {
    const table = document.querySelector('table');
    restaurants.forEach(restaurant => {
        const row = document.createElement('tr');

        const nameTD = document.createElement('td');
        nameTD.textContent = restaurant.name;

        nameTD.addEventListener('click', async () => {
            document.querySelectorAll('td').forEach(item => {
                item.classList.remove('highlight');
            });

            nameTD.classList.add('highlight');
            const menu = await getMenu(restaurant._id);
            openModal(restaurant, menu)
        });

        row.appendChild(nameTD);

        const addressTD = document.createElement('td');
        addressTD.textContent = restaurant.address;
        row.appendChild(addressTD);

        table.appendChild(row);
    });
}

function openModal(restaurant, menu) {
    const modal = document.querySelector('dialog');
    const modalContent = document.createElement('div');

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
        modal.close();
    });

    modalContent.appendChild(closeButton);

    const name = document.createElement('p');
    name.textContent = restaurant.name;
    modalContent.appendChild(name);

    const address = document.createElement('p');
    address.textContent = restaurant.address;
    modalContent.appendChild(address);

    const postal = document.createElement('p');
    postal.textContent = restaurant.postalCode;
    modalContent.appendChild(postal);

    const city = document.createElement('p');
    city.textContent = restaurant.city;
    modalContent.appendChild(city);

    const phone = document.createElement('p');
    phone.textContent = restaurant.phone;
    modalContent.appendChild(phone);

    const company = document.createElement('p');
    company.textContent = restaurant.company;
    modalContent.appendChild(company);
    console.log('Menu:', menu);

    const menuHeading = document.createElement('h3');
    menuHeading.textContent = 'Menu';
    modalContent.appendChild(menuHeading);

    const menuList = document.createElement('ul');
    menu.courses.forEach(course => {
        const menuItem = document.createElement('li');
        menuItem.textContent = `${course.name}: ${course.price} ${course.diets}`;
        menuList.appendChild(menuItem);
    });
    modalContent.appendChild(menuList);

    modal.innerHTML = '';
    modal.appendChild(modalContent);

    modal.showModal();
}

getAPI();