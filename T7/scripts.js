recoverCountdowns();

var secInMin = 60;
var secInHour = 3600;

var buttonClick = document.querySelector("#startButton");
buttonClick.addEventListener("click", startButtonPressed, false);

var clearClick = document.querySelector("#clearButton");
clearClick.addEventListener("click", clearButtonPressed, false);

function startButtonPressed(event) {
    event.preventDefault();

    //access our form element
    var durationInputH = document.forms[0].elements[0];
    var durationInputM = document.forms[0].elements[1];
    var durationInputS = document.forms[0].elements[2];

    //value is in base 10
    //if we dont have a var in the form, default it to 10
    var countdownFrom =   [
      parseInt(durationInputH.value, 10) || 0,
      parseInt(durationInputM.value, 10) || 0,
      parseInt(durationInputS.value, 10) || 10];

    performCountdown(countdownFrom);
}

function clearButtonPressed(event) {
    event.preventDefault();
    localStorage.clear();
    localStorage.removeItem("countdowns");
    location.reload();
}

function performCountdown(duration) {

    var countdownFrom = duration;

    //grab my html template and clone it
    var template = document.querySelector("#template");
    var newCountdown = template.cloneNode(true);
    newCountdown.id = null;
    //place the clone at the top of our "list"
    template.parentNode.insertBefore(newCountdown, template);

    //get the objects from the HTML
    var countdownElement = [
        newCountdown.querySelector(".countH"),
        newCountdown.querySelector(".countM"),
        newCountdown.querySelector(".countS")
    ];
    //get stop button, add event listener
    var stopButtonElement = newCountdown.querySelector(".stopButton");
    stopButtonElement.addEventListener("click", stopCountdown, false);

    countdownLoop();

    function countdownLoop() {
        var countdownStateClass = "running";

        countdownElement[0].setAttribute('countH', countdownFrom[0]);
        countdownElement[1].setAttribute('countM', countdownFrom[1]);
        countdownElement[2].setAttribute('countS', countdownFrom[2]);

        //assert text content and design to the page
        countdownElement[0].innerText = countdownFrom[0];
        countdownElement[1].innerText = countdownFrom[1];
        countdownElement[2].innerText = countdownFrom[2];

        //check if countdown has ended
        if (
            countdownFrom[0] > 0 ||
            countdownFrom[1] > 0 ||
            countdownFrom[2] > 0) {

            if (countdownFrom[0] === 0 &&
                countdownFrom[1] === 0 &&
                countdownFrom[2] < 5) {
                //less than 5? make it orange text
                countdownStateClass = "ending";

            } else {
                //5 or more? green text
                countdownStateClass = "running";

            }

        } else {
                //0? red text
                countdownStateClass = "done";

        }

            countdownElement.className = countdownStateClass;

            decrement();

            cacheCountdowns();

        }

        function decrement(){

          //if we have seconds, decrement seconds
          if (countdownFrom[2] > 0) {
              countdownFrom[2] -= 1;
          }
          //if we dont have seconds
          else if (countdownFrom[2] == 0) {
              //check if we have minutes
              if (countdownFrom[1] > 0) {
                  //if we have minutes decrement minute
                  //and give us 59 more seconds
                  countdownFrom[1] -= 1;
                  countdownFrom[2] = 59;
                  //if we dont have a minutes
                  //check if we have an hour
              } else if (countdownFrom[1] == 0) {
                  if (countdownFrom[0] > 0) {
                      //if we have an hour, give 59 minutes
                      //and 59 seconds
                      countdownFrom[0] -= 1;
                      countdownFrom[1] = 59;
                      countdownFrom[2] = 59;
                  }
              }
          }

              setTimeout(countdownLoop, 1000);


        }

        function stopCountdown(event) {

            event.preventDefault();
            countdown = 0;
            template.parentNode.removeChild(newCountdown);

        }
}

function cacheCountdowns() {

    var allCounters = [];
    var allCounterElementsS = document.querySelectorAll(".countH");
    var allCounterElementsM = document.querySelectorAll(".countM");
    var allCounterElementsH = document.querySelectorAll(".countS");

    for (var i = 0; i < allCounterElementsS.length; i++) {

        var counterElementH = allCounterElementsH.item(i);
        var counterElementM = allCounterElementsM.item(i);
        var counterElementS = allCounterElementsS.item(i);

        if (
            counterElementS.hasAttribute("countH") ||
            counterElementM.hasAttribute("countM") ||
            counterElementH.hasAttribute("countS")) {

            var count = [parseInt(counterElementS.attributes["countH"].value, 0),
                parseInt(counterElementM.attributes["countM"].value, 0),
                parseInt(counterElementH.attributes["countS"].value, 0)
            ];

            if (count) {
                allCounters.push(count);

            }

        }

    }

    window.localStorage.setItem("countdowns", JSON.stringify(allCounters));

}

function recoverCountdowns() {
    var allCounters = JSON.parse(window.localStorage.getItem("countdowns"));

    if (allCounters && allCounters.forEach) {

        allCounters.forEach(performCountdown);

    }

}
