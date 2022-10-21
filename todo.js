// Tüm elementler
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clear-todos");
const filter = document.querySelector("#filter");
eventListeners();

function eventListeners(){ //tüm event listenerlar
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos)
    clearButton.addEventListener("click",removeAll);
}
function removeAll(e){
    if(confirm("Hepsini silmek istediğinize emin misiniz?")){
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}
function filterTodos(e){
    const filtervalue = e.target.value.toLowerCase();
    const listItem = document.querySelectorAll(".list-group-item");
    listItem.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexof(filtervalue)===-1){
            listItem.setAtributte ("style","display:none !important");
        }
        else{
            listItem.setAtributte("style","display:block ");
        }
    })
}
function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage( e.target.parentElement.parentElement.textContent);
    }
}
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo===deletetodo){
            todos.splice(index,1)
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadAllTodosToUI(){
    let todos;
    todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })

}
function addTodo(e){
    const newTodo = todoInput.value.trim();
    if (newTodo  ===   ""){
        showAlert ("danger" , "boş todo girdiniz");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
    }
    
    e.preventDefault();
}
function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
   todos.push(newTodo);
   localStorage.setItem("todos",JSON.stringify(todos));
}
function showAlert (type,massage){
    const alert = document.createElement("div");
    alert.className = 'alert alert-danger';
    alert.textContent = massage;
    firstCardBody.appendChild(alert);
    console.log(alert);
    // set timeout
    setTimeout(function(){
        alert.remove();
    },2000)

}
function addTodoToUI(newTodo){
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>"  ;
    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    // todo liste listıtem ekleme
    todoList.appendChild(listItem);
    todoInput.value = "";
}
