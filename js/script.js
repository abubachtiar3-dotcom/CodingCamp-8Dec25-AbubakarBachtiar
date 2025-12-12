const form = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const tableBody = document.getElementById("todoTable");
const filterBtn = document.getElementById("filterBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");


let todos = [];
let isAscending = true;


form.addEventListener("submit", function (e) {
    e.preventDefault();


const newTodo = {
    task: taskInput.value,
    dueDate: dateInput.value,
    status: "To-Do",
};


todos.push(newTodo);
    renderTable();
    form.reset();
});


function renderTable() {
    tableBody.innerHTML = "";


todos.forEach((todo, index) => {
    const row = document.createElement("tr");


row.innerHTML = `
    <td class="border p-2">${todo.task}</td>
    <td class="border p-2">${todo.dueDate}</td>
    <td class="border p-2">
    <select class="border rounded px-2 py-1" onchange="updateStatus(${index}, this.value)">
        <option ${todo.status === "To-Do" ? "selected" : ""}>To-Do</option>
        <option ${todo.status === "In Progress" ? "selected" : ""}>In Progress</option>
        <option ${todo.status === "Done" ? "selected" : ""}>Done</option>
    </select>
    </td>
    <td class="border p-2 text-center">
        button class="text-red-600" onclick="deleteTodo(${index})">Delete</button>
    </td>
`;


tableBody.appendChild(row);
});
}


function deleteTodo(index) {
    todos.splice(index, 1);
    renderTable();
}


function updateStatus(index, status) {
    todos[index].status = status;
}


filterBtn.addEventListener("click", function () {
    todos.sort((a, b) => {
    return isAscending
    ? a.task.localeCompare(b.task)
    : b.task.localeCompare(a.task);
});


isAscending = !isAscending;
    renderTable();
});


deleteAllBtn.addEventListener("click", function () {
    todos = [];
    renderTable();
});