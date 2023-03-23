const taskList = [];



async function loadTasks() {
  await fetch("../tasks.json",{
    method: "GET",
  })
  .then((response) => response.json())
  .then((data) => {
    data.forEach((task) => {
      taskList.push(task);
    });
  });
  return;
  
}


const add_task = () => {
  tasks= document.querySelector("#tasks-container");
  tasks.innerHTML = '';
  taskList.forEach((task) => {
    let color = "rgb(242, 131, 123)";
    if (task.done == true){
      color = "rgb(172, 242, 161)";
    }
      
    tasks.innerHTML += `
      <div class="task-container" style="--clr:${color}">
     <h3>${task.title}</h3>
     </div>
    `;	  
  });

  let items = document.querySelectorAll(".task-container");
  items.forEach((item) => {
    item.addEventListener('touchmove', handleTouchMove, false); 
    item.addEventListener('touchend', handleTouchEnd, false);
    item.addEventListener('touchstart', handleTouchStart, false); 
  });

  
  // fetch("../tasks.json" , {
  //   method: "POST",
  //   body: JSON.stringify(taskList),
  //   headers:{
  //     'Content-Type': 'application/json'
  //   }
  // }).then(res => res.json())
  // .catch(error => console.error('Error:', error))
  // .then(response => console.log('Success:', response))
  // ;
  
  
  window.navigator.vibrate(100);
}
const add = () => {
  task_name = document.querySelector("#task-name").value;
  tasks_name = []
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
  
  
}

const remove = () => {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].title === target_remove.innerHTML) {
      taskList.splice(i, 1);
    }
  }
  notification_container.style.display = "none";
  add_task();  
  

}

const toggleDone = (item) => {
  taskList.forEach((task) => {
    if (task.title == item.innerHTML.slice(10,-11)){
      task.done = !task.done;
    }
    if (task.done === true){
      item.style.backgroundColor = "rgb(190, 242, 161)";
    }
    else{
      item.style.backgroundColor = "rgb(242, 131, 123)";
    }

  }
  );
}



async function load(){
  await loadTasks();
  add_task();
}



const addButton = document.querySelector("#fab-add");
const removeButton = document.querySelector("#btn-delete");
const cancelButton = document.querySelector("#btn-cancel");
const notification_container = document.querySelector("#notification-container");


addButton.addEventListener("touchend", add);
removeButton.addEventListener("touchend", remove);

cancelButton.addEventListener("touchend", function(){
  notification_container.style.display = "none";
})



load();


var xDown = null; 
var touchTime = null;
var target = null;
var target_remove = null;

function getTouches(event) { 
  return event.touches   
}

function check_time(item){

  if (target !== item){return;}


  var now = Date.now();
  var diff = now - touchTime;
  if (diff > 2000){
    toggleDone(item);
    return;}

}



function handleTouchStart(event)
  { 
    const firstTouch = getTouches(event)[0]; 
    xDown = firstTouch.clientX;
    if (event.target.localName === "h3"){
      new_target = event.target.parentElement;
    }
    else{
      new_target = event.target;
    }
    target = new_target;
    touchTime = Date.now();
    setTimeout(function(){check_time(new_target);}, 2000);
    
    
  };

function handleTouchEnd(){
    touchTime = null;
    target = null;
    add_task();
    
};

function handleTouchMove(evt) {
  if ( ! xDown ) 
    { return; } 
  var xUp = evt.touches[0].clientX; 
  
  var xDiff = xDown - xUp; 
  if ( xDiff < -5 ) 
    { /* right swipe */ 
    if (evt.target.className === "task-container"){
      new_target = evt.target.firstElementChild;
    }
    else{
      new_target = evt.target;
    }
    target_remove = new_target;
    notification()
    touchTime = null;}
  xDown = null;
};

function notification(){
  notification_container.style.display = "block"

}

