document.addEventListener("DOMContentLoaded", function() {
    const inputBox = document.getElementById("input-box");
    const addTaskBtn = document.getElementById("add-task-btn");
    const listContainer = document.getElementById("list-container");

    addTaskBtn.addEventListener("click", addTask);
    listContainer.addEventListener("click", handleListClick);

    function addTask() {
        const taskText = inputBox.value.trim();
        if (taskText !== "") {
            const li = document.createElement("li");
            li.textContent = taskText;
            listContainer.appendChild(li);
            const span = document.createElement("span");
            span.textContent = "\u00d7";
            li.appendChild(span);
            saveData();
        } else {
            alert("You must write something!");
        }
        inputBox.value = "";
    }

    function handleListClick(event) {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked");
            saveData();
        } else if (event.target.tagName === "SPAN") {
            event.target.parentElement.remove();
            saveData();
        }
    }

    function saveData() {
        localStorage.setItem("todoList", listContainer.innerHTML);
    }

    function loadSavedData() {
        const savedData = localStorage.getItem("todoList");
        if (savedData) {
            listContainer.innerHTML = savedData;
        }
    }

    loadSavedData();
});
