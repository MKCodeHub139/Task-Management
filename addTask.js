let form =document.querySelector('.add-task-form')
let title =document.querySelector('.add-task-form .title')
let desc =document.querySelector('.add-task-form .desc')
let process =document.querySelector('.add-task-form .complete')
let msg =document.querySelector('.msg')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let tasks = JSON.parse(localStorage.getItem('tasks')) ||[]
    processChecked =process.checked
    let newTask ={
        id:tasks.length+1,
        title:title.value,
        desc:desc.value,
        processChecked:processChecked
    }
    let previousTaskLength =tasks.length
    tasks.push(newTask)
    localStorage.setItem('tasks',JSON.stringify(tasks))

    if(tasks.length>previousTaskLength){

        msg.style.display ='flex'
        setTimeout(()=>{
            
            msg.style.display='none'
        },3000)
    }

form.reset()
});