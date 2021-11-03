// Toggle gridview/listview feature
let listView = document.getElementById("list-view");
let gridView = document.getElementById("grid-view");
window.onload = function () {
  listView.addEventListener("click", toggleView);
  gridView.addEventListener("click", toggleView);
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

class Todo {
  constructor(text, dateCreated, deadLine, priority, done) {
    this.text = text;
    this.dateCreated = new Date();
    this.deadLine = text;
    this.priority = text;
    this.done = false;
  }
}
