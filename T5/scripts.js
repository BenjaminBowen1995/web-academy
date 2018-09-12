//Script variables
var countdownFrom = 10;
var countdownCurrent = countdownFrom;
var timeRemaining = [0, 0, 0];
var countdownElement;

var secInMin = 60;
var secInHour = 3600;
//CSS variables
var countdownStateClass = "running";

//HTML Elements
var buttonClick = document.querySelector("#startButton");
buttonClick.addEventListener("click", runFunction, false);

function runFunction(event) {

    event.preventDefault();

    //access our form element
    var durationInput = document.forms[0].elements[0];

    //if we dont have a var in the form, default it to 10
    countdownFrom = parseInt(durationInput.value, 10) || 10;

    countdownCurrent = countdownFrom;

    performCountdown();


}

function performCountdown() {

    countdownElement = [
        document.getElementById("countH"),
        document.getElementById("countM"),
        document.getElementById("countS")
    ];
    //assert text content and design to the page

    calcHour();
    calcMin();
    calcSec();

    countdownElement.className = countdownStateClass;

    //check if countdown has ended
    if (countdownCurrent > 0) {

        if (countdownCurrent < 5) {
            //less than 5? make it orange text
            countdownStateClass = "ending";

        } else {
            //5 or more? green text
            countdownStateClass = "running";

        }

        setTimeout(performCountdown, 100);
        //decrement if not
        countdownCurrent--;

    } else {
        //0? red text
        countdownStateClass = "done";

    }

}
function calcSec(){
    countdownElement[2].innerHTML = countdownCurrent % secInMin;
}
function calcMin(){
    countdownElement[1].innerHTML = Math.floor(countdownCurrent/ secInMin) - secInMin * countdownElement[0].innerHTML;
}
function calcHour(){
    countdownElement[0].innerHTML =  Math.floor(countdownCurrent/ secInHour) ;
}
