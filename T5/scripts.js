//Script variables
var countdownFrom = 10;


var secInMin = 60;
var secInHour = 3600;

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

  //grab my html template
  var template = document.querySelector('#template');
  //clone it
  var newCountdown = template.cloneNode(true);
  newCountdown.id = null;
  //place the clone at the top of our "list"
  template.parentNode.insertBefore(newCountdown, template);

  //get the objects from the HTML
    var countdownElement = [
        newCountdown.querySelector(".countH"),
        newCountdown.querySelector(".countM"),
        newCountdown.querySelector(".countS"),
        countdownFrom
    ];
    var stopButtonElement = newCountdown.querySelector(".stop-button");
    stopButtonElement.addEventListener('click', stopCountdown, false);
    //assert text content and design to the page

    countdownElement[0].innerText = Math.floor(countdownElement[4]/ secInHour);
    countdownElement[1].innerHTML = Math.floor(countdownElement[4]/ secInMin) - secInMin * countdownElement[0].innerHTML;
    countdownElement[2].innerHTML = countdownElement[4] % secInMin;

    countdownElement.className = countdownStateClass;

    //check if countdown has ended
    if (countdownElement[4] > 0) {

        if (countdownElement[4] < 5) {
            //less than 5? make it orange text
            countdownStateClass = "ending";

        } else {
            //5 or more? green text
            countdownStateClass = "running";

        }

        setTimeout(performCountdown, 100);
        //decrement if not
        countdownElement[4]--;

    } else {
        //0? red text
        countdownStateClass = "done";

    }

}
