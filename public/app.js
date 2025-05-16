const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearBtn = document.getElementById('clear-tasks');
// Cargar tareas desde localStorage
document.addEventListener('DOMContentLoaded', loadTasks);
// Agregar tarea
taskForm.addEventListener('submit', function (e) {
e.preventDefault();
addTask(taskInput.value);
taskInput.value = '';
});
// Eliminar todas las tareas
clearBtn.addEventListener('click', clearTasks);
// Delegar eventos en lista
taskList.addEventListener('click', handleTaskClick);
function addTask(text) {
const li = document.createElement('li');
li.innerHTML = `
<span>${text}</span>
<button class="delete">X</button>
`;
taskList.appendChild(li);
saveTasks();
}
function handleTaskClick(e) {
const li = e.target.closest('li');
if (!li) return;
if (e.target.classList.contains('delete')) {
li.remove();
} else {
li.classList.toggle('done');
}
saveTasks();
}
function clearTasks() {
taskList.innerHTML = '';
saveTasks();
}
function saveTasks() {
const tasks = [];
document.querySelectorAll('#task-list li').forEach(li => {
tasks.push({
text: li.querySelector('span').textContent,
done: li.classList.contains('done')
});
});
localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(t => {
addTask(t.text);
if (t.done) {
const last = taskList.lastChild;
last.classList.add('done');
}
});
}