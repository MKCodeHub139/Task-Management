let userApi ='https://6810aa1e27f2fdac24124df0.mockapi.io/api/v1/tasks/users/'
let registerForm = document.querySelector(".register-form");
let loginForm = document.querySelector(".login-form");
let haveAccount = document.querySelector(".haveAccount");
let noAccount = document.querySelector(".noAccount");
let regUsername = document.querySelector(".reg-username");
let regPassword = document.querySelector(".reg-password");
let loginUsername = document.querySelector(".login-username");
let loginPassword = document.querySelector(".login-password");

haveAccount.addEventListener("click", (e) => {
  e.preventDefault();
  if (loginForm.style.display === "" || loginForm.style.display == "none") {
    registerForm.style.display = "none";
    loginForm.style.display = "flex";
  }
});
noAccount.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    registerForm.style.display === "" ||
    registerForm.style.display == "none"
  ) {
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
  }
});
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(userApi,{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify({
      username: regUsername.value,
      password: regPassword.value,

    })
  }).then(res=>res.json()).then((data)=>{
    alert(`registered successfully ${data.username}`)
    window.location.assign('http://127.0.0.1:5500/index.html')
  })
  .catch(error=>console.error(error))
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(userApi).then(res=>res.json()).then((data)=>{
    let filteredUser =data.filter((task=>task.username===loginUsername.value && task.password===loginPassword.value))
    if (filteredUser.length === 1) {
        window.location.assign('http://127.0.0.1:5500/index.html')
        let user={
          id:filteredUser[0].id,
          username:filteredUser[0].username,
          password:filteredUser[0].password,
        }
        localStorage.setItem('user',JSON.stringify(user))
        alert(`Hello ${filteredUser[0].username} logged in successfully`);
      } else {
        alert("Invalid username or password");
      }  })
});
