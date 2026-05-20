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
~~~

#index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>To-Do App</title>

    <!-- CSS File -->
    <link rel="stylesheet" href="style.css" />
</head>
<body>

    <div class="container">

        <h1>📝 To-Do Application</h1>

        <!-- Input Section -->
        <div class="input-section">
            <input type="text" id="taskInput" placeholder="Enter a task..." />
            <button id="addTaskBtn">Add</button>
        </div>

        <!-- Error Message -->
        <p id="errorMessage"></p>

        <!-- Filter Buttons -->
        <div class="filter-section">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="completed">Completed</button>
            <button class="filter-btn" data-filter="pending">Pending</button>
        </div>

        <!-- Task List -->
        <ul id="taskList"></ul>

    </div>

    <!-- JavaScript File -->
    <script src="script.js"></script>
</body>
</html>


#style.css


/* Reset Default Styling */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Body Styling */
body {
    font-family: Arial, sans-serif;
    background: linear-gradient(to right, #667eea, #764ba2);
    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 20px;
}

/* Main Container */
.container {
    background: white;
    width: 100%;
    max-width: 500px;

    padding: 25px;
    border-radius: 15px;

    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
}

/* Heading */
h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

/* Input Section */
.input-section {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.input-section input {
    flex: 1;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
}

.input-section button {
    padding: 12px 20px;
    border: none;
    background: #667eea;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
}

.input-section button:hover {
    background: #5a67d8;
}

/* Error Message */
#errorMessage {
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
}

/* Filter Buttons */
.filter-section {
    display: flex;
    justify-content: center;
    gap: 10px;

    margin: 20px 0;
}

.filter-btn {
    padding: 8px 15px;
    border: none;
    background: #ddd;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
}

.filter-btn.active {
    background: #667eea;
    color: white;
}

/* Task List */
#taskList {
    list-style: none;
}

/* Individual Task */
.task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    background: #f4f4f4;
    padding: 12px;
    border-radius: 10px;

    margin-bottom: 10px;
}

/* Completed Task */
.task-item.completed span {
    text-decoration: line-through;
    color: gray;
}

/* Task Text */
.task-item span {
    flex: 1;
    margin-left: 10px;
}

/* Buttons */
.task-buttons {
    display: flex;
    gap: 5px;
}

.task-buttons button {
    border: none;
    padding: 7px 10px;
    border-radius: 6px;
    cursor: pointer;
    color: white;
}

/* Different Button Colors */
.edit-btn {
    background: #f6ad55;
}

.delete-btn {
    background: #fc8181;
}

/* Responsive Design */
@media (max-width: 600px) {

    .input-section {
        flex-direction: column;
    }

    .input-section button {
        width: 100%;
    }

    .filter-section {
        flex-wrap: wrap;
    }
}


#script.js


// Get HTML Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");
const filterButtons = document.querySelectorAll(".filter-btn");

// Array to Store Tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Current Filter
let currentFilter = "all";

// Display Tasks
function displayTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if (currentFilter === "completed") {
            return task.completed;
        }

        if (currentFilter === "pending") {
            return !task.completed;
        }

        return true;
    });

    filteredTasks.forEach((task, index) => {

        // Create Task Item
        const li = document.createElement("li");
        li.classList.add("task-item");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}>

            <span>${task.text}</span>

            <div class="task-buttons">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        // Checkbox
        const checkbox = li.querySelector("input");

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        // Edit Button
        const editBtn = li.querySelector(".edit-btn");

        editBtn.addEventListener("click", () => {

            const updatedTask = prompt("Edit your task:", task.text);

            if (updatedTask !== null && updatedTask.trim() !== "") {

                task.text = updatedTask.trim();

                saveTasks();
                displayTasks();
            }
        });

        // Delete Button
        const deleteBtn = li.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", () => {

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();
        });

        taskList.appendChild(li);
    });
}

// Add Task Function
function addTask() {

    const taskText = taskInput.value.trim();

    // Error Handling
    if (taskText === "") {

        errorMessage.textContent = "Task cannot be empty!";
        return;
    }

    errorMessage.textContent = "";

    // Create Task Object
    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    displayTasks();

    taskInput.value = "";
}

// Save to Local Storage
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add Button Event
addTaskBtn.addEventListener("click", addTask);

// Enter Key Support
taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }
});

// Filter Buttons
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove Active Class
        filterButtons.forEach(btn => btn.classList.remove("active"));

        // Add Active Class
        button.classList.add("active");

        currentFilter = button.dataset.filter;

        displayTasks();
    });
});

// Initial Display
displayTasks();


~~~

## OUTPUT
<img width="1918" height="968" alt="image" src="https://github.com/user-attachments/assets/b968110b-76e9-4812-a217-9ab081b5c9a5" />


## RESULT
The program for creating To-do list using JavaScript is executed successfully.
