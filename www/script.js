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
  });
}

const add = () => {
  task_name = document.querySelector("#task-name").value;
  if (task_name = "") {
    return;
  }
  taskList.push({
    id: taskList.length + 1,
    name: task_name,
    done: false,
  });
}

const remove = () => {}

const toggleDone = () => {}

const addButton = document.querySelector("#fab-add");

addButton.addEventListener("touchend", add);

loadTasks();
console.log(taskList);

