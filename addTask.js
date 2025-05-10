let user=JSON.parse(localStorage.getItem('user')) 
if(user){
let form =document.querySelector('.add-task-form')
let title =document.querySelector('.add-task-form .title')
let desc =document.querySelector('.add-task-form .desc')
let process =document.querySelector('.add-task-form .complete')
let msg =document.querySelector('.msg')

let url ="https://6810aa1e27f2fdac24124df0.mockapi.io/api/v1/tasks/tasks/";

let profileName=document.querySelector('.profile h2')
profileName.innerHTML=user.username

form.addEventListener('submit', (e) => {
    e.preventDefault()

    function insertData(){
       
        fetch(url,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                title:title.value,
                desc:desc.value,
                processChecked:process.checked,
                userId:user.id
            })
        }).then(response=>response.json()).then(()=> msg.style.display ='flex').then(()=> setTimeout(()=>{msg.style.display='none' },3000))
        .catch(error=>console.error('Error',error));
        }
    insertData();

form.reset()
});
}
else{
window.location.assign('http://127.0.0.1:5500/login.html')
}