let user=JSON.parse(localStorage.getItem('user')) 
if(user){
let tbody=document.querySelector('table tbody')

let url ="https://6810aa1e27f2fdac24124df0.mockapi.io/api/v1/tasks/tasks/"
function fetchApi(){
    fetch(url).then(response=>response.json()).then((data)=>{
        let filterDataByUser=data.filter(task=>task.userId===user.id)
        renderTasks(filterDataByUser)})
}


fetchApi();


let profileName=document.querySelector('.profile h2')
profileName.innerHTML=user.username

function renderTasks(data){
    if(data.length==0){
        let noTask =document.querySelector('.no-task')
        noTask.style.display='block'
    }
    else{
        let noTask =document.querySelector('.no-task')
        noTask.style.display='none'
        data.map((task,index)=>{
            let tr =document.createElement('tr')
            let id =document.createElement('td')
            id.classList.add('id')
            id.innerHTML=index+1
            id.setAttribute('id',task.id);
        
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
            if(task.processChecked){
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
            return(tbody)
            
        })
    }
        }
    
        tbody.addEventListener('click',(e)=>{
            if(e.target.classList.contains('delete-btn')){
                let tr = e.target.closest('tr');
                let id = tr.querySelector('.id').id;
                fetch(`${url}${id}`,{
                    method:'DELETE',
                    headers:{'content-type':'application/json'},
                    
                }).then(response=>response.json()).then(()=>tbody.innerHTML='').then(()=>fetchApi()).catch(error=>console.error('error',error))
            }
            else if(e.target.classList.contains('edit-btn')){
                let editBtns =document.querySelectorAll('.edit-btn')
                editBtns.forEach((editBtn)=>{
                    editBtn.addEventListener('click',(e)=>{
    
        e.preventDefault()
        let tr=e.target.closest('tr')
        // window.location.assign('./editTask.html')
        let editTaskId=tr.querySelector('.id').id
        let editTaskTitle=tr.querySelector('.title').innerHTML
        let editTaskDesc=tr.querySelector('.desc').innerHTML
        let editProcess=tr.querySelector('.complete-pending').innerHTML
        let editProcessVal =''

        if(editProcess==='complete'){
            editProcessVal =true
        }
        else{
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

            }
        })


        // sorting tasks




let sortingReverse = document.querySelector('.sorting-reverse')
sortingReverse.addEventListener('click', () =>{
    
    fetch(url).then(res=>res.json()).then((data)=>{
        tbody.innerHTML=''
        let filterDataByUser=data.filter(task=>task.userId===user.id)
        if(!(sortingReverse.classList.contains('sort-done'))){
            filterDataByUser.reverse()
            renderTasks(filterDataByUser)
            
            sortingReverse.classList.add('sort-done')
        }
        else{
            renderTasks(filterDataByUser)
            sortingReverse.classList.remove('sort-done')
            
        }
        })
})

      // search logic

let search =document.querySelector('.search')
let searchInput =search.querySelector('input')

function searchDebounce(func,time){
    let timeOut;
   return (...args)=>{
    clearTimeout(timeOut)
    timeOut=setTimeout(()=>{
        func(...args)
    },time)
   }
}
const searchedData =(e)=>{

    // event.preventDefault()
    let searchVal = searchInput.value.trim().toLowerCase()

    fetch(url).then(res=>res.json()).then((data)=>{
        
        let taskSearch=data.filter(tasks=>tasks.title.toLowerCase().includes(searchVal) || tasks.desc.toLowerCase().includes(searchVal))
            
                        tbody.innerHTML=''
                        let activeFilter =document.querySelector('.active-filter')
                        if(activeFilter.innerHTML=='Complete'){
                            let complete=taskSearch.filter(task=>task.processChecked===true && task.userId==user.id)
                            renderTasks(complete)
                        }
                        else if(activeFilter.innerHTML=='Pending'){
                            let pending=taskSearch.filter(task=>task.processChecked===false && task.userId==user.id)
                            renderTasks(pending)
                        }
                        else{
                            let filterDataByUser=taskSearch.filter(task=>task.userId===user.id)
                            renderTasks(filterDataByUser)                    
                        }
    
        
        })

}
searchInput.addEventListener('keyup',searchDebounce(searchedData,500))


    let taskFilterUl=document.querySelector('.task-filter ul')
    let pendingTasksBtn =taskFilterUl.querySelector('.pending')
    let completeTasksBtn =taskFilterUl.querySelector('.complete')
    let allTasksBtn =taskFilterUl.querySelector('.all')
    // console.log(taskFilterUl.closest('li').classList.contains('active-filter'))
    
    pendingTasksBtn.addEventListener('click',()=>{
        let activeFilter=taskFilterUl.querySelector('.active-filter')
        activeFilter.classList.remove('active-filter')
        pendingTasksBtn.classList.add('active-filter')
        
        fetch(url).then(res=>res.json()).then((data)=>{
            tbody.innerHTML=''
            let pending=data.filter(task=>task.processChecked===false && task.userId==user.id)
            renderTasks(pending)
        })
    })
    
    completeTasksBtn.addEventListener('click',()=>{
        let activeFilter=taskFilterUl.querySelector('.active-filter')
        activeFilter.classList.remove('active-filter')
        completeTasksBtn.classList.add('active-filter')
        fetch(url).then(res=>res.json()).then((data)=>{
            tbody.innerHTML=''
            let complete=data.filter(task=>task.processChecked===true && task.userId==user.id)
            renderTasks(complete)
        })
    })
    
    allTasksBtn.addEventListener('click',()=>{
        let activeFilter=taskFilterUl.querySelector('.active-filter')
        activeFilter.classList.remove('active-filter')
        allTasksBtn.classList.add('active-filter')
        fetch(url).then(res=>res.json()).then((data)=>{
            tbody.innerHTML=''
            let filterDataByUser=data.filter(task=>task.userId===user.id)
        renderTasks(filterDataByUser)
        })
    })
}
else{
    window.location.assign('http://127.0.0.1:5500/login.html')
    }

