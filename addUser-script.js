function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Add event listener to the logout link
const messageElement = document.getElementById('message');
const messageContainer = document.getElementsByClassName('adduser-msg-container')[0]

document.getElementById("logout-link").addEventListener("click", function() {
  setTimeout(function() {
      window.location.href = './index.html';
  }, 2000);
  messageElement.textContent = "Logging Out........";
  messageContainer.style.display = 'flex';
});

document.getElementById("add-user-btn").addEventListener("click", addUser);



let newUser = {};

function addUser() {
  const imageUrl = document.getElementById('image-url').value;
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const phoneNumber = document.getElementById('phone-number').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const birthDate = document.getElementById('birth-date').value;
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;

  if (!imageUrl || !firstName || !lastName || !phoneNumber || !email || !address || !birthDate || !age || !gender) {
      alert('Please fill all the fields.');
      return;
  }

  // Get existing users from local storage
  let users = localStorage.getItem('users');
  users = users ? JSON.parse(users) : [];

  // Check for duplicate email or phone number
  const isDuplicate = users.some(user => user.email === email || user.phone === phoneNumber);

  if (isDuplicate) {
      alert('A user with this email address or phone number already exists.');
      return;
  }

  // Create new user object
  newUser = {
      image: imageUrl,
      firstName: firstName,
      lastName: lastName,
      phone: phoneNumber,
      email: email,
      address: address ,
      birthDate: birthDate,
      age: age,
      gender: gender
  };

  // Add new user to the list and update local storage
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  // Show success message
  messageElement.textContent = "User information Added Successfully!";
  messageContainer.style.display = 'flex';

  setTimeout(() => {
      messageElement.textContent = "";
      messageContainer.style.display = 'none';
  }, 3000);

  // Clear the input fields after adding the user
  document.getElementById('image-url').value = '';
  document.getElementById('first-name').value = '';
  document.getElementById('last-name').value = '';
  document.getElementById('phone-number').value = '';
  document.getElementById('email').value = '';
  document.getElementById('address').value = '';
  document.getElementById('birth-date').value = '';
  document.getElementById('age').value = '';
  document.getElementById('gender').value = '';

  getData();
}

const URL = "https://dummyjson.com/users/add";
const getData = async () => {
  try {
    let response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    console.log("API fetched Successfully!", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}