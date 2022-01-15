class todo {
  id: number;
  text: string;
  priority: string;
  created: string;
  deadline: string;
  done: boolean;
  constructor(id, text, priority, currentDate, deadline) {
    this.id = id;
    this.text = text;
    this.priority = priority;
    this.created = currentDate;
    this.deadline = deadline;
    this.done = false;
  }
}

const prioScale = ["Low", "Medium", "High"];
let sortBy = document.getElementById("sortview");
let submit = document.getElementById("submit");
let taskWrapper = document.getElementById("tasks");
let tasksDone = document.getElementById("tasksdone");
let task = document.getElementsByClassName("task");
let input = document.getElementById("todo-text") as HTMLInputElement;
let todoArray = [];

window.onload = function () {
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
    if (input.value) {
      return submitTodo(event);
    }
  }
}

function submitTodo(event) {
  event.preventDefault();
  let text = (document.getElementById("todo-text") as HTMLInputElement).value;
  if (!text) return;
  let deadLine = (document.getElementById("deadline") as HTMLInputElement)
    .value;
  let today = new Date();
  let currentDate =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();
  let priority = (document.getElementById("priority") as HTMLSelectElement)
    .options[
    (document.getElementById("priority") as HTMLSelectElement).selectedIndex
  ].value;
  let id = todoArray.length;
  let temp = new todo(id, text, priority, currentDate, deadLine);

  todoArray.push(temp);
  (document.getElementById("todo-text") as HTMLInputElement).value = "";
  printTodos(todoArray);
}

function changeSortBy() {
  return this.value == "newest"
    ? sortByNewest()
    : this.value == "deadline"
    ? sortByDeadline()
    : this.value == "alphabetical"
    ? sortByAlphabetical()
    : this.value == "priority"
    ? sortByPriority()
    : null;

  function sortByNewest() {
    todoArray.sort(function (a, b) {
      return (new Date(a.created) as any) - (new Date(b.created) as any);
    });
    toLocalstorage(todoArray);
    printTodos(todoArray);
  }
  function sortByDeadline() {
    todoArray.sort(function (a, b) {
      return (new Date(a.deadline) as any) - (new Date(b.deadline) as any);
    });
    toLocalstorage(todoArray);
    printTodos(todoArray);
  }
  function sortByPriority() {
    todoArray.sort(function (a, b) {
      return b.priority - a.priority;
    });
    toLocalstorage(todoArray);
    printTodos(todoArray);
  }
  function sortByAlphabetical() {
    todoArray.sort(function (a, b) {
      if (a.text.toLowerCase() < b.text.toLowerCase()) return -1;
      if (a.text.toLowerCase() > b.text.toLowerCase()) return 1;
      return 0;
    });
    toLocalstorage(todoArray);
    printTodos(todoArray);
  }
}

function setStatusDone(event) {
  let tempId = event.target.id.split("-").pop().trim();
  tempId = parseInt(tempId);
  todoArray[tempId].done = true;
  toLocalstorage(todoArray);
  printTodos(todoArray);
}

function printTodos(todoArray) {
  taskWrapper.innerHTML = "";
  tasksDone.innerHTML = "";
  let tempTodo = ``;
  let tempTodo2 = ``;
  if (todoArray.filter((e) => e.done === true).length > 0) {
    tasksDone.innerHTML = "<span>Completed</span>";
  }
  for (let i = 0; i < todoArray.length; i++) {
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
          <span class="priority ${prioScale[
            parseInt(todoArray[i].priority) - 1
          ].toLowerCase()}">${
        prioScale[parseInt(todoArray[i].priority) - 1]
      }</span>
        </div>

 	    </div>
    </div>
    `;
      taskWrapper.innerHTML += tempTodo;
    }

    toLocalstorage(todoArray);
  }
  document.querySelectorAll(".checkmark").forEach((item) => {
    item.addEventListener("click", (event) => {
      let tempId = (event.target as any).id.split("-").pop().trim();
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
  document.querySelectorAll(".delete").forEach((thing) => {
    thing.addEventListener("click", (event) => {
      let tempId = (event.target as any).id.split("-").pop().trim();
      deleteItem(tempId);
    });
  });
}

function deleteItem(tempId) {
  todoArray.splice(tempId, 1);
  toLocalstorage(todoArray);
  printTodos(todoArray);
}

function toLocalstorage(todoArray) {
  localStorage.setItem("todo", JSON.stringify(todoArray));
}
