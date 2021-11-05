const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
}


function filterTodos(){

    
}


function deleteTodo(e){
     
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo başarıyla silindi...");
    }      
}


function deleteTodoFromStorage(deletetodo){
      
    let todos = getTodosFromStorage();

    todos.forEach(function(todo, index){
        
        if (todo === deletetodo) {
            todos.splice(index, 1); // Arrayden değer siliyoruz
        }

    })
 
    localStorage.setItem("todos", JSON.stringify(todos));
  
}


function loadAllTodosToUI(){

    let todos = getTodosFromStorage();

    todos.forEach(function (todos){
        addTodoToUI(todos);

    })
 
}

function addTodo(e){
    const newTodo = todoInput.value.trim();
    
    if (newTodo === ""){
        showAlert("danger","Lütfen bir todo girin...");
    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo başarıyla eklendi...");
    }

    e.preventDefault();    
}

function getTodosFromStorage(){

    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
     
    }
    return todos;
}

function addTodoToStorage(newTodo){
     
    let todos = getTodosFromStorage(); 

    todos.push(newTodo);
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);
    
    setTimeout(function(){
        alert.remove();
    }, 1000)

    //'<div class="alert alert-primary" role="alert">This is a primary alert—check it out!</div>';
     
}

function addTodoToUI(newTodo){
 
    /*
     <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>
    */

    // const listItem = document.createElement("li");
    // listItem.className = "list-group-item d-flex justify-content-between";
    // listItem.innerHTML = newTodo + '<a href = "#" class="delete-item"><i class = "fa fa-remove"></i></a>';


    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";

    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    
    todoList.appendChild(listItem);
    todoInput.value = "";
  
}