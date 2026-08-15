function welcome(){
  document.getElementById("welcome").style.display="none";
  document.getElementById("username").style.display="block";
}
function skip(){
  window.location.href="Home.html"
}
function username(){
  document.getElementById("username").style.display="none";
  document.getElementById("password").style.display="block"
}
function redirectstarterpage() {
    window.location.href = "index.html";
}
function redirectaboutpage(){
  window.location.href = "About.html"
}
function redirecthomepage(){
  window.location.href = "Home.html"
}
function redirectupcoming(){
  window.location.href = "Upcoming.html"
}
function redirecteventpage(){
  window.location.href= "Event.html"
}