// document.addEventListener('DOMContentLoaded', () => {
//     const loginButton = document.getElementById('login-btn');
//     const usernameInput = document.getElementById('user-name');
//     const passwordInput = document.getElementById('password');
//     const messageElement = document.getElementById('message');

//     const correctUsername = 'emilys';
//     const correctPassword = 'emilyspass';

//     loginButton.addEventListener('click', () => {
//         const enteredUsername = usernameInput.value;
//         const enteredPassword = passwordInput.value;

//         if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
//             messageElement.textContent = 'Login Succesfull. Welcome back, Emily!';
//             messageElement.style.backgroundColor = 'rgba(19, 141, 19, 0.541)';
//             messageElement.style.display = 'block';
//             setTimeout(() => {
//                 window.location.href = './all-user.html';
//             }, 1000); // 1-second delay before redirection
//         } else {
//             messageElement.textContent = 'Invalid username or password';
//             messageElement.style.backgroundColor = 'red';
//             messageElement.style.display = 'block';
//         }
//     });
// });

const URL = "https://dummyjson.com/auth/login";
const newUser = {
  username: "emilys",
  password: "emilyspass"
};

const getData = async () => {
  try {
    let response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    let data = await response.json();
    console.log("API fetched Successfully!", data);

    // Store the credentials in local storage as a token
    localStorage.setItem('token', JSON.stringify(newUser));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const loginButton = document.getElementById('login-btn');
const usernameInput = document.getElementById('user-name');
const passwordInput = document.getElementById('password');
const messageElement = document.getElementById('message');

loginButton.addEventListener('click', function(event) {
    event.preventDefault();

    // Call getData to fetch and store credentials
    getData();
  
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;
  
    const storedToken = JSON.parse(localStorage.getItem('token'));
  
    if (storedToken && storedToken.username === enteredUsername && storedToken.password === enteredPassword) {
        console.log("Credentials Matched. Login Successful!");
        messageElement.textContent = 'Login Succesfull. Welcome back, Emily!';
        messageElement.style.backgroundColor = 'rgba(19, 141, 19, 0.541)';
        messageElement.style.display = 'block';
        setTimeout(() => {
            window.location.href = './all-user.html';
        }, 1000); // 1-second delay before redirection
    } else {
        messageElement.textContent = 'Invalid username or password';
        messageElement.style.backgroundColor = 'red';
        messageElement.style.display = 'block';
    }
});

