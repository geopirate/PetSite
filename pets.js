// reference array for the objects I'm storing as boolean, more efficent for a database
var traitsList = ["orange", "white", "gray", "black", "fiesty", "cuddly", "playful", "shy"];

// object prototype
function pet(name, traits) {
  this.name = name;
  this.traits = traits;
}
// static pets data
var carrot = new pet("Carrot", [true, true, false, false, true, true, false, false]);
var turnip = new pet("Turnip", [false, true, false, false, false, true, false, false]);
var radish = new pet("Radish", [false, false, true, true, false, true, true, false]);
var sylar = new pet("Sylar", [false, false, false, true, true, false, true, true]);

// function to parse the user name into a message
function parseMessage (message, index){
  var username = localStorage.getItem("username");
  message = message.substr(0,index) + username + message.substr(index);
  return message;
}

// get the path of the current page for selective functions
var splitPath = window.location.pathname.split("/");
var trimmedPath = splitPath[splitPath.length-1].slice(0,-5);

var returningName = localStorage.getItem("username");

// This code is to highlight the link of the current page
/* the first part is also the return page scripts. I think most users of this site will be
first time users, so this is the alternative code path, but for most sites I would do it
the opposite way.*/
if (trimmedPath === "return") {
  // if we somehow end up here without a user name stored, go to the index
  if (returningName == null){
    location.replace("index.html");
  }
  // since we are on the return page higlight home anyway
  document.getElementById("indexLink").style.background = "#0077b5";
  // print a welcome back message
  elhelper = document.getElementById("helperText");
  var helperText = "Welcome back ! Please feel wecome to try again or select a new name below.";
  helperText = parseMessage(helperText, 13);
  elhelper.innerHTML += helperText;

  // replace the stored name
  function validateForm() {
    var x = document.forms["form"]["userName"].value;
    // if the name field is blank, do nothing
    if (x != ""){
      // if it's not blank, replace the name in local storage
      localStorage.setItem("username", x);
    }
  }

  var elForm = document.getElementById('form');
  elForm.addEventListener('submit',validateForm, false);
  // TODO add the info for the top match upon return to this page
  /* Array.max = function( array ){
      return Math.max.apply( Math, array );
    };*/
} else if (trimmedPath === ""){
  location.replace("index.html");
}else {
  // set the button background to a different blue for the current page
  document.getElementById(trimmedPath + "Link").style.background = "#0077b5";
}

// scripts for index page
if (trimmedPath === "index"){
  if (returningName != null){
    location.replace("return.html");
  }

  function validateForm() {
    var x = document.forms["form"]["userName"].value;
    localStorage.setItem("username", x);
    // TODO: add better form validation
  }

  var elForm = document.getElementById('form');
  elForm.addEventListener('submit',validateForm, false);
  // TODO: add a mouseover event for the name submission
}//end index script

// scripts for selection page
if (trimmedPath === "selection"){
  elhelper = document.getElementById("helperText");
  var helperText = "Welcome  please choose your desired cat attributes.";
  helperText = parseMessage(helperText, 8);
  elhelper.innerHTML += helperText;

  // function to toggle checkboxes with buttons
  function toggle(el){
    // get the id of the corresponding check box
    var box = document.getElementById(el.id+"Check");
    var label = document.getElementById(el.id+"Label");
    // toggle the checkbox
    box.checked=!box.checked;
    // check the corresponding check box and change the class of the button to match
    if(box.checked == false){
      el.className = "unchecked";
      label.className= "hidden";
    } else {
      el.className = "checked";
      label.className = "";
    }
  }

  // function to match user selections against what I have
  function matchCats(){
    var form = document.getElementById("entryForm");
    var formLength = form.length - 1;
    var matchArray = [0,0,0,0];
    // get the percentage each match should count for.
    var j = 100 / formLength;
    for (var i=0; i < formLength; i++){
      var k = form[i].checked;
      if (carrot.traits[i] == k){
        matchArray[0] += j;
      } if (turnip.traits[i] == k){
        matchArray[1] += j;
      } if (radish.traits[i] == k){
        matchArray[2] += j;
      } if (sylar.traits[i] == k){
        matchArray[3] += j;
      }
    }
    localStorage.setItem("matches", JSON.stringify(matchArray));
  }
  var elForm = document.getElementById('entryForm');
  elForm.addEventListener('submit',matchCats, false);
} //end selection page

// scripts for results page
if (trimmedPath === "results"){
  elresults = document.getElementById("resultsText");
  var resultsText = "Well,  this how you match with these cats from your selctions.";
  resultsText = parseMessage(resultsText, 6);
  elresults.innerHTML += resultsText;
  var returningMatches = localStorage.getItem("matches");
  // set the percentage bars for each cat
  myMatches = JSON.parse(localStorage.getItem("matches"));
  for (i = 0; i < myMatches.length; i++){
    var bar = document.getElementById("bar"+i);
    var text = document.getElementById("text"+i);
    bar.style.width = (myMatches[i]+"%");
    text.innerHTML += (" " + myMatches[i] + "%")
  }
}
