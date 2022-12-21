const inputToDo = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const savedList = JSON.parse(localStorage.getItem("saved-items"));

const checkInput = function () {
  if (window.event.key === "Enter" && inputToDo.value) {
    createToDo(inputToDo.value, false);
  }
};

const createToDo = function (value, isFinished) {
  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");

  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete");

    saveItems();
  });
  newLi.addEventListener("dblclick", () => {
    newLi.remove();

    saveItems();
  });

  if (isFinished) {
    newLi.classList.add("complete");
  }
  newSpan.textContent = value;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi);
  inputToDo.value = "";
  saveItems();
};

const deleteAll = function () {
  const liList = document.querySelectorAll("#todo-list li");
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }
  saveItems();
};

const saveItems = function () {
  const saveItem = [];
  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].querySelector("span").textContent,
      complete: todoList.children[i].classList.contains("complete"),
    };
    saveItem.push(todoObj);
  }

  if (saveItem.length === 0) {
    localStorage.removeItem("saved-items");
  } else {
    localStorage.setItem("saved-items", JSON.stringify(saveItem));
  }
};

if (savedList) {
  for (let i = 0; i < savedList.length; i++) {
    createToDo(savedList[i].contents, savedList[i].complete);
  }
}
