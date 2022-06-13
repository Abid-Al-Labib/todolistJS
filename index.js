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
let taskStore = new Map()
let braggingItemList = new Map()



class braggingItem{
    constructor(title, tasks)
    {
        this.title = title
        this.tasks = new Map(tasks)
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
    taskStore.set(taskStore.size, taskInputBox.value)
    taskInputBox.value=""
    addTaskBtn.classList.remove("active")
    showTasks()
}

function deleteTask(deleteBtn){
    taskStore.delete(parseInt(deleteBtn.value))
    tempMap = new Map()
    for (const[key,value] of taskStore)
    {
        tempMap.set(tempMap.size,value)
    }
    taskStore=tempMap
    showTasks()
}

function showTasks(){
    allTasks = []
    todoList.innerHTML = null
    for (index = 0; index < taskStore.size; index++) {
        newTask = `<li>${taskStore.get(index)}<span><button value=${index} onclick='deleteTask(this)'>🗑️</button></span></li>`
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
    taskStore.clear()
    braggingItemtitleInputBox.value=""
    currentTaskName=""
    showTasks()

}

clearAllBtn.onclick = ()=>{
    clearAll()
}

saveBraggingItemBtn.onclick = ()=>{
    let bragItem = new braggingItem(braggingItemtitleInputBox.value, taskStore)
    braggingItemList.set(braggingItemList.size, bragItem)
    updateList()
    clearAll()
    showBragWrapper(false)
    saveBraggingItemBtn.classList.remove("active")
}

function updateList(){
    allItems = []
    braggingList.innerHTML = null
    for (index = 0; index < braggingItemList.size; index++) {
        newBragItem = `<li>
                            <span class="braggingItem" onclick='openItemFromBraggingList(this.innerText)'>${braggingItemList.get(index).title}</span>
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
    braggingItemList.delete(deleteBtn.value)
    tempMap = new Map()
    for (const[key,value] of braggingItemList)
    {
        tempMap.set(tempMap.size,value)
    }
    braggingItemList=tempMap
    updateList()
}

function openItemFromBraggingList(innerText)
{
    let theBraggingItem = null
    for (index = 0; index < braggingItemList.size; index++)
    {
        if(braggingItemList.get(index).title==innerText)
        {
            theBraggingItem = braggingItemList.get(index) 
        }
    }

    currentTaskName= theBraggingItem.title
    taskStore = new Map(theBraggingItem.tasks)
    showBragWrapper(true)
    showTasks()
    showTitle()


}
