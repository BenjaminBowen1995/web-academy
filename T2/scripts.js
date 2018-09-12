var countdownFrom = 10;
var countdownCurrent = countdownFrom;
var countdownStateClass = "running";



function performCountdown(){

  if(countdownCurrent > 0){
    countdownCurrent--;
    if(countdownCurrent < 5){
      countdownStateClass = "ending";
    }else{
      countdownStateClass = "running";
    }
  }else{
      countdownStateClass = "done";
  }

  var countdownElement= document.getElementById("count");
  countdownElement.innerHTML = countdownCurrent;
  countdownElement.className = countdownStateClass;

  if(countdownCurrent === 0){
  //clearInterval(timer);
  }
}


document.getElementById("count").innerHTML = countdownCurrent;
var timer = setInterval(performCountdown, 100);
