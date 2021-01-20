var userName = document.getElementById("userName");
var userEmail = document.getElementById("email");
var userPassword = document.getElementById("password");
var btnSignUp = document.getElementById("btnSignUp");
var users;
var alertName = document.getElementById("alertName");
var alertEmail = document.getElementById("alertEmail");
var alertPassword = document.getElementById("alertPassword");
var inputs = document.getElementsByClassName("form-control");
var btnSignUpMessage = document.getElementById("btnSignUpMessage");
var isFound;

if(localStorage.getItem("userInfo") == null){
    users = [];
}
else{
    users = JSON.parse(localStorage.getItem("userInfo"))
}

btnSignUp.onclick = function(){
    signUp();
}

function addUser(){
    var user = {
        name : userName.value.trim(),
        email : userEmail.value.trim(),
        userPassword : userPassword.value.trim()
    }
    users.push(user);
    localStorage.setItem("userInfo",JSON.stringify(users));
}

function clearForm(){
    for(var i = 0; i < inputs.length; i++){
        inputs[i].value = "";
        inputs[i].classList.remove("is-valid");
    }
}

userName.oninput = function(){
    checkName();
}

function checkName() {
    var regexName = /^([a-zA-Z]+\s*[A-Z]*)+$/;
    if (regexName.test(userName.value.trim())) {
        inputValid(userName , alertName);
        return true;
    } 
    else {
        userName.value.trim() == "" ? getErrorMessage(userName , "please fill input Name" , alertName) : getErrorMessage(userName , "Enter Name in characters only" , alertName);
        return false;
    }
  }

function isEmailFound(){
    if(localStorage.getItem("userInfo") != null){
        for(var i = 0; i < users.length; i++){
            if(userEmail.value.toLowerCase() == users[i].email.toLowerCase()){
                getErrorMessage(userEmail , "email already exists" , alertEmail);
                isfound = true;
                break;
            }
            else{
                inputValid(userEmail , alertEmail);
                isfound = false;
            }
        }
        return isfound;
    }
}

userEmail.oninput = function(){
    checkEmail();
}

function checkEmail(){
    var regexEmail = /^\w+([-_.]\w+)*@\w+([.-]\w+)*\.\w+([-.]\w+)*$/;
    if(regexEmail.test(userEmail.value.trim())){
        inputValid(userEmail , alertEmail);
        return true;
    }
    else {
        userEmail.value.trim() == "" ? getErrorMessage(userEmail , "please fill input Email" , alertEmail) : getErrorMessage(userEmail , "Enter Email format(yourname@example.com)" , alertEmail);
        return false;
    }
}
userPassword.oninput = function(){
    checkPassword();
}

function checkPassword(){
  if(userPassword.value == ""){
    getErrorMessage(userPassword , "please fill password" , alertPassword);
    return false;
  }
  else{
    inputValid(userPassword , alertPassword);
    return true;
  }
}

function getErrorMessage(userInput , errorMessage , alertInput){
    userInput.classList.add("is-invalid");
    userInput.classList.remove("is-valid");
    alertInput.classList.remove("d-none");
    alertInput.innerHTML = errorMessage;
}

function inputValid(userInput , alertInput){
    userInput.classList.remove("is-invalid");
    userInput.classList.add("is-valid");
    alertInput.classList.add("d-none");
}

function successBtnMessage(btnSignUpMessage){
    btnSignUpMessage.innerHTML = "success";
    btnSignUpMessage.classList.add("text-success");
    btnSignUpMessage.classList.remove("text-danger");
}

function errorBtnMessage(btnSignUpMessage){
    btnSignUpMessage.innerHTML = "failed! please check all constraints inputs";
    btnSignUpMessage.classList.add("text-danger");
    btnSignUpMessage.classList.remove("text-success");
}

function signUp(){
    if(checkName() && !isEmailFound() && checkEmail() && checkPassword()){
        addUser();
        clearForm();
        successBtnMessage(btnSignUpMessage);
    }
    else{
        errorBtnMessage(btnSignUpMessage);
    }
}

document.addEventListener("keyup",function(e){
   if(e.key == "Enter")
      signUp();
})