let ham =document.querySelector('.ham')
let line2 =ham.querySelector('.line2')
let list =document.querySelector('.menu ul')
let darkModeBtn = document.querySelector('.dark-mode')
let darkMode =false


ham.addEventListener('click',()=>{
    if(list.style.display=='none'||list.style.display==''){
        list.style.display='block'
        line2.style.float='left'
    }
    else{
        list.style.display='none'
        line2.style.float='right'

    }
})
darkModeBtn.addEventListener('click',()=>{
    if(document.body.style.backgroundColor ==''){
        document.body.style.backgroundColor='#1a1919'
        document.body.style.color='#dae1ea'
        darkMode =true
        localStorage.setItem('darkMode',darkMode)

    }
    else{
        document.body.style.backgroundColor=''
        document.body.style.color='#1a1919'
        darkMode=false
        localStorage.removeItem('darkMode')

    }
})
if(localStorage.getItem('darkMode')){
    document.body.style.backgroundColor='#1a1919'
        document.body.style.color='#dae1ea'
        localStorage.setItem('darkMode',darkMode)
    }


// Logout functionality
   // Logout functionality
   let logout =document.querySelector('.log-out')
   logout.addEventListener('click',()=>{
    if(confirm('Log out')){
        localStorage.removeItem('user')
    }
   })