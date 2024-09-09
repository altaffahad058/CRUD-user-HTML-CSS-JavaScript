function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Add event listener to the logout link
const messageElement = document.getElementById("message");
const messageContainer = document.getElementsByClassName(
  "adduser-msg-container"
)[0];

document.getElementById("logout-link").addEventListener("click", function () {
  setTimeout(function () {
    window.location.href = "./index.html";
  }, 2000);
  messageElement.textContent = "Logging Out........";
  messageContainer.style.display = "flex";
});

document.getElementById("tasks-btn").addEventListener("click", addTodo);

function addTodo() {
  const todoInput = document.getElementById("todo-input");
  const todoText = todoInput.value.trim();

  if (todoText !== "") {
    const todoList = document.getElementById("todo-list");

    const li = document.createElement("li");
    const div = document.createElement("div");
    div.textContent = todoText;

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";

    const deleteBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    
    deleteBtn.innerHTML =
      '<img class="tick-img" src="https://img.favpng.com/15/18/2/button-delete-key-icon-png-favpng-QyKEi5YZShJs1T6X5mdfkLUSW_t.jpg">';
    deleteBtn.dataset.deleteCount = 0;

    checkBtn.innerHTML =
      '<img class="tick-img" src="https://toppng.com/uploads/preview/check-mark-html-done-icon-11563029359rpmvepeinu.png">';
    
    checkBtn.addEventListener("click", () => {
      if (deleteBtn.dataset.deleteCount == 0) {
        li.style.textDecoration = "line-through";
        li.style.color = "green";
        deleteBtn.dataset.deleteCount = -1;

        //Displaying task added message
        messageElement.textContent = "Task has been completed!";
        messageContainer.style.display = "flex";

        setTimeout(() => {
        messageElement.textContent = "";
        messageContainer.style.display = "none";
        }, 1000); // 2000 milliseconds = 2 seconds
        
      } else if (deleteBtn.dataset.deleteCount == 1) {
        li.style.textDecoration = "none";
        li.style.color = "black";
        deleteBtn.dataset.deleteCount = 0;
      }
    });

    deleteBtn.addEventListener("click", () => {
      if (deleteBtn.dataset.deleteCount == -1) {
        li.style.textDecoration = "none";
        li.style.color = "black";
        deleteBtn.dataset.deleteCount = 0;
      } else if (deleteBtn.dataset.deleteCount == 0) {
        li.style.textDecoration = "line-through";
        li.style.color = "red";
        deleteBtn.dataset.deleteCount = 1;
      } else {
        todoList.removeChild(li);
        messageElement.textContent = "Task has been Deleted!";
        messageContainer.style.display = "flex";
        messageElement.style.backgroundColor = "red";

        setTimeout(() => {
          messageElement.textContent = "";
          messageContainer.style.display = "none";
          messageElement.style.backgroundColor = "rgb(71, 163, 71)";
        }, 2000); // 2000 milliseconds = 2 seconds
      }
    });

    buttonGroup.appendChild(checkBtn);
    buttonGroup.appendChild(deleteBtn);

    li.appendChild(div);
    li.appendChild(buttonGroup);

    todoList.appendChild(li);
    todoInput.value = "";

    //Displaying task added message
    messageElement.textContent = "Task has been added!";
    messageContainer.style.display = "flex";

    setTimeout(() => {
      messageElement.textContent = "";
      messageContainer.style.display = "none";
    }, 2000); // 2000 milliseconds = 2 seconds
  }
}
