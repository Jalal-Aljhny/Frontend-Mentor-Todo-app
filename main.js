let countT = document.querySelector("main .container .footer p span");
let addField = document.querySelector("main .container input");
let tList = document.querySelector("main .container .t-list");
let addBtn = document.querySelector("main .container .add:nth-child(1) span");
let changeTasks = document.querySelectorAll("main .container .footer ul li");
let clearAll = document.querySelector("main .container .footer p:last-child");
let tasks = [];
let theme;
let lightTheme = {
  "--body-b": "#fafafa",
  "--box-b": "#fff",
  "--btn-c": "#959499",
  "--btn-hover": "#58596b",
  "--p-c": "#4c4b59",
  "--margin-c": "#f3f2f5",
  "--input-c": "#6c6b71",
};
let darkTheme = {
  "--body-b": "#181824",
  "--box-b": "#25273c",
  "--btn-c": "#555672",
  "--btn-hover": "#f3f6ff",
  "--p-c": "#9799b2",
  "--margin-c": "#26283d",
  "--input-c": "#a7a9c0",
};
//check if theme is changed
if (window.localStorage.getItem("theme") != null) {
  if (window.localStorage.getItem("theme").includes("light")) {
    toLight();
  } else {
    toDark();
  }
}

//if localStorage not empty
if (window.localStorage.getItem("tasks") != null) {
  tasks = JSON.parse(window.localStorage.getItem("tasks"));
  addToPage(tasks);
}
//checkbox input
function check() {
  let myInput = document.querySelectorAll(
    "main .container .t-list .todo input"
  );
  myInput.forEach((inp) => {
    if (inp.checked == true) {
      inp.parentElement.style.backgroundImage =
        "linear-gradient( 120deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%) )";
      inp.parentElement.style.border = "none";
      inp.parentElement.classList.add("done");
    }
  });
  myInput.forEach((inp) => {
    inp.addEventListener("change", () => linearB(inp));
  });
}
check();

function linearB(element) {
  if (element.checked == true) {
    element.parentElement.style.backgroundImage =
      "linear-gradient( 120deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%) )";
    element.parentElement.style.border = "none";
    element.parentElement.classList.add("done");
    changeState(element);
  } else {
    element.parentElement.style.backgroundImage = "none";
    element.parentElement.style.border = "2px solid #e7e6eb";
    element.parentElement.classList.remove("done");
    deafaultState(element);
  }
}
//change completed state of task object
function changeState(element) {
  for (let task of tasks) {
    if (
      task.content ==
      element.parentElement.parentElement.querySelector("p").textContent
    ) {
      task.completed = true;
    }
    addToLocal(tasks);
  }
}
function deafaultState(element) {
  for (let task of tasks) {
    if (
      task.content ==
      element.parentElement.parentElement.querySelector("p").textContent
    ) {
      task.completed = false;
    }
    addToLocal(tasks);
  }
}
//remove element from page and from localStorage
function delet() {
  let remove = document.querySelectorAll("main .container .t-list .todo img");
  remove.forEach((icon) => {
    icon.addEventListener("click", () => {
      tasks = tasks.filter((task) => {
        return (
          task.content != icon.parentElement.querySelector("p").textContent
        );
      });
      icon.parentElement.remove();
      addToLocal(tasks);
      countToDo();
    });
  });
}
delet();
//count of tasks
function countToDo() {
  let toDos = document.querySelectorAll("main .container .t-list .todo");
  countT.textContent = `${Array.from(toDos).length} `;
}
countToDo();
//add btn
addBtn.addEventListener("click", addToArray);
document.body.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addToArray();
  }
});
function addToArray() {
  if (addField.value !== "") {
    let task = {
      content: addField.value,
      id: Date.now(),
      completed: false,
    };
    tasks.push(task);
    addField.value = "";
    addToLocal(tasks);
    addToPage(tasks);
  }
}
//add to localStorage
function addToLocal(array) {
  window.localStorage.setItem("tasks", JSON.stringify(array));
}
//add to page
function addToPage(array) {
  tList.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    if (array[i].completed == true) {
      tList.innerHTML += `  
<div class="todo">  
  <label class = "done">
    <input type="checkbox" checked/>
  </label>
  <p>${array[i].content}</p>
  <img src="images/icon-cross.svg" alt="icon" />
</div>`;
    } else {
      tList.innerHTML += `  
      <div class="todo">  
        <label>
          <input type="checkbox"/>
        </label>
        <p>${array[i].content}</p>
        <img src="images/icon-cross.svg" alt="icon" />
      </div>`;
    }
  }
  countToDo();
  myInput = document.querySelectorAll("main .container .t-list .todo input");
  remove = document.querySelectorAll("main .container .t-list .todo img");
  check();
  delet();
}
//change visible elements
changeTasks.forEach((task) => {
  task.addEventListener("click", () => {
    changeTasks.forEach((task) => {
      task.classList.remove("active");
    });
    task.classList.add("active");
    changeTasksF(task);
  });
});
function changeTasksF(task) {
  if (task.textContent.toLowerCase() == "active") {
    for (let i = 0; i < tasks.length; i++) {
      tasks = tasks.filter((t) => {
        return t.completed == false;
      });
    }
    addToPage(tasks);
  } else if (task.textContent.toLowerCase() == "completed") {
    for (let i = 0; i < tasks.length; i++) {
      tasks = tasks.filter((t) => {
        return t.completed == true;
      });
      addToPage(tasks);
    }
  } else {
    addToPage(JSON.parse(window.localStorage.getItem("tasks")));
  }
}
//remove completed elements
clearAll.addEventListener("click", () => {
  tasks = tasks.filter((task) => {
    return task.completed == false;
  });
  addToLocal(tasks);
  addToPage(tasks);
});
//change theme
document.addEventListener("click", (e) => {
  if (e.target == document.querySelector("header .container img")) {
    let path = e.target.src.split("/");
    if (path[path.length - 1].includes("sun")) {
      toDark();
    } else {
      toLight();
    }
  }
});

function changeTheme(theme) {
  let varN = Object.keys(theme);
  let varV = Object.values(theme);
  for (let i = 0; i < varN.length; i++) {
    document.documentElement.style.setProperty(varN[i], varV[i]);
  }
}
function toDark() {
  //change to dark theme
  document.querySelector("header .container img").src = "images/icon-moon.svg";
  theme = "dark";
  changeTheme(darkTheme);
  document.querySelector("header").classList.add("dark");
  window.localStorage.setItem("theme", "darkTheme");
}
function toLight() {
  //change to light theme;
  document.querySelector("header .container img").src = "images/icon-sun.svg";
  theme = "light";
  changeTheme(lightTheme);
  document.querySelector("header").classList.remove("dark");
  window.localStorage.setItem("theme", "lightTheme");
}
