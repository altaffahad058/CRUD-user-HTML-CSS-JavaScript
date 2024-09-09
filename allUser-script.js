function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// event listener to the logout link
const messageElement = document.getElementById('message');
const messageContainer = document.getElementsByClassName('alluser-msg-container')[0];

document.getElementById("logout-link").addEventListener("click", function() {
    setTimeout(function() {
        window.location.href = './index.html';
    }, 2000);
    messageElement.textContent = "Logging Out........";
    messageContainer.style.display = 'flex';
});

const URL = "https://dummyjson.com/users";
const info = document.querySelector(".search-sec");
const cardContainer = document.querySelector(".cards-container");
let userCount = 0;

// Global variable to keep track of the card being edited
let cardToEdit;

function updateUserCount() {
    let numberOfUsers = document.querySelector("#searching-statement");
    numberOfUsers.innerText = `Locating ${userCount} User Accounts`;
}

// Function to create a user card HTML
function createUserCard(user, index) {
    return `
        <div class="card-template" id="card-${index}">
            <div class="card-header">
                <img class="card-img" src="${user.image}" alt="user-image">
                <div class="contact-email">
                    <div class="contact">
                        <p class="card-text">${user.phone}</p>
                        <i class="fa-solid fa-square-phone card-icon"></i>
                    </div>
                    <div class="email">
                        <p class="card-text">${user.email}</p>
                        <i class="fa-solid fa-square-envelope card-icon"></i>
                    </div>
                </div>
            </div>
            <div class="name-bday-addr">
                <div class="name">
                    <i class="fa-solid fa-user card-icon"></i>
                    <p class="card-text">${user.firstName} ${user.lastName}</p>
                </div>
                <div class="bday">
                    <i class="fa-solid fa-cake-candles card-icon"></i>
                    <p class="card-text">${user.birthDate}</p>
                </div>
                <div class="addr">
                    <i class="fa-solid fa-location-dot card-icon"></i>
                    <p class="card-text">${user.address}</p>
                </div>
            </div>
            <div class="gender-age">
                <p class="card-text"><label class="card-icon">Gender : </label>${user.gender}</p>
                <p class="card-text"><label class="card-icon">Age : </label>${user.age}</p>
            </div>
            <div class="edit-delete">
                <button class="card-text" id="edit-btn" type="button">Edit</button>
                <button class="card-text" id="delete-btn" type="button">Delete</button>
            </div>
        </div>
    `;
}

const getData = async () => {
    try {
        let response = await fetch(URL);
        let data = await response.json();
        let cardsHTML = '';
        userCount = 0; // Initialize userCount
        data.users.forEach((user, index) => {
            const cardId = `card-${index}`;
            cardsHTML += `
                <div class="card-template" id="${cardId}">
                    <div class="card-header">
                        <img class="card-img" src="${user.image}" alt="user-image">
                        <div class="contact-email">
                            <div class="contact">
                                <p class="card-text">${user.phone}</p>
                                <i class="fa-solid fa-square-phone card-icon"></i>
                            </div>
                            <div class="email">
                                <p class="card-text">${user.email}</p>
                                <i class="fa-solid fa-square-envelope card-icon"></i>
                            </div>
                        </div>
                    </div>
                    <div class="name-bday-addr">
                        <div class="name">
                            <i class="fa-solid fa-user card-icon"></i>
                            <p class="card-text"> ${user.firstName} ${user.lastName}</p>
                        </div>
                        <div class="bday">
                            <i class="fa-solid fa-cake-candles card-icon"></i>
                            <p class="card-text"> ${user.birthDate}</p>
                        </div>
                        <div class="addr">
                            <i class="fa-solid fa-location-dot card-icon"></i>
                            <p class="card-text"> ${user.address.address}</p>

                        </div>
                    </div>
                    <div class="gender-age">
                        <p class="card-text"><label class="card-icon">Gender : </label>${user.gender}</p>
                        <p class="card-text"><label class="card-icon">Age : </label>${user.age}</p>
                    </div>
                    <div class="edit-delete">
                        <button class="card-text" id="edit-btn" type="button">Edit</button>
                        <button class="card-text" id="delete-btn" type="button">Delete</button>
                    </div>
                </div>
            `;
            userCount++;
        });

        // Update the displayed user count
        updateUserCount();

        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        cardContainer.innerHTML = cardsHTML;
        info.appendChild(cardContainer);

        users.forEach((user, index) => {
            cardContainer.innerHTML += createUserCard(user, index + userCount);
            info.appendChild(cardContainer);
        });

        userCount = userCount + users.length;
        updateUserCount(); // Update the displayed user count initially

        //event listeners to the edit buttons
        document.querySelectorAll("#edit-btn").forEach(button => {
        button.addEventListener("click", showEditPopup);
        });

        //event listener to the save button in the edit popup
        document.getElementById("save-btn").addEventListener("click", saveChanges)

        document.querySelectorAll("#delete-btn").forEach(button => {
        button.addEventListener("click", showDeleteContainer);
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

getData();


function showEditPopup(event) {
    document.getElementById("edit-popup").classList.add("show");
    
    // Getting the card to be edited
    cardToEdit = event.target.closest('.card-template');
    
    if (!cardToEdit) return; // Exit if no card is found

    // Extract user data from the card
    const imageUrl = cardToEdit.querySelector('.card-img') ? cardToEdit.querySelector('.card-img').src : '';
    const nameText = cardToEdit.querySelector('.name-bday-addr .name .card-text') ? cardToEdit.querySelector('.name-bday-addr .name .card-text').textContent : '';
    const phoneNumber = cardToEdit.querySelector('.contact-email .contact .card-text') ? cardToEdit.querySelector('.contact-email .contact .card-text').textContent : '';
    const email = cardToEdit.querySelector('.contact-email .email .card-text') ? cardToEdit.querySelector('.contact-email .email .card-text').textContent : '';
    const address = cardToEdit.querySelector('.name-bday-addr .addr .card-text') ? cardToEdit.querySelector('.name-bday-addr .addr .card-text').textContent : '';
    const birthDateText = cardToEdit.querySelector('.name-bday-addr .bday .card-text') ? cardToEdit.querySelector('.name-bday-addr .bday .card-text').textContent : '';
    const ageText = cardToEdit.querySelector('.gender-age .card-text:nth-of-type(2)') ? cardToEdit.querySelector('.gender-age .card-text:nth-of-type(2)').textContent.split(': ')[1] : '';
    const genderText = cardToEdit.querySelector('.gender-age .card-text:nth-of-type(1)') ? cardToEdit.querySelector('.gender-age .card-text:nth-of-type(1)').textContent.split(': ')[1] : '';

    // Populating the edit popup fields
    document.getElementById('edit-image-url').value = imageUrl;
    
    // Ensuring that the nameText is split correctly
    const nameParts = nameText.trim().split(' ');
    document.getElementById('edit-first-name').value = nameParts[0] || '';
    document.getElementById('edit-last-name').value = nameParts.slice(1).join(' ') || '';
    
    document.getElementById('edit-phone-number').value = phoneNumber;
    document.getElementById('edit-email').value = email;
    document.getElementById('edit-address').value = address;
    
    // Format birthdate to YYYY-MM-DD if not already in that format
    if (birthDateText) {
        const birthDate = new Date(birthDateText);
        document.getElementById('edit-birth-date').value = birthDate.toISOString().split('T')[0];
    }
    
    document.getElementById('edit-age').value = ageText;
    document.getElementById('edit-gender').value = genderText;
}

// Function to hide the edit popup
function hideEditPopup() {
    document.getElementById("edit-popup").classList.remove("show");
}

function saveChanges() {
    if (!cardToEdit) {
        console.error('No card to edit. Please select a card first.');
        return;
    }

    // Update the card with the new data from the edit popup
    const imageUrl = document.getElementById('edit-image-url').value;
    const nameText = `${document.getElementById('edit-first-name').value} ${document.getElementById('edit-last-name').value}`;
    const phoneText = document.getElementById('edit-phone-number').value;
    const emailText = document.getElementById('edit-email').value;
    const addressText = document.getElementById('edit-address').value;
    const birthDateText = document.getElementById('edit-birth-date').value;
    const ageText = document.getElementById('edit-age').value;
    const genderText = document.getElementById('edit-gender').value;

    // Update the card with the new data
    const cardImg = cardToEdit.querySelector('.card-img');
    const nameElem = cardToEdit.querySelector('.name-bday-addr .name .card-text');
    const phoneElem = cardToEdit.querySelector('.contact-email .contact .card-text');
    const emailElem = cardToEdit.querySelector('.contact-email .email .card-text');
    const addressElem = cardToEdit.querySelector('.name-bday-addr .addr .card-text');
    const birthDateElem = cardToEdit.querySelector('.name-bday-addr .bday .card-text');
    const ageElem = cardToEdit.querySelector('.gender-age .card-text:nth-of-type(2)');
    const genderElem = cardToEdit.querySelector('.gender-age .card-text:nth-of-type(1)');

    if (cardImg) cardImg.src = imageUrl;
    if (nameElem) nameElem.textContent = nameText;
    if (phoneElem) phoneElem.textContent = phoneText;
    if (emailElem) emailElem.textContent = emailText;
    if (addressElem) addressElem.textContent = addressText;
    if (birthDateElem) birthDateElem.textContent = birthDateText;
    if (ageElem) ageElem.textContent = `Age: ${ageText}`;
    if (genderElem) genderElem.textContent = `Gender: ${genderText}`;

    hideEditPopup(); // Hide the popup after saving
    messageElement.textContent = "Changes have been saved!";
    messageContainer.style.display = 'flex'

    setTimeout(() => {
        messageElement.textContent = "";
        messageContainer.style.display = 'none';
    }, 2000); // 2000 milliseconds = 2 seconds  
}

// event listener to the close button
document.getElementById("cross-btn").addEventListener("click", hideEditPopup);
document.getElementById("cancel-btn").addEventListener("click", hideEditPopup);

// Function to show the delete container
function showDeleteContainer(event) {
    document.getElementById("delete-popup").classList.add("show");
    
    // Get the card to be deleted and store it
    const cardToDelete = event.target.closest('.card-template');
    const deletePopup = document.getElementById("delete-popup");
    deletePopup.dataset.cardToDelete = cardToDelete.id;

    // Get the user's name and display it in the delete popup
    const userName = cardToDelete.querySelector('.name-bday-addr .card-text').textContent;
    const userNameElement = document.querySelector('.deleter-msg-text2');
    userNameElement.textContent = `Name: ${userName}`;
}

// Confirm delete function
function confirmDelete() {
    const deletePopup = document.getElementById("delete-popup");
    const cardToDeleteId = deletePopup.dataset.cardToDelete;
    const cardToDelete = document.getElementById(cardToDeleteId);
    if (cardToDelete) {
        cardToDelete.remove();
        userCount--; // Decrement the user count
        
        // Extract user data from the card
        const emailText = cardToDelete.querySelector('.contact-email .email .card-text').textContent.trim();
        const phoneText = cardToDelete.querySelector('.contact-email .contact .card-text').textContent.trim();

        // Remove the user from local storage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Function to find the closest match
        function findClosestMatch(user) {
            return user.email === emailText || user.phone === phoneText;
        }

        // Filter out the closest match
        users = users.filter(user => !findClosestMatch(user));
        localStorage.setItem('users', JSON.stringify(users));

        // Update the displayed user count
        updateUserCount();
    }

    hideDeleteContainer();
    messageElement.textContent = "User has been Deleted!";
    messageContainer.style.display = 'flex'
    messageElement.style.backgroundColor = 'red';

    setTimeout(() => {
        messageElement.textContent = "";
        messageContainer.style.display = 'none';
        messageElement.style.backgroundColor = 'rgb(71, 163, 71)';
    }, 2000); // 2000 milliseconds = 2 seconds  
    
}

// Function to hide the delete container
function hideDeleteContainer() {
    document.getElementById("delete-popup").classList.remove("show");
}

// event listener to the close button inside the delete container
document.getElementById("cross-btn2").addEventListener("click", hideDeleteContainer);
document.getElementById("cancel-btn2").addEventListener("click", hideDeleteContainer);

// event listener to the confirm delete button
document.getElementById("confirm-btn").addEventListener("click", confirmDelete);

// search function
function searchCards() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.card-template');

    cards.forEach(card => {
        const name = card.querySelector('.name-bday-addr .name .card-text').textContent.toLowerCase();
        const email = card.querySelector('.contact-email .email .card-text').textContent.toLowerCase();
        const phone = card.querySelector('.contact-email .contact .card-text').textContent.toLowerCase();
        const address = card.querySelector('.name-bday-addr .addr .card-text').textContent.toLowerCase();

        if (name.includes(searchQuery) || email.includes(searchQuery) || phone.includes(searchQuery) || address.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Update the user count based on the number of visible cards
    const visibleCardsCount = Array.from(cards).filter(card => card.style.display === 'block').length;
    document.getElementById('searching-statement').textContent = `Locating ${visibleCardsCount} User Accounts`;
}

// event listener to the search button
document.getElementById('search-btn').addEventListener('click', searchCards);

// event listener to the search input to trigger search on keyup (for real-time search)
document.getElementById('search-input').addEventListener('keyup', searchCards);







