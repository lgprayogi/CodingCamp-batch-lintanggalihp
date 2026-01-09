let todos = [];
let currentFilter = "all";

function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoDate = document.getElementById('todoDate');

    if (todoInput.value === '' || todoDate.value === '') {
        alert('Please fill in both the todo and date.');
        return;
    }

    const newTodo = ({
        task: todoInput.value.trim(),
        date: todoDate.value,
        completed: false
    });

    todos.push(newTodo);
    renderTodos(filteredTodos());

    todoInput.value = '';
    todoDate.value = '';
}

function renderTodos(list) {
    const data = Array.isArray(list) ? list : todos;
    const todoList = document.getElementById('todoList');

    todoList.innerHTML = '';

    if (data.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No todos yet";
        todoList.appendChild(li);
        return;
    }

    data.forEach((todo, index) => {
        const li = document.createElement("li");
        li.className = "border p-2 rounded flex items-center justify-between";

        const left = document.createElement("div");
        left.className = "flex items-center";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.className = "mr-2";

        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked;
            renderTodos(filteredTodos());
        });

        const p = document.createElement("p");
        p.className = "text-2xl inline";

        const taskSpan = document.createElement("span");
        taskSpan.textContent = todo.task;
        taskSpan.className = todo.completed
            ? "line-through text-gray-400"
            : "";

        const dateSpan = document.createElement("span");
        dateSpan.textContent = ` (${todo.date})`;
        dateSpan.className = "text-sm text-gray-500 ml-2";

        p.appendChild(taskSpan);
        p.appendChild(dateSpan);

        left.appendChild(checkbox);
        left.appendChild(p);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.className = "ml-4 text-red-500 hover:text-red-700 font-bold";

        deleteBtn.addEventListener("click", () => {
            todos.splice(index, 1);
            renderTodos(filteredTodos());
        });

        li.appendChild(left);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

function filteredTodos() {
    if (currentFilter === "completed") {
        return todos.filter(todo => todo.completed);
    }

    if (currentFilter === "uncompleted") {
        return todos.filter(todo => !todo.completed);
    }

    return todos;
}

const filterSelect = document.getElementById("filterStatus");
if (filterSelect) {
    filterSelect.addEventListener("change", (e) => {
        currentFilter = e.target.value;
        renderTodos(filteredTodos());
    });
}

const removeAllTodo = document.getElementById("removeAllTodo");
if (removeAllTodo) {
    removeAllTodo.addEventListener('click', () => {
        if (confirm('Delete all tasks?')) {
            todos = [];
            renderTodos(filteredTodos());
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => renderTodos(filteredTodos()));
} else {
    renderTodos(filteredTodos());
}
