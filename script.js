// document.addEventListener("DOMContentLoaded", () => {
//   const todoInput = document.getElementById("todo-input");
//   const addTaskButton = document.getElementById("add-task-btn");
//   const todoList = document.getElementById("todo-list");

//   let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//   tasks.forEach((task) => renderTask(task));

//   addTaskButton.addEventListener("click", () => {
//     const taskText = todoInput.value.trim();
//     if (taskText === "") return;

//     const newTask = {
//       id: Date.now(),
//       text: taskText,
//       completed: false,
//     };
//     tasks.push(newTask);
//     saveTasks();
//     renderTask(newTask);
//     todoInput.value = ""; //clear input
//     console.log(tasks);
//   });

//   function renderTask(task) {
//     const li = document.createElement("li");
//     li.setAttribute("data-id", task.id);
//     if (task.completed) li.classList.add("completed");
//     li.innerHTML = `
//     <span>${task.text}</span>
//     <button>delete</button>
//     `;
//     li.addEventListener("click", (e) => {
//       if (e.target.tagName === "BUTTON") return;
//       task.completed = !task.completed;
//       li.classList.toggle("completed");
//       saveTasks();
//     });

//     li.querySelector("button").addEventListener("click", (e) => {
//       e.stopPropagation(); //prevent toggle from firing
//       tasks = tasks.filter((t) => t.id === task.id);
//       li.remove();
//       saveTasks();
//     });

//     todoList.appendChild(li);
//   }

//   function saveTasks() {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false, //  fixed typo from "complete"
    };
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoInput.value = "";
    console.log(tasks);
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");

    //  ADDED: Create span and buttons separately
    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    //  ADDED: Create edit button
    const editButton = document.createElement("button");
    editButton.textContent = "🖊️"; // pen icon
    editButton.classList.add("edit-btn");
    editButton.style.marginLeft = "5px";

    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(editButton); //  ADDED: Append edit button

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    //  ADDED: Edit button functionality
    editButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      input.style.flex = "1";
      input.style.marginRight = "5px";
      li.insertBefore(input, span);
      li.removeChild(span);
      input.focus();

      const finishEdit = () => {
        const newText = input.value.trim();
        if (newText !== "") {
          task.text = newText;
          saveTasks();
          span.textContent = newText;
        }
        li.insertBefore(span, input);
        li.removeChild(input);
      };

      input.addEventListener("blur", finishEdit);
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") finishEdit();
      });
    });

    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
