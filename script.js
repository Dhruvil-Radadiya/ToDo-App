document.addEventListener("DOMContentLoaded", function() {
    const inputBox = document.getElementById("input-box");
    const addTaskBtn = document.getElementById("add-task-btn");
    const listContainer = document.getElementById("list-container");
    const clockElement = document.getElementById("clock");


    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    }
    setInterval(updateClock, 1000);

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
            const checkedItems = Array.from(listContainer.querySelectorAll(".checked"));
            checkedItems.forEach(item => listContainer.appendChild(item));
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
    updateClock(); 
});
