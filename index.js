// get all element------------------

let mainContainer=document.querySelector('.container');
let taskListConatiner=document.querySelector('.taskList')
let taskItem=document.querySelector('.task_item')
let taskInput=document.querySelector('#taskInput')
let addButton=document.querySelector('#addTaskButton')
let form=document.querySelector('form')




form.addEventListener('submit',(e)=>{
e.preventDefault()
addTask()
})

let allTask=[]
// Initialize tasks from local storage on page load
window.onload = () => {
    allTask = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();
};

// add task function-----------------------------------------
function addTask() {
    let title = taskInput.value.trim();
    // console.log(title)
    if (title === "") {
        alert("Task title cannot be empty!");
        return;
    }

    let newTask = {
        isCompleted: false,
        title: title,
        id: generateUniqueId()
    };

    // Add the new task to your task list (assuming you have a function for this)
    // For example: taskList.push(newTask);
    allTask.push(newTask)

    // stroe task into local storage----

    saveTasksToLocalStorage()

    // Also, render the new task to the UI (assuming you have a function for this)
    // For example: renderTask(newTask);



    renderTasks()
    
    // Clear the input field after adding the task
    taskInput.value = "";
}

// save to local storage------------------------------------------
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(allTask));
}


//  render all tasks
function renderTasks() {
    let taskListContainer = document.getElementById('taskList'); // Make sure the ID matches your HTML
    taskListContainer.innerHTML = ''; // Clear existing tasks

    if (allTask.length > 0) {
        allTask.forEach((item) => {
            let taskItem = document.createElement('li');
            taskItem.className = 'task_item';
            
            taskItem.innerHTML = `
                <div class="left">
                    <h4><input type="checkbox" ${item.isCompleted ? 'checked' : ''}></h4>
                    <h4>${item.title}</h4>
                </div>
                <div class="right">
                    <h3><i class="fa-solid fa-trash" style="display: inline-block;"></i></h3>
                    <h3><i class="fa-solid fa-pencil"></i></h3>
                </div>
            `;
            
            taskListContainer.append(taskItem);
            
            // Adding event listener to the checkbox
            let checkbox = taskItem.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => handleComplete(item.id));

            // Adding event listener to the edit button
            let editButton = taskItem.querySelector('.fa-pencil');
            editButton.addEventListener('click', () => handleModalOPen(item.id));

            // Adding event listener to the delete button
            let deleteButton = taskItem.querySelector('.fa-trash');
            deleteButton.addEventListener('click', () => handleDelete(item.id));
        });
    } else {
        let noTaskMessage = document.createElement('p');
        noTaskMessage.className = 'no_task_message';
        noTaskMessage.textContent = 'No tasks available. Create new tasks!';
        taskListContainer.appendChild(noTaskMessage);
    }
}


//  handle delete functionality
function handleDelete(id){
    // alert(id)
    allTask = allTask.filter((task)=>task.id!==id)
    saveTasksToLocalStorage();
    renderTasks();
}

// handle task complition---------------------------------
function handleComplete(id){
     // Find the task by ID and toggle the isCompleted property
     allTask = allTask.map(task => 
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    
    saveTasksToLocalStorage();
    renderTasks();

    // console.log(allTask)
}


// generate unique id-------------------------
function generateUniqueId() {
    return Date.now() + '-' + Math.floor(Math.random() * 1000);
}


// Get the modal element
let modal = document.getElementById('editTaskModal');

// Get the button that opens the modal
let openModalButton = document.getElementById('openEditModalButton');

// Get the <span> element that closes the modal
let closeModalButton = modal.querySelector('.close');

// Get the input field and save button
let editTaskTitleInput = document.getElementById('editTaskTitleInput');
let saveEditedTaskButton = document.getElementById('saveEditedTaskButton');

// When the user clicks on the button, open the modal
function handleModalOPen(id){
    modal.style.display = 'block';
    let taskForEdit=allTask.filter((item)=>item.id===id)
    editTaskTitleInput.value=taskForEdit[0].title
    saveEditedTaskButton.addEventListener('click',()=>handleEdit(id))
}


// When the user clicks on <span> (x), close the modal
function closeModal(){
    modal.style.display = 'none';
}
closeModalButton.addEventListener('click', function() {
    modal.style.display = 'none';
});


// handle edit task-------------------------------
function handleEdit(id) {
    // console.log(id);
    let editedTaskTitle = editTaskTitleInput.value.trim();
    if (editedTaskTitle === "") {
        alert("Task title cannot be empty!");
        return;
    }

    allTask = allTask.map((item) => {
        if (item.id === id) {
            return { ...item, title: editedTaskTitle };
        }
        return item;
    });

    saveTasksToLocalStorage();
    renderTasks();
    closeModal();
}


// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});




































