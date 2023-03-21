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
  });

}

async function loadTasks() {
  const response = await fetch("../tasks.json");
  const data = await response.json();
  data.forEach((task) => {
    taskList.push(task);
    console.log(taskList);
  });
}

const add = () => {
  desativarTouch = true;
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

const remove = () => {
  console.log('remove');
  for (let i = 0; i < taskList.length; i++) {
    console.log(taskList[i].title);
    console.log(target.innerHTML);
    if (taskList[i].title === target.innerHTML) {
      taskList.splice(i, 1);
    }
  }
  add_task();
  notification();
  
  

}

const toggleDone = () => {
  console.log(target.style.backgroundColor);
  taskList.forEach((task) => {
    console.log(task.title);
    console.log(target.innerHTML.slice(10,-11));
    if (task.title == target.innerHTML.slice(10,-11)){

      console.log(task.done);
      task.done = !task.done;
    }
    // console.log(task.done);
    if (task.done == true){
      target.style.backgroundColor = "rgb(172, 242, 161)";
    }
    else{
      target.style.backgroundColor = "#f2837b";
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
removeButton.addEventListener("touchend", remove);
cancelButton.addEventListener("touchend", notification);  

load();
// console.log(taskList);


document.addEventListener('touchstart', handleTouchStart, false); 
document.addEventListener('touchmove', handleTouchMove, false); 
document.addEventListener('touchend', handleTouchEnd, false);
var xDown = null; 
var yDown = null; 
var target = null;
var desativarTouch = false;
var touchTime = null;

function getTouches(evt) { 
  if (desativarTouch == false){
    console.log(evt)
    return evt.touches 
  }
}
function check_time(){
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
    target.style.backgroundColor = "rgb(190, 242, 161)";
  }
  setTimeout(check_time, 100);

}
function handleTouchStart(evt)
  { 
    if (desativarTouch == false){
    const firstTouch = getTouches(evt)[0]; 
    xDown = firstTouch.clientX; 
    yDown = firstTouch.clientY;
    touchTime = Date.now();
    target = evt.target;
    // target = substring(target.substring(5,-5)
    setTimeout(check_time, 100);
    
    }
  };

function handleTouchEnd(){
  if (desativarTouch == false){
    touchTime = null;
    // console.log(target.done);
    add_task();
    target = null;
    
  }
}

function handleTouchMove(evt) { 
  if ( ! xDown || ! yDown ) 
    { return; } 
  var xUp = evt.touches[0].clientX; 
  var yUp = evt.touches[0].clientY; 
  var xDiff = xDown - xUp; 
  var yDiff = yDown - yUp; 
  if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) 
  {/*most significant*/ if ( xDiff > 0 ) 
    { /* left swipe */
      console.log("swipe left"); } 
    else 
    { /* right swipe */ 
    console.log("swipe right");
    notification()} } 
    else 
    { if ( yDiff > 0 ) 
      { /* up swipe */ 
      console.log("swipe up");}
       
    else { /* down swipe */
    console.log("swipe down");
         } 
      }
    
    /* reset values */ 
    xDown = null; 
    yDown = null; };

function notification(){
  if (notification_container.style.display == "block"){
    notification_container.style.display = "none";
    desativarTouch = false;
    target = null;
    return;
  }
  desativarTouch = true;
  notification_container.style.display = "block";
}