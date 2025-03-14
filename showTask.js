let tbody=document.querySelector('table tbody')
let tasks =JSON.parse(localStorage.getItem('tasks')) ||[]
if(tasks.length<1){
    let noTaskMsg =document.querySelector('.no-task')
    noTaskMsg.style.display='block'
}
function renderTasks(task){
    let tr =document.createElement('tr')
    let id =document.createElement('td')
    id.classList.add('id')
    id.innerHTML=task.id
    let title =document.createElement('td')
    title.classList.add('title')
    title.innerHTML=task.title
    
    let desc =document.createElement('td')
    desc.classList.add('desc')
    desc.innerHTML=task.desc
    
    let action =document.createElement('td')
    action.classList.add('action')

    let editBtn =document.createElement('button')
    editBtn.classList.add('edit-btn')
    editBtn.innerHTML='Edit'
    
    let deleteBtn =document.createElement('button')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.innerHTML='Delete'

    let completePending =document.createElement('td')
    completePending.classList.add('complete-pending')
    let processChecked=task.processChecked
    if(processChecked){
        completePending.innerHTML='complete'
    }
    else{
        completePending.innerHTML='Pending'
    }



    action.appendChild(editBtn)
    action.appendChild(deleteBtn)
    tr.appendChild(id)
    tr.appendChild(title)
    tr.appendChild(desc)
    tr.appendChild(action)
    tr.appendChild(completePending)

    tbody.appendChild(tr)

}
tasks.forEach(task => {
    renderTasks(task)
   
    
});
// let tr = document.querySelectorAll('tr')
let editBtns =document.querySelectorAll('.edit-btn')
let deleteBtns =document.querySelectorAll('.delete-btn')
deleteBtns.forEach((deleteBtn)=>{
    deleteBtn.addEventListener('click',(e)=>{
        e.preventDefault()
        let tr =e.target.closest('tr')
        let id = parseInt(tr.querySelector('.id').innerHTML);
        tasks =tasks.filter((task)=>task.id !== id)
      
        tasks = tasks.map((task, index) => ({
            ...task,
            id: index + 1,
        }));
        localStorage.setItem('tasks',JSON.stringify(tasks))
        tr.remove();
        if(tr.remove){
            msg.style.display = 'flex'
            setTimeout(() => {
                msg.style.display = 'none'
            }, 4000)
        }
        // console.log(task)
    })
})
editBtns.forEach((editBtn)=>{
    editBtn.addEventListener('click',(e)=>{
        e.preventDefault()
        let tr=e.target.closest('tr')
        // window.location.assign('./editTask.html')
        let editTaskId=tr.querySelector('.id').innerHTML
        let editTaskTitle=tr.querySelector('.title').innerHTML
        let editTaskDesc=tr.querySelector('.desc').innerHTML
        let editProcess=tr.querySelector('.complete-pending').innerHTML
        let editProcessVal =''

        if(editProcess==='complete'){
            console.log('complete')
            editProcessVal =true
        }
        else{
            console.log('pending')
            editProcessVal =false
            
        }
        let editTask ={
            editTaskId:editTaskId,
            editTaskTitle:editTaskTitle,
            editTaskDesc:editTaskDesc,
            editProcessVal:editProcessVal,
        }
        localStorage.setItem('editTask',JSON.stringify(editTask))
        window.location.assign('./editTask.html')
    })
})

// search logic

let search =document.querySelector('.search')
let searchInput =search.querySelector('input')

searchInput.addEventListener('keyup',(e)=>{
    e.preventDefault()
    let searchVal = searchInput.value.trim().toLowerCase()

        let taskSearch=tasks.filter(task=>task.title.toLowerCase().includes(searchVal) || task.desc.toLowerCase().includes(searchVal))

        tbody.innerHTML=''
        taskSearch.forEach(task=>{
            renderTasks(task)
        })

})
let taskFilterUl=document.querySelector('.task-filter ul')
let taskFilterActiveLis = taskFilterUl.querySelectorAll('li')
taskFilterActiveLis.forEach(taskFilterActiveLi=>{
    taskFilterActiveLi.addEventListener('click', (e)=>{
        let activeLi =taskFilterUl.querySelector('.active-filter')
                if(activeLi){
                    activeLi.classList.remove('active-filter')
                }
            e.target.classList.add('active-filter')
    
    })
})
// show pending

let pendingTasksBtn =taskFilterUl.querySelector('.pending')
let completeTasksBtn =taskFilterUl.querySelector('.complete')
let allTasksBtn =taskFilterUl.querySelector('.all')


pendingTasksBtn.addEventListener('click', () =>{
    tbody.innerHTML=''
    let taskFilter = tasks.filter(task=>task.processChecked === false)
    taskFilter.forEach(task=>renderTasks(task))
    
    console.log(taskFilter)
})
completeTasksBtn.addEventListener('click', () =>{
    tbody.innerHTML=''
    let taskFilter = tasks.filter(task=>task.processChecked === true)
    taskFilter.forEach(task=>renderTasks(task))
    
    console.log(taskFilter)
})
allTasksBtn.addEventListener('click', () =>{
    tbody.innerHTML=''
    tasks.forEach(task=>renderTasks(task))
})