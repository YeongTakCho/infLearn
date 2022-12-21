const checkInput = function () {
  const inputToDo = document.querySelector("#todo-input");

  if (window.event.key === "Enter" && inputToDo.value) {
    const todoList = document.querySelector("#todo-list");
    const newLi = document.createElement("li");
    const newSpan = document.createElement("span");

    newSpan.textContent = inputToDo.value;
    newLi.appendChild(newSpan);
    todoList.appendChild(newLi);
    inputToDo.value = "";
  }
};
