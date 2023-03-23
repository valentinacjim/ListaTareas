const taskList = [];

const add_task = () => {
  tasks= document.querySelector("#tasks-container");
  tasks.innerHTML = '';
  taskList.forEach((task) => {
    console.log(task);
    let color = "#f2837b";
    // console.log();
    if (task.done == true){
      color = "#7bf2a1";
    }
      
    tasks.innerHTML += `
      <div class="task-container" style="--clr:${color}">
     <h3>${task.title}</h3>
     </div>
    `;	


    
    // let taskContainer = document.querySelector(".task-container");

    // console.log(task.title);   
  }
  );
  let items = document.querySelectorAll(".task-container");
  items.forEach((item) => {
    item.addEventListener('touchstart', handleTouchStart(item), false); 
    item.addEventListener('touchmove', handleTouchMove(item), false); 
    item.addEventListener('touchend', handleTouchEnd(item), false);
  });


}

async function loadTasks() {
  const response = await fetch("../tasks.json");
  const data = await response.json();
  data.forEach((task) => {
    taskList.push(task);
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

const remove = (item) => {
  console.log('remove');
  for (let i = 0; i < taskList.length; i++) {
    console.log(taskList[i].title);
    console.log(item.innerHTML);
    if (taskList[i].title === item.innerHTML.slice(10,-11)) {
      taskList.splice(i, 1);
    }
  }
  add_task();
  notification(item);
  
  

}

const toggleDone = (item) => {
  console.log(item.style.backgroundColor);
  taskList.forEach((task) => {
    // console.log(task.title);
    if (task.title == item.innerHTML.slice(10,-11)){

      console.log(task.done);
      task.done = !task.done;
    }
    // console.log(task.done);
    if (task.done == true){
      item.style.backgroundColor = "rgb(172, 242, 161)";
    }
    else{
      item.style.backgroundColor = "#f2837b";
    }

  }
  );
}



async function load(){
  await loadTasks();
  add_task();
  // console.log(tasks);
}



const addButton = document.querySelector("#fab-add");
const removeButton = document.querySelector("#btn-delete");
const cancelButton = document.querySelector("#btn-cancel");
const notification_container = document.querySelector("#notification-container");

// const toggleButton = document.querySelector("#fab-toggle");

addButton.addEventListener("touchend", add);


load();
// console.log(taskList);


var xDown = null; 
var touchTime = null;

function getTouches(evt) { 
    return evt.touches   
}

function check_time(item){
  if (touchTime === null){return;}
  // console.log(touchTime);
  // console.log(Date.now());

  var now = Date.now();
  var diff = now - touchTime;
  // console.log(diff);
  if(diff >= 2000){
    toggleDone();
    return;
  }
  if(diff > 100){
    
    item.style.backgroundColor = "rgb(190, 242, 161)";
  }
  setTimeout(check_time, 50);

}
function handleTouchStart(item, evt)
  { 
    const firstTouch = getTouches(evt)[0]; 
    xDown = firstTouch.clientX; 
    touchTime = Date.now();
    setTimeout(check_time(item), 50);
    
    
  };

function handleTouchEnd(){
    touchTime = null;
    // console.log(target.done);
    add_task();
    
}

function handleTouchMove(item, evt) { 
  if ( ! xDown ) 
    { return; } 
  var xUp = evt.touches[0].clientX; 
  console.log(xUp);
  console.log(xDown);
  var xDiff = xDown - xUp; 
  if ( xDiff < -10 ) 
    { /* right swipe */ 
    console.log("right swipe");
    notification(item)
    touchTime = null;}  
    /* reset values */ 
  xDown = null; 
  console.log(xDown);
};

function notification(item){
  if (notification_container.style.display == "block"){
    notification_container.style.display = "none";
    removeButton.addEventListener("touchend", remove(item));
    cancelButton.addEventListener("touchend", notification(item));  
    taskList.forEach((task) => {
      if (task.done == true){
        item.style.backgroundColor = "rgb(172, 242, 161)";
      }
      else{
        item.style.backgroundColor = "#f2837b";
      }
  
    }
    );
    return;
  }
  notification_container.style.display = "block"
  item.style.backgroundColor = "rgb(190, 242, 161)";
}