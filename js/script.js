/*
# This project is based on a public project but has been modified 
# according to the requirements of the IST 107 Course.
# Instructor: Washington Valencia
# Institution: CCTB College
*/

document.addEventListener("DOMContentLoaded", () => {
    // Array of colors for background change
    const colors = ['#F0E68C', '#FFDAB9', '#FFE4B5', '#D8BFD8', '#B0E0E6', '#AFEEEE', '#E0FFFF', '#98FB98', '#FFDEAD', '#F5DEB3'];

    let index = 0;

    // Function to change background color with a gradient effect
    const changeBackgroundColor = () => {
        document.body.style.backgroundColor = colors[index];
        index = (index + 1) % colors.length; // Loop back to the start
    };

    // Change color every 2 seconds with a smooth transition
    setInterval(changeBackgroundColor, 2000);
});

let enterButton = document.getElementById("enter");
let input = document.getElementById("userInput");
let ul = document.querySelector("ul");
let item = document.getElementsByTagName("li");
let askUserButton = document.getElementById("askUser");

function inputLength() {
    return input.value.length;
}

function listLength() {
    return item.length;
}

function isDuplicateTask(task) {
    let tasks = document.getElementsByTagName("li");
    for (let i = 0; i < tasks.length; i++) {
        console.log(tasks[i].getElementsByTagName("span")[0].textContent);
        if (tasks[i].getElementsByTagName("span")[0].textContent === task) {
            return true;
        }
    }
    return false;
}

function createListElement(task) {
    let li = document.createElement("li");
    li.appendChild(document.createElement("span")).textContent = task;
    ul.appendChild(li);
    input.value = "";

    function crossOut() {
        li.classList.toggle("done");
    }

    li.addEventListener("click", crossOut);

    let dBtn = document.createElement("button");
    dBtn.appendChild(document.createTextNode("X"));
    li.appendChild(dBtn);

    dBtn.addEventListener("click", function () {
        li.parentNode.removeChild(li);
    });
}


function addListAfterClick() {
    if (inputLength() > 0) {
        let newTask = input.value;
        if (isDuplicateTask(newTask)) {
            alert("Task already exists!");
        } else {
            createListElement(newTask);
        }
    }
}

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.which === 13) { //this now looks to see if you hit "enter"/"return"
        //the 13 is the enter key's keycode, this could also be display by event.keyCode === 13
        createListElement(input.value);
    }
}

function askUser() {
    let newTask;
    do {
        newTask = prompt("Enter a new task:");
        if (newTask) {
            if (isDuplicateTask(newTask)) {
                alert("Task already exists!");
            } else {
                createListElement(newTask);
            }
        }
    } while (newTask);
}


enterButton.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

askUserButton.addEventListener("click", askUser);

