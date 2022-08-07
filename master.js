let theInput       = document.querySelector('.input-f');
let theIcon        = document.querySelector('.plus');
let theSecondSec   = document.querySelector('.second-sec');
// filter
let filters      = document.querySelectorAll('.filters li');
let theAll       = document.querySelector('.filters .all');
let theFinish    = document.querySelector('.filters .faa');
let theNotFinish = document.querySelector('.filters .fa-not');
// empty array
let arrayOfTasks = [];

// check if there is elements in local
if (localStorage.getItem('tasks')) {
  arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
}
// trigger get data from local
getDataFromLocal();
// focus input when reload
window.onload = function(){
  theInput.focus();
};
// << [main] add more tasks >>------------------------------
theIcon.onclick = function () {
  if (theInput.value !== '') {
    addTaskToArray(theInput.value);
    theInput.value = '';
  };
}

//--<< click to delete (page / local) >>-------------------------------------
theSecondSec.addEventListener('click' , (e) => {
  // delete btn
  if (e.target.classList.contains('del')){
    deleteTaskLocal(e.target.parentElement.getAttribute('data-id'));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains('task')) {
    // ~~~~ toggle completeed ~~~~~~
    toggleStatus(e.target.getAttribute('data-id'));
    // ~~~~ toggle class "done" ~~~~~~
    e.target.classList.toggle("done");
  }
});

// << function tasks >>---------------------------------
function addTaskToArray(taskText) {
  // task data
  const task = {
    id: Date.now() , 
    title: taskText ,
    completed: false ,
  };
  // push to empty array
  arrayOfTasks.push(task);
  //  add task to page
  addElmentsToPage(arrayOfTasks);
  //  add task to local
  addTaskToLocal(arrayOfTasks);
}

// <<  build tasks (div -span - append) >>-----------------------------
function addElmentsToPage(arrayOfTasks) {
  // empty all div
  theSecondSec.innerHTML = "";
  // looping of array
  arrayOfTasks.forEach((task) => {
    // create div
    let div = document.createElement('div');
    div.className = "task";
    // check the task is done
    if(task.completed) {
      div.className = "task done";
    }
      
    div.setAttribute("data-id" , task.id);
    div.appendChild(document.createTextNode(task.title));
    // create span
    let span = document.createElement('span'); 
    span.className = "del";
    // append
    span.appendChild(document.createTextNode("delete"));
    div.appendChild(span);
    theSecondSec.appendChild(div);
  });
}

// << local storage >>-------------------------------

function addTaskToLocal(arrayOfTasks) {
  window,localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocal(){
  let data = window.localStorage.getItem('tasks');
  if (data) {
    let tasks = JSON.parse(data);
    addElmentsToPage(tasks);
  }
}

// << function delete task >>-------------------------
function deleteTaskLocal(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTaskToLocal(arrayOfTasks);
}


// << toggleStatus >>-----------------
function toggleStatus(taskId) {
  for (let i=0; i<arrayOfTasks.length; i++){
    if (arrayOfTasks[i].id == taskId){
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  addTaskToLocal(arrayOfTasks);
}

// filters >>-------------------------
// click to switch active
filters.forEach((li) => {
  li.addEventListener("click" , removeActive);
});
// function 
function removeActive() {
  filters.forEach((li) => {
    li.classList.remove('active');
    this.classList.add('active');
  });
}

theFinish.onclick = manageCompleteTasks;
theNotFinish.onclick = function(){
  manageNotCompleteTasks();  
};
theAll.onclick = allTasksHere;

// complete and uncompleted
function manageCompleteTasks() {
  console.log(arrayOfTasks);
  arrayOfTasks = arrayOfTasks.filter(task => task.completed == true );
  addElmentsToPage(arrayOfTasks);
  console.log(arrayOfTasks);
}
function manageNotCompleteTasks() {
  console.log(arrayOfTasks);
  arrayOfTasks = arrayOfTasks.filter(task => task.completed == false );
  addElmentsToPage(arrayOfTasks);
  console.log(arrayOfTasks);
}
function allTasksHere() {
  console.log(arrayOfTasks);
}

// old code  >>--------------------
/*
else {
  let theSpanCon   = document.querySelector('.data-f');
  if (document.body.contains(document.querySelector('.data-f'))){
    theSpanCon.remove();
  }
  // create elements
  let mainSpan = document.createElement('span');
  let deleteSpan = document.createElement('span');
  // fill data elements
  let text = document.createTextNode(theInput.value);
  let deleteTxt = document.createTextNode('Delete');
  // append mainclass for [data] and add [class]
  mainSpan.appendChild(text);
  mainSpan.className = 'task-box';
  // append deleteSpan for [data] and add [class]
  deleteSpan.appendChild(deleteTxt);
  deleteSpan.className = 'delete-box';
  // add delete to mainSpan
  mainSpan.appendChild(deleteSpan);
  // add the task mainSpan to theSecondSec
  theSecondSec.appendChild(mainSpan);
  // empty input
  theInput.value = '';
  // clac tasks
  calcTasks();
} 



// delete tasks and mark finish
document.addEventListener('click', function (e) {
  // delete task
  if (e.target.className == "delete-box") {
    e.target.parentNode.remove();
    calcTasks();
    console.log(JSON.stringify(theSecondSec));
  }
  // check numbers taks inside the theSecondSec
  if(theSecondSec.childElementCount == 0) {
    createNoTasks();
  }

  // finish tasks
  if(e.target.classList.contains('task-box')){
    e.target.classList.toggle('finish');
    // clac
    calcTasks();
  }
});


// notasks shown when delete all tasks
function createNoTasks() {
  let msgSpanAfterDelete = document.createElement('span');
  let txtMsgSpanAfterDelete = document.createTextNode('No Tasks To Show');
  msgSpanAfterDelete.appendChild(txtMsgSpanAfterDelete);
  msgSpanAfterDelete.className="data-f";
  theSecondSec.appendChild(msgSpanAfterDelete);
}



// calc complete or not complete
function calcTasks() {
  tasksCompleted.innerHTML = document.querySelectorAll('.task-box.finish').length;
  tasksNotComp.innerHTML = document.querySelectorAll('.task-box').length;
}


*/