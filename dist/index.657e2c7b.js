class todo {
    constructor(id1, text1, priority1, currentDate1, deadline){
        this.id = id1;
        this.text = text1;
        this.priority = priority1;
        this.created = currentDate1;
        this.deadline = deadline;
        this.done = false;
    }
}
const prioScale = [
    "Low",
    "Medium",
    "High"
];
let sortBy = document.getElementById("sortview");
let submit = document.getElementById("submit");
let taskWrapper = document.getElementById("tasks");
let tasksDone = document.getElementById("tasksdone");
let task = document.getElementsByClassName("task");
let input = document.getElementById("todo-text");
let todoArray1 = [];
window.onload = function() {
    fromLocalstorage();
    submit.addEventListener("click", submitTodo);
    // input.addEventListener("keyup", pressEnter);
    sortBy.addEventListener("change", changeSortBy);
};
function fromLocalstorage() {
    let storedTodo = localStorage.getItem("todo");
    storedTodo = JSON.parse(storedTodo);
    if (storedTodo) {
        let todoArray = storedTodo;
        printTodos(todoArray);
    }
}
function pressEnter(event) {
    event.preventDefault();
    if (event.key === "Enter") {
        if (input.value) return submitTodo(event);
    }
}
function submitTodo(event) {
    event.preventDefault();
    let text = document.getElementById("todo-text").value;
    if (!text) return;
    let deadLine = document.getElementById("deadline").value;
    let today = new Date();
    let currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let priority = document.getElementById("priority").options[document.getElementById("priority").selectedIndex].value;
    let id = todoArray1.length;
    let temp = new todo(id, text, priority, currentDate, deadLine);
    todoArray1.push(temp);
    document.getElementById("todo-text").value = "";
    printTodos(todoArray1);
}
function changeSortBy() {
    function sortByNewest() {
        todoArray1.sort(function(a, b) {
            return new Date(a.created) - new Date(b.created);
        });
        toLocalstorage(todoArray1);
        printTodos(todoArray1);
    }
    function sortByDeadline() {
        todoArray1.sort(function(a, b) {
            return new Date(a.deadline) - new Date(b.deadline);
        });
        toLocalstorage(todoArray1);
        printTodos(todoArray1);
    }
    function sortByPriority() {
        todoArray1.sort(function(a, b) {
            return b.priority - a.priority;
        });
        toLocalstorage(todoArray1);
        printTodos(todoArray1);
    }
    function sortByAlphabetical() {
        todoArray1.sort(function(a, b) {
            if (a.text.toLowerCase() < b.text.toLowerCase()) return -1;
            if (a.text.toLowerCase() > b.text.toLowerCase()) return 1;
            return 0;
        });
        toLocalstorage(todoArray1);
        printTodos(todoArray1);
    }
    return this.value == "newest" ? sortByNewest() : this.value == "deadline" ? sortByDeadline() : this.value == "alphabetical" ? sortByAlphabetical() : this.value == "priority" ? sortByPriority() : null;
}
function setStatusDone(event) {
    let tempId = event.target.id.split("-").pop().trim();
    tempId = parseInt(tempId);
    todoArray1[tempId].done = true;
    toLocalstorage(todoArray1);
    printTodos(todoArray1);
}
function printTodos(todoArray) {
    taskWrapper.innerHTML = "";
    tasksDone.innerHTML = "";
    let tempTodo = ``;
    let tempTodo2 = ``;
    if (todoArray.filter((e)=>e.done === true
    ).length > 0) tasksDone.innerHTML = "<span>Completed</span>";
    for(let i = 0; i < todoArray.length; i++){
        let statusdone = "";
        let crossed = "";
        if (todoArray[i].done === true) {
            statusdone = "statusdone";
            crossed = "crossed";
            tempTodo2 = `
      <div class="task mb-2 ${statusdone}">
        <div class="row">
          <div class="col-2 d-flex justify-content-center align-items-center">
            <input id="checkbox-${i}" type="checkbox" class="checkmark" checked/>
          </div>
          <div class="col-7 text-white">
            <p class="${crossed} ">${todoArray[i].text}</p>
            <time>${todoArray[i].deadline}</time>
          </div>
          <div class="col-3 d-flex align-items-end">
            <a id="delete-${i}" class="priority delete bg-red-500">Remove</a>
          </div>
         </div>
      </div>
      `;
            tasksDone.innerHTML += tempTodo2;
        }
        if (todoArray[i].done === false) {
            tempTodo = `
    <div class="task mb-2 ${statusdone}">
	    <div class="row">
        <div class="col-2 d-flex justify-content-center align-items-center">
          <input id="checkbox-${i}" type="checkbox" class="checkmark" />
        </div>
		    <div class="col-7">
		    	<p class="${crossed}">${todoArray[i].text}</p>
			    <time>${todoArray[i].deadline}</time>
		    </div>
        <div class="col-3 d-flex align-items-end">
          <span class="priority ${prioScale[parseInt(todoArray[i].priority) - 1].toLowerCase()}">${prioScale[parseInt(todoArray[i].priority) - 1]}</span>
        </div>

 	    </div>
    </div>
    `;
            taskWrapper.innerHTML += tempTodo;
        }
        toLocalstorage(todoArray);
    }
    document.querySelectorAll(".checkmark").forEach((item)=>{
        item.addEventListener("click", (event)=>{
            let tempId = event.target.id.split("-").pop().trim();
            if (todoArray[tempId].done == true) {
                todoArray[tempId].done = false;
                toLocalstorage(todoArray);
                printTodos(todoArray);
            } else {
                toLocalstorage(todoArray);
                setStatusDone(event);
            }
        });
    });
    document.querySelectorAll(".delete").forEach((thing)=>{
        thing.addEventListener("click", (event)=>{
            let tempId = event.target.id.split("-").pop().trim();
            deleteItem(tempId);
        });
    });
}
function deleteItem(tempId) {
    todoArray1.splice(tempId, 1);
    toLocalstorage(todoArray1);
    printTodos(todoArray1);
}
function toLocalstorage(todoArray) {
    localStorage.setItem("todo", JSON.stringify(todoArray));
}

//# sourceMappingURL=index.657e2c7b.js.map
