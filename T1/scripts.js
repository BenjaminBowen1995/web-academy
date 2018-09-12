var countdownFrom = 10;

function performCountdown(){

  if(countdownFrom > 0){
    --countdownFrom;
  }

  var countdownElement= document.getElementById("count");
  countdownElement.innerHTML = countdownFrom;


  if(countdownFrom === 0){
    clearInterval(timer);
  }
}

var timer = setInterval(performCountdown, 1000);
