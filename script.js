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