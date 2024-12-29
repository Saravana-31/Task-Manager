// Get references to HTML elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = ""; // Clear the task list
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = task.completed ? "completed" : "";
    taskItem.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(taskItem);
  });
}

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task!");
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks to LocalStorage
  taskInput.value = ""; // Clear input
  renderTasks();
}

// Function to toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated tasks
  renderTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1); // Remove the task from the list
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated tasks
  renderTasks();
}

// Render tasks on page load
renderTasks();
