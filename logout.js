   // Logout functionality
   let logout =document.querySelector('.log-out')
   logout.addEventListener('click',()=>{
    if(confirm('Log out')){
        localStorage.removeItem('user')
    }

   })