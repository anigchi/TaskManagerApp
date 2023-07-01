const inputEl = document.querySelector("#input");
const buttonEl = document.querySelector("#delete");
const outputEl = document.querySelector("#list-container");
const form = document.querySelector("form");

//Delete task

const removeTask = (id) => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks", tasks));
  }
  tasks = tasks.filter(task => {
    return task.id !== +id; //아이디가 다른 것만 내보내줌(클릭한 아이디랑 같은 것은 안내보냄) 수정이 안되기 때문에 그럼! 
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  getTasks();
};

//get tasks (단지 Display 하는 것)
const getTasks = () => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  console.log(tasks);
  //Display to DOM
  let output;
  const allTasks = tasks.map(task => {
    return `
    <li id="item">
            <span>${task.title}</span>
            <button onclick="removeTask('${task.id}')" id="delete">X</button>
          </li>
    `;
  });
  output = allTasks.join(""); //empty space를 조인해주면 깔끔하다 
  outputEl.innerHTML = output;
};
// getTasks();

//Add Task and save into loclal storage
const addTask = (e)=> {
  e.preventDefault();
  //check if input is empty
  if (inputEl.value === "") {
    alert("Pleast enter a task");
  }

  //get the item
  const task = inputEl.value;
  if (task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
      console.log(tasks);
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
      console.log(tasks);
    }
    tasks.unshift({
      id: Date.now(),
      title: task,
    });
    //Save to storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    //empty input
    inputEl.value = "";
  }
  getTasks();
};
//Event Listener

form.addEventListener("submit", addTask);