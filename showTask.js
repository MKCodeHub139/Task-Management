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