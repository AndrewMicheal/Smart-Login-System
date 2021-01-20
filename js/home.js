
var userName = JSON.parse(localStorage.getItem("userName"));
var url = location.pathname;

// when user change URL without login then change url path
var nameInput = document.getElementById("name");
nameInput.innerHTML = userName.name;
var btnLogOut = document.getElementById("btnLogOut");
btnLogOut.onclick = function(){
    logOut();
}

function logOut(){
    localStorage.removeItem("userName");
    var urlReplace = url.replace("/home.html","/index.html");
    window.location.href = urlReplace; 
}

