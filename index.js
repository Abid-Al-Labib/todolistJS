const taskInputBox = document.querySelector(".inputSection input")
const braggingItemtitleInputBox = document.querySelector(".header .inputBox")
const addTaskBtn = document.querySelector(".inputSection button")
const todoList = document.querySelector(".wrapper .todoList")
const braggingList = document.querySelector(".sidenav .braggingList")
const taskCounter = document.querySelector(".footer span")
const clearAllBtn = document.querySelector(".footer .clearAllButton")
const saveBraggingItemBtn = document.querySelector(".footer .saveButton")
const bragButton = document.querySelector(".sidenav .bragButton")
const bragWrapper = document.querySelector(".wrapper")
const bragginItemFromList = document.querySelector(".braggingItem")

let currentTaskName = ""
let taskStore = []
let braggingItemList = []



class braggingItem{
    constructor(title, tasks)
    {
        this.title = title
        this.tasks = tasks
    }
}

function showBragWrapper(boolState)
{
    if (boolState==true) {
        bragWrapper.classList.add("active")
    }
    if (boolState==false){
        bragWrapper.classList.remove("active")
    } 
    
}

bragButton.onclick =()=>{

    showBragWrapper(true)
}

taskInputBox.onkeyup = ()=>{
    let userData = taskInputBox.value
    if (userData.trim() == 0)
    {
        addTaskBtn.classList.remove("active")
    }
    else addTaskBtn.classList.add("active")
}

braggingItemtitleInputBox.onkeyup = ()=>{
    let userData = braggingItemtitleInputBox.value
    if(userData.trim() == 0)
    {
        saveBraggingItemBtn.classList.remove("active")
    }
    else saveBraggingItemBtn.classList.add("active")
}


addTaskBtn.onclick = ()=>{
    taskStore.push(taskInputBox.value)
    taskInputBox.value=""
    addTaskBtn.classList.remove("active")
    showTasks()
}

function deleteTask(deleteBtn){
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
    taskCounter.innerHTML = "Tasks completed: " + taskStore.length
}

function showTitle(){
    braggingItemtitleInputBox.value=currentTaskName
}

function clearAll(){
    taskStore = []
    braggingItemtitleInputBox.value=""
    currentTaskName=""
    showTasks()

}

clearAllBtn.onclick = ()=>{
    clearAll()
}

saveBraggingItemBtn.onclick = ()=>{
    let bragItem = new braggingItem(braggingItemtitleInputBox.value, taskStore)
    braggingItemList.push(bragItem)
    console
    updateList()
    clearAll()
    showBragWrapper(false)
    saveBraggingItemBtn.classList.remove("active")
}

function updateList(){
    allItems = []
    braggingList.innerHTML = null
    for (index = 0; index < braggingItemList.length; index++) {
        console.log(braggingItemList[index].title)
        newBragItem = `<li>
                            <span class="braggingItem" onclick='openItemFromBraggingList(this.innerText)'>${braggingItemList[index].title}</span>
                            <span><button value=${index} onclick='deleteBragItem(this)'>🗑️</button></span>
                       </li>`
        allItems.push(newBragItem)
    }
    for (index = 0; index < allItems.length; index++)
    {
        braggingList.innerHTML+=allItems[index]
    }
}

function deleteBragItem(deleteBtn)
{
    braggingItemList.splice(deleteBtn.value,1)
    updateList()
}

function openItemFromBraggingList(innerText)
{
    let theBraggingItem = null
    for (index = 0; index < braggingItemList.length; index++)
    {
        if(braggingItemList[index].title==innerText)
        {
            theBraggingItem = braggingItemList[index] 
        }
    }

    currentTaskName= theBraggingItem.title
    taskStore= theBraggingItem.tasks
    showBragWrapper(true)
    showTasks()
    showTitle()


}
