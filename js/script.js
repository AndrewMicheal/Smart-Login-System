var userEmail = document.getElementById("email");
var userPassword = document.getElementById("password");
var loginUsers;
var btnLogin = document.getElementById("btnLogin");
var alertBtn = document.getElementById("alertBtn");
var isUserExists;
var isPasswordExists;

if(localStorage.getItem("userInfo")!=null){
    loginUsers = JSON.parse(localStorage.getItem("userInfo"));
}
else{
    loginUsers = [];
}

btnLogin.onclick = function(){
    signIn();
}

function isUserFound(){
    if(localStorage.getItem("userInfo")!=null){
        for(var i = 0; i < loginUsers.length; i++){
            if(userEmail.value.toLowerCase().trim() == loginUsers[i].email.toLowerCase() && isUserPasswordFound(userPassword.value , i)){
                localStorage.setItem("userName",JSON.stringify(loginUsers[i]));
                isUserExists = true;
                break;
            }
            else{
                isUserExists = false;
            }
        }
        return isUserExists;
    }
}

function isUserPasswordFound(password , Index){
    if(password == loginUsers[Index].userPassword){
        return true;
    }
    else{
        return false;
    }
}

function errorMessage(alertInput,message){
    alertInput.classList.remove("d-none");
    alertInput.innerHTML = message;
}

function signIn(){
    if(isUserFound()){
        window.open("home.html","_blank");
     }
     else{
         errorMessage(alertBtn , "incorrect email or password");
     }
}

document.addEventListener("keyup",function(e){
    if(e.key == "Enter")
        signIn();
})