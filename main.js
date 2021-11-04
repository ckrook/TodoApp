class todo {
  constructor(id, text, priority, currentDate, deadline) {
    this.id = id;
    this.text = text;
    this.priority = priority;
    this.created = currentDate;
    this.deadline = deadline;
    this.done = false;
  }
}

let prioScale = ["Low", "Medium", "High"];

let listView = document.getElementById("list-view");
let gridView = document.getElementById("grid-view");
let sortBy = document.getElementById("sortview");

//submit todo
let todoArray = [];
let submit = document.getElementById("submit");

window.onload = function () {
  listView.addEventListener("click", toggleView);
  gridView.addEventListener("click", toggleView);
  submit.addEventListener("click", submitTodo);
  sortBy.addEventListener("change", changeSortBy);
};

function toggleView(e) {
  if (e.target.id == "list-view") {
    e.target.classList.add("active");
    gridView.classList.remove("active");
  }
  if (e.target.id == "grid-view") {
    e.target.classList.add("active");
    listView.classList.remove("active");
  }
}

// Add todo item

function submitTodo() {
  let text = document.getElementById("todo-text").value;
  let deadLine = document.getElementById("deadline").value;
  let today = new Date();
  let currentDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let priority =
    document.getElementById("priority").options[
      document.getElementById("priority").selectedIndex
    ].value;
  let id = todoArray.length;
  let temp = new todo(id, text, priority, currentDate, deadLine);
  todoArray.push(temp);
  console.log(todoArray);

  let tasks = document.getElementById("tasks");
  printTodos(todoArray);
}

// Sort feature

function changeSortBy() {
  return this.value == "newest"
    ? sortByNewest()
    : this.value == "deadline"
    ? sortByDeadline()
    : this.value == "alphabetical"
    ? sortByAlphabetical()
    : null;

  function sortByNewest() {
    console.log("hello");
  }
  function sortByDeadline() {
    console.log("hello2");
  }
  function sortByAlphabetical() {
    todoArray.sort(function (a, b) {
      if (a.text.toLowerCase() < b.text.toLowerCase()) return -1;
      if (a.text.toLowerCase() > b.text.toLowerCase()) return 1;
      return 0;
    });
    printTodos(todoArray);
  }
}

function compare(a, b) {
  if (a.text < b.text) {
    return -1;
  }
  if (a.text > b.text) {
    return 1;
  }
  return 0;
}

function printTodos(todoArray) {
  tasks.innerHTML = "";
  let tempTodo = ``;
  for (i = 0; i < todoArray.length; i++) {
    tempTodo = `
    <div class="task mb-2">
	    <div class="row">

        <div class="col-2 d-flex justify-content-center align-items-center">
          <input id="checkbox-${i}" type="checkbox" class="checkmark" />
        </div>

		    <div class="col-7">
		    	<p>${todoArray[i].text}</p>
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
    tasks.innerHTML += tempTodo;
  }
}
