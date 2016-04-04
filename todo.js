/**
 * Created by Ylva on 2016-03-15.*/
var todoList = document.getElementById("todo");
var doneList = document.getElementById("done");
var inputButton = document.getElementById("add");
var itemToAdd = document.getElementById("input");
var todos= [];
var doneTasks = [];

function addItem(item, i){
    var div = document.createElement("div");
    var li = document.createElement("li");
    var itemInList = document.createTextNode(item);

    var editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.setAttribute("id", i);
    editBtn.setAttribute("class", "editBtn");
    editBtn.addEventListener("click", function(){editItem(li, div, i);});

    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.setAttribute("id", i);
    deleteBtn.setAttribute("class", "deleteBtn");
    deleteBtn.addEventListener("click", function(){deleteItem(i)});

    var doneBtn = document.createElement("button");
    doneBtn.innerHTML = "Done";
    doneBtn.setAttribute("id", i);
    doneBtn.setAttribute("class", "doneBtn");
    doneBtn.addEventListener("click", function(){itemDone(item, i)});

        li.appendChild(itemInList);
        li.appendChild(doneBtn);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);

    div.appendChild(li);
    todoList.appendChild(div);
    itemToAdd.value = "";  //clears text in input field
    return div;
}

function addDoneItem (item, i){
    var div = document.createElement("div");
    var li = document.createElement("li");
    var doneChild = document.createTextNode(item);

    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.setAttribute("id", i);
    deleteBtn.setAttribute("class", "deleteBtn");
    deleteBtn.addEventListener("click", function(){deleteDoneItem(i)});

    li.appendChild(doneChild);
    li.appendChild(deleteBtn);
    div.appendChild(li);
    doneList.appendChild(div);
}

function deleteItem(i){
    var todos = getTodos();
    todos.splice(i, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
    showToDos();
}

function deleteDoneItem(i){
    var id = parseInt(i) - 100;
    var doneTasks = getDoneTasks();
    doneTasks.splice(id, 1);
    localStorage.setItem('done', JSON.stringify(doneTasks));
    showDoneTasks();
}

function editItem(child, parent, i){
    var li = document.createElement("li");

    var editField = document.createElement("input");
    editField.setAttribute("id", "editing");
    editField.setAttribute("type", "text");
    editField.value = child.childNodes[0].nodeValue;
    editField.addEventListener("keydown", function(e){
        if(e.keyCode == 13){doneEditing();}});

    var doneEditingBtn = document.createElement("button");
    doneEditingBtn.innerHTML = "Done editing";
    doneEditingBtn.setAttribute("id", "doneEdit");
    doneEditingBtn.addEventListener("click", doneEditing);

    li.appendChild(doneEditingBtn);
    li.appendChild(editField);
    parent.replaceChild(li, child);

    function doneEditing(){
        var editedItem = document.getElementById("editing");
        if(editedItem.value){
            saveTodo(editedItem, i);
        } else {alert("Please enter a description of the item");}}
}

function getDoneTasks() {
    var doneTasksStr = localStorage.getItem('done');
    if (doneTasksStr != null) {
        doneTasks = JSON.parse(doneTasksStr);
    }
    return doneTasks;
}

function getTodos(){
    var todosStr = localStorage.getItem('todo');
    if (todosStr != null) {
        todos = JSON.parse(todosStr);
    }
    return todos;
}

function itemDone(item, i){
    saveDoneItem(item);
    deleteItem(i);
}

function saveDoneItem(item){
    var doneTasks = getDoneTasks();
    doneTasks.push(item);
    localStorage.setItem('done', JSON.stringify(doneTasks));
    showDoneTasks();
}

function saveTodo(item, i){  //i submitted when called by doneEditing()
    var todos = getTodos();
    if(todos.length < 100){
    if(item.value){
        var task = item.value;
        if(i != null){
            todos[i] = task;
            localStorage.setItem('todo', JSON.stringify(todos));
        } else {
            todos.push(task);
            localStorage.setItem('todo', JSON.stringify(todos));
        }
        return showToDos();
    }else {alert("Please enter a description of the item.");}}
    else {alert("You can only add 100 items to your to do-list.");}
}

function showDoneTasks (){
    var noOfChildren = doneList.childNodes.length;
    for(var j = noOfChildren-1; j >= 0; j--){
        doneList.removeChild(doneList.childNodes[j]);
    }
    if(doneTasks.length > 0){
        for(var i = 0; i < doneTasks.length; i++){
            var k = i + 100;  //to prevent multiple id's
            addDoneItem(doneTasks[i], k);}
    }}

function showToDos(){
    var noOfChildren = todoList.childNodes.length;
    for(var j = noOfChildren-1; j >= 0; j--){
        todoList.removeChild(todoList.childNodes[j]);
    }
    if(todos.length > 0){
        for(var i = 0; i < todos.length; i++){
            addItem(todos[i], i);}
    }}

getTodos();
showToDos();
getDoneTasks();
showDoneTasks();

inputButton.addEventListener("click", function(){saveTodo(itemToAdd);});
itemToAdd.addEventListener("keydown", function(e){
    if(e.keyCode == 13){saveTodo(itemToAdd);}});
