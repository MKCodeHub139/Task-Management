let ham =document.querySelector('.ham')
let line2 =ham.querySelector('.line2')
let list =document.querySelector('.menu ul')
let darkMode = document.querySelector('.dark-mode')

ham.addEventListener('click',()=>{
    if(list.style.display=='none'||list.style.display==''){
        list.style.display='flex'
        line2.style.float='left'
    }
    else{
        list.style.display='none'
        line2.style.float='right'

    }
})
darkMode.addEventListener('click',()=>{
    if(document.body.style.backgroundColor ==''){
        document.body.style.backgroundColor='#1a1919'
        document.body.style.color='#dae1ea'
    }
    else{
        document.body.style.backgroundColor=''
        document.body.style.color='#1a1919'
    }
})