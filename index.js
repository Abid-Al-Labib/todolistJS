const inputBox = document.querySelector(".inputSection input")
const addTaskBtn = document.querySelector(".inputSection button")
const todoList = document.querySelector(".wrapper .todoList")
const taskCounter = document.querySelector(".footer span")

const taskStore = []

showTasks()

inputBox.onkeyup = ()=>{
    let userData = inputBox.value
    console.log(userData.trim())
    if (userData.trim() == 0)
    {
        addTaskBtn.classList.remove("active")
    }
    else addTaskBtn.classList.add("active")

}

addTaskBtn.onclick = ()=>{
    taskStore.push(inputBox.value)
    console.log(taskStore)
    inputBox.value=null
    addTaskBtn.classList.remove("active")
    showTasks()
}

function showTasks(){
    allTasks = []
    todoList.innerHTML = null
    for (index = 0; index < taskStore.length; index++) {
        newTask = `<li>${taskStore[index]}<span><button>🗑️</button></span></li>`
        allTasks.push(newTask)
    }
    for (index = 0; index < allTasks.length; index++)
    {
        todoList.innerHTML+=allTasks[index]
    }
    taskCounter.innerHTML = "Tasks remaining: " + taskStore.length
}

