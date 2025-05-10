let user=JSON.parse(localStorage.getItem('user')) 

if(user){
    let editTaskData = JSON.parse(localStorage.getItem('editTask'))
    if(editTaskData){

    let profileName=document.querySelector('.profile h2')
    profileName.innerHTML=user.username

    let editTaskForm = document.querySelector('.edit-task-form')
    let editTaskId =editTaskData.editTaskId
    let editTitle = document.querySelector('.edit-title')
    let editDesc = document.querySelector('.edit-desc')
    let editProcess=document.querySelector('.complete')
    let msg = document.querySelector('.msg')
    let url ="https://6810aa1e27f2fdac24124df0.mockapi.io/api/v1/tasks/tasks/"
    editTitle.value = editTaskData.editTaskTitle
    editDesc.value = editTaskData.editTaskDesc
    editProcess.checked = editTaskData.editProcessVal
    
    editTaskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(`${url}${editTaskId}`,{
        method:'PUT',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            id:editTaskId,
            title:editTitle.value,
            desc:editDesc.value,
            processChecked:editProcess.checked
        })
    }).then(res=>res.json()).then((data)=>{
        console.log(data)
        msg.style.display = 'flex'
        setTimeout(() => {
            msg.style.display = 'none'
        }, 4000)
  
    }).then(()=>localStorage.removeItem('editTask')
    )
    .catch((error)=>{
        msg.innerHTML=error
        msg.style.backgroundColor='rgb(247, 109, 109)'
        msg.style.display = 'flex'
        setTimeout(() => {
            msg.style.display = 'none'
        }, 4000)
    })
    
    editTaskForm.reset()

})
}
else{
alert('Select task to edit')
window.location.assign('http://127.0.0.1:5500/showTask.html')


}
}
else{
    window.location.assign('http://127.0.0.1:5500/login.html')
        }