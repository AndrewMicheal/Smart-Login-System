
var userName = JSON.parse(localStorage.getItem("userName"));
var url = location.pathname;
if(userName == null){
    var urlReplace = url.replace("/home.html","/index.html");
    window.location.href = urlReplace; 
}