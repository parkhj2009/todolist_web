const todoInput = document.getElementById('todoInput');
const todoList  = document.getElementById('todoList');

let todos = [];
const TODOS_KEY = 'todos';

function addTodo(){
    if (todoInput.value != false) {
        const newItem = todoInput.value;
        const newTodoObject = {
            text: newItem,
            id: Date.now(),
            check: false
        };
        todoInput.value = '';
        todos.push(newTodoObject);
        paintTodo(newTodoObject);
        saveTodos();
    }
}

function paintTodo(newTodoObject){
    const li = document.createElement("li");
    li.id = newTodoObject.id;

    const span = makeSpan(newTodoObject.text);
    const deleteBtn = makeDeleteBtn();
    const rightDiv = makeRightDiv();
    const leftDiv = makeLeftDiv();
    const checkBox = makeCheckBox(newTodoObject.check);

    if (newTodoObject.check === true) {
        checkBox.checked = true;
        span.className = 'checked-list-content';
    }

    leftDiv.appendChild(checkBox);
    leftDiv.appendChild(span);
    rightDiv.appendChild(deleteBtn);
    li.appendChild(leftDiv);
    li.appendChild(rightDiv);
    todoList.appendChild(li);
}

function makeLeftDiv() {
  const div = document.createElement('div');
  div.className = 'todo-list-container-left';
  return div;
}

function makeRightDiv() {
  const div = document.createElement('div');
  div.className = 'todo-list-container-right';
  return div;
}

function makeSpan(newItem) {
  const span = document.createElement('span');
  span.className = 'todo-list-content';
  span.innerText = newItem;
  return span;
}

function makeCheckBox(checked = false) {
  const input = document.createElement('input');
  input.className = 'check-box';
  input.setAttribute('type', 'checkbox');
  input.checked = checked;
  input.addEventListener('click', isChecked);
  return input;
}

function makeDeleteBtn() {
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'list-delete-btn';
  deleteBtn.addEventListener('click', deleteItem);
  deleteBtn.innerText = 'x';
  return deleteBtn;
}

function isChecked(event) {
  const isCheck = event.target.checked;
  const li = event.target.closest("li");
  const span = li.querySelector("span");

  if (isCheck) {
    span.className = 'checked-list-content';
  } else {
    span.className = 'todo-list-content';
  }

  todos.forEach((todo) => {
    if (todo.id === parseInt(li.id)) {
      todo.check = isCheck;
    }
  });

  saveTodos();
}

function deleteItem(event) {
  const li = event.target.closest("li");
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  li.remove();
  saveTodos();
}

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

const savedToDo = localStorage.getItem(TODOS_KEY);
if (savedToDo) {
  const parsedToDos = JSON.parse(savedToDo);
  todos = parsedToDos;
  parsedToDos.forEach(paintTodo);
}