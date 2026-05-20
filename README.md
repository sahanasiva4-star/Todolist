# Ex03 To-Do List using JavaScript
## Date: 20.05.26

## AIM
To create a To-do Application with all features using JavaScript.

## ALGORITHM
### STEP 1
Build the HTML structure (index.html).

### STEP 2
Style the App (style.css).

### STEP 3
Plan the features the To-Do App should have.

### STEP 4
Create a To-do application using Javascript.

### STEP 5
Add functionalities.

### STEP 6
Test the App.

### STEP 7
Open the HTML file in a browser to check layout and functionality.

### STEP 8
Fix styling issues and refine content placement.

### STEP 9
Deploy the website.

### STEP 10
Upload to GitHub Pages for free hosting.

## PROGRAM
index.html
~~~
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo Application</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">

        <h1>✨ Todo Application</h1>

        <!-- Input Section -->
        <div class="input-section">
            <input type="text" id="taskInput" placeholder="Enter your task">
            <button class="add-btn" onclick="addTask()">Add Task</button>
        </div>

        <!-- Search -->
        <input type="text" id="searchTask"
        placeholder="Search Task..."
        onkeyup="searchTask()">

        <!-- Filter Buttons -->
        <div class="filters">
            <button class="filter-btn all"
            onclick="filterTasks('all')">
            All
            </button>

            <button class="filter-btn completed"
            onclick="filterTasks('completed')">
            Completed
            </button>

            <button class="filter-btn pending"
            onclick="filterTasks('pending')">
            Pending
            </button>
        </div>

        <!-- Task List -->
        <ul id="taskList"></ul>

        <!-- Footer -->
        <footer>
            <p><strong>Name:</strong>SAHANA S</p>
            <p><strong>Register Number:</strong>212225230236</p>
        </footer>

    </div>

    <script src="script.js"></script>

</body>
</html>
~~~

style.css
~~~
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: Arial, sans-serif;
}

body{
    min-height:100vh;
    background: linear-gradient(
    135deg,
    #667eea,
    #764ba2,
    #ff758c
    );
    display:flex;
    justify-content:center;
    align-items:center;
    padding:40px 20px;
}

.container{
    width:100%;
    max-width:700px;
    background:rgba(255,255,255,0.15);
    backdrop-filter: blur(12px);
    border-radius:25px;
    padding:35px;
    box-shadow:0 10px 30px rgba(0,0,0,0.3);
}

h1{
    text-align:center;
    color:white;
    margin-bottom:30px;
    font-size:42px;
}

/* Input Section */
.input-section{
    display:flex;
    gap:15px;
    margin-bottom:25px;
    flex-wrap:wrap;
}

#taskInput{
    flex:1;
    padding:16px;
    border:none;
    border-radius:12px;
    font-size:16px;
    outline:none;
}

.add-btn{
    background:#00e676;
    border:none;
    padding:16px 25px;
    border-radius:12px;
    color:white;
    font-size:16px;
    cursor:pointer;
}

.add-btn:hover{
    transform:scale(1.05);
}

/* Search */
#searchTask{
    width:100%;
    padding:14px;
    border:none;
    border-radius:12px;
    margin-bottom:25px;
    outline:none;
}

/* Filters */
.filters{
    display:flex;
    justify-content:center;
    gap:15px;
    margin-bottom:30px;
    flex-wrap:wrap;
}

.filter-btn{
    border:none;
    padding:12px 18px;
    border-radius:10px;
    cursor:pointer;
    color:white;
    font-size:15px;
}

.all{
    background:#ff9800;
}

.completed{
    background:#4caf50;
}

.pending{
    background:#f44336;
}

/* Task List */
ul{
    list-style:none;
}

li{
    background:white;
    margin-bottom:18px;
    padding:18px;
    border-radius:15px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:15px;
    box-shadow:0 4px 10px rgba(0,0,0,0.2);
}

li.completed span{
    text-decoration: line-through;
    color:gray;
}

.task-text{
    flex:1;
    font-size:18px;
}

.buttons{
    display:flex;
    gap:10px;
}

button{
    border:none;
    padding:10px 14px;
    border-radius:8px;
    cursor:pointer;
    color:white;
}

.complete-btn{
    background:#00c853;
}

.edit-btn{
    background:#2196f3;
}

.delete-btn{
    background:#f44336;
}

/* Footer */
footer{
    text-align:center;
    color:white;
    margin-top:35px;
    line-height:2;
}

/* Responsive */
@media(max-width:600px){

    .input-section{
        flex-direction:column;
    }

    li{
        flex-direction:column;
        align-items:flex-start;
    }

    .buttons{
        width:100%;
        justify-content:center;
    }

    h1{
        font-size:34px;
    }
}
~~~

script.js
~~~
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function renderTasks(filter = "all"){

    const taskList =
    document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        if(filter==="completed"
        && !task.completed) return;

        if(filter==="pending"
        && task.completed) return;

        const li =
        document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span class="task-text">
            ${task.text}
            </span>

            <div class="buttons">

                <button
                class="complete-btn"
                onclick="toggleComplete(${index})">
                ✓
                </button>

                <button
                class="edit-btn"
                onclick="editTask(${index})">
                Edit
                </button>

                <button
                class="delete-btn"
                onclick="deleteTask(${index})">
                Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });

    saveTasks();
}

function addTask(){

    const input =
    document.getElementById("taskInput");

    const text =
    input.value.trim();

    if(text===""){
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text:text,
        completed:false
    });

    input.value="";
    renderTasks();
}

function toggleComplete(index){
    tasks[index].completed =
    !tasks[index].completed;

    renderTasks();
}

function deleteTask(index){
    tasks.splice(index,1);
    renderTasks();
}

function editTask(index){

    let updatedTask =
    prompt(
        "Edit Task",
        tasks[index].text
    );

    if(updatedTask !== null
    && updatedTask.trim() !== ""){

        tasks[index].text =
        updatedTask.trim();

        renderTasks();
    }
}

function searchTask(){

    const search =
    document.getElementById(
    "searchTask"
    ).value.toLowerCase();

    const items =
    document.querySelectorAll("li");

    items.forEach(item => {

        const text =
        item.innerText.toLowerCase();

        item.style.display =
        text.includes(search)
        ? "flex"
        : "none";
    });
}

function filterTasks(type){
    renderTasks(type);
}

renderTasks();
~~~

## OUTPUT
![alt text](<Screenshot 2026-05-20 142232.png>)



## RESULT
The program for creating To-do list using JavaScript is executed successfully.
