const taskList = [];

// const loadTasks = () => {
//   fetch("../tasks.json")
//     .then((response) => response.json())
//     .then((data) => {
//       data.forEach((task) => {
//         taskList.push(task);
//       });
//     }
//   );
  
// }

async function loadTasks() {
  const response = await fetch("../tasks.json");
  const data = await response.json();
  data.forEach((task) => {
    taskList.push(task);
    console.log(taskList);
  });
}

const add = () => {
  task_name = document.querySelector("#task-name").value;
  console.log(task_name);

  tasks_name = []
  
  // console.log(tasksjson);
  if (task_name === '') {
    return;
  }
  else{
    for (let i = 0; i < taskList.length; i++) {
      if(taskList[i].title === task_name){
        return;
      }
    }
    taskList.push({
      id: taskList.length + 1,
      title: task_name,
      done: false,
    });
  add_task();
  }
  
  
  console.log(taskList);
}

const remove = () => {}

const toggleDone = () => {}

const add_task = () => {
  tasks= document.querySelector("#tasks-container");
  tasks.innerHTML = '';
  taskList.forEach((task) => {
    // console.log();
    tasks.innerHTML += `
      <div class="task-container">
     <h3>${task.title}</h1>
     </div>
    `;	
    // console.log(task.title);   
  });

}

async function load(){
  await loadTasks();
  add_task();
  // console.log(tasks);
}

const addButton = document.querySelector("#fab-add");

addButton.addEventListener("click", add);

load();
// console.log(taskList);

