let listView = document.getElementById("list-view");
let gridView = document.getElementById("grid-view");

//submit todo
let todoArray = [];
let submit = document.getElementById("submit");

window.onload = function () {
  listView.addEventListener("click", toggleView);
  gridView.addEventListener("click", toggleView);

  submit.addEventListener("click", submitTodo).then(console.log(todoArray));
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

// Todo functionality

function submitTodo() {
  let text = document.getElementById("todo-text").value;
  let priority =
    document.getElementById("priority").options[
      document.getElementById("priority").selectedIndex
    ].value;
  todoArray = new todo(text, priority);
}

class todo {
  constructor(text, priority) {
    this.text = text;
    this.priority = priority;
    this.done = false;
  }
}
