import { menuArray } from '/data.js';
// console.log(menuArray);
const modalCloseBtn = document.getElementById('close-btn');
const modal = document.getElementById('card-details-modal');
const completeOrderBtn = document.getElementById('order-btn');
const payBtn = document.getElementById('pay-btn');
const cardDetailsForm = document.getElementById('card-details-form');
const finalPart = document.getElementById('final-part');

function getMenuHtml() {
  return menuArray
    .map(function (menu) {
      let foodIngredients = menu.ingredients.join(',');

      // console.log(foodIngredients);
      return `
    <div class="menu-item">
      <div class = "item-info">
        <p id="emoji">${menu.emoji}</p>
        <div class="detail">
          <p class="food-name">${menu.name}</p>
          <p id="food-ingredients">${foodIngredients}</p>
          <p class="price">$${menu.price}</p>
        </div>
      </div>
      <button id="add-btn">+</button>
    </div>
  `;
    })
    .join('');
}

document.addEventListener('DOMContentLoaded', function () {
  // Function to remove an order item
  function removeOrderItem(event) {
    event.target.parentElement.remove();
    // console.log('ugauga', event.target.parentElement);

    updateTotalPrice();
  }

  // Function to calculate and update the total price
  function updateTotalPrice() {
    const orderItems = document.querySelectorAll('.order-item');
    let totalPrice = 0;

    orderItems.forEach((orderItem) => {
      const itemPrice = parseFloat(
        orderItem.querySelector('.price').textContent.replace('$', '')
      );
      totalPrice += itemPrice;
    });

    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `$${totalPrice}`;
  }

  // Add a click event listener for the "Add" button
  document.addEventListener('click', function (event) {
    if (event.target.id === 'add-btn') {
      // Find the parent menu item element
      const menuItem = event.target.closest('.menu-item');

      if (menuItem) {
        // Extract item details from the clicked menu item
        const itemName = menuItem.querySelector('.food-name').textContent;
        const itemPrice = parseFloat(
          menuItem.querySelector('.price').textContent.replace('$', '')
        );

        // Create a new element to display the selected item in the order summary
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <span class="food-name">${itemName}</span>
            <button class="remove-btn">remove</button>
            <span class="price" id="price">$${itemPrice}</span>
      `;
        // Add a click event listener to the "Remove" button
        orderItem
          .querySelector('.remove-btn')
          .addEventListener('click', removeOrderItem);

        // Append the selected item to the order summary
        const orderSummary = document.getElementById('order-summary');
        orderSummary.appendChild(orderItem);

        updateTotalPrice();
      }
    }
  });
});

// Add these functions to handle the card details modal
function openCardDetailsModal() {
  modal.style.display = 'block';
}

cardDetailsForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const cardDetailsFormData = new FormData(cardDetailsForm);
  // console.log(cardDetailsFormData);
  modal.style.display = 'none';
  const cardName = cardDetailsFormData.get('cardName');
  finalPart.innerHTML = `
    <div class="thanks-message">
    <p>Thanks, ${cardName}! Your order is on its way!</p>
    </div>
    `;
});

modalCloseBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});

completeOrderBtn.addEventListener('click', function () {
  openCardDetailsModal();
  // modal.style.display = 'inline';
});

// Function to handle the payment process
// payBtn.addEventListener('click', function () {
//   modal.style.display = 'none';
//   finalPart.innerHTML =
//   alert('Payment successful! Thank you for your order.');

// });

// Render Part
function render() {
  const listMenu = document.getElementById('list-menu');
  if (listMenu) {
    listMenu.innerHTML = getMenuHtml();
    modal.style.display = 'none';
  } else {
    console.error("Element with id 'list-menu' not found.");
  }
}

render();
