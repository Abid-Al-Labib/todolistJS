const inputBox = document.querySelector(".inputSection input")
const addTaskBtn = document.querySelector(".inputSection button")
const todoList = document.querySelector(".wrapper .todoList")
const taskCounter = document.querySelector(".footer span")
const clearAllBtn = document.querySelector(".footer button")

let taskStore = []

showTasks()

inputBox.onkeyup = ()=>{
    let userData = inputBox.value
    if (userData.trim() == 0)
    {
        addTaskBtn.classList.remove("active")
    }
    else addTaskBtn.classList.add("active")

}

addTaskBtn.onclick = ()=>{
    taskStore.push(inputBox.value)
    inputBox.value=null
    addTaskBtn.classList.remove("active")
    showTasks()
}

function deleteTask(deleteBtn){
    console.log(deleteBtn.value)
    taskStore.splice(deleteBtn.value,1)
    showTasks()
}

function showTasks(){
    allTasks = []
    todoList.innerHTML = null
    for (index = 0; index < taskStore.length; index++) {
        newTask = `<li>${taskStore[index]}<span><button value=${index} onclick='deleteTask(this)'>🗑️</button></span></li>`
        allTasks.push(newTask)
    }
    for (index = 0; index < allTasks.length; index++)
    {
        todoList.innerHTML+=allTasks[index]
    }
    taskCounter.innerHTML = "Tasks remaining: " + taskStore.length
}


clearAllBtn.onclick = ()=>{
    taskStore = []
    showTasks()
}

