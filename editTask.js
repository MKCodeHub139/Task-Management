let editTaskData = JSON.parse(localStorage.getItem('editTask'))
let editTaskForm = document.querySelector('.edit-task-form')
let editTitle = document.querySelector('.edit-title')
let editDesc = document.querySelector('.edit-desc')
let editBtn = document.querySelector('.edit-btn');
let editProcess=document.querySelector('.complete')
let msg = document.querySelector('.msg')

editTitle.value = editTaskData.editTaskTitle
editDesc.value = editTaskData.editTaskDesc
editProcess.checked = editTaskData.editProcessVal
editTaskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (editTaskData.length == 0) {
        msg.style.display = 'flex'
        setTimeout(() => {
            msg.style.display = 'none'
        }, 4000)
    }
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    let task = tasks.find(task => task.id == editTaskData.editTaskId)

    if (task) {
        task.title = editTitle.value
        task.desc = editDesc.value
        task.processChecked = editProcess.checked
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
    if (task.title == editTitle.value && task.desc == editDesc.value) {
        msg.style.display = 'flex'
        setTimeout(() => {

            msg.style.display = 'none'
        }, 5000)
    }

    localStorage.removeItem('editTask')
    editTitle.value = ''
    editDesc.value = ''
    editProcess.checked = false
    

    setTimeout(() => {
        window.location.assign('./showTask.html')
    }, 3000)
})