//Script variables
var secInMin = 60;
var secInHour = 3600;

//HTML Elements
var buttonClick = document.querySelector("#startButton");
buttonClick.addEventListener("click", performCountdown, false);

recoverCountdowns();

function performCountdown() {

    event.preventDefault();

    //access our form element
    var durationInput = document.forms[0].elements[0];

    //if we dont have a var in the form, default it to 10
    var countdownFrom = parseInt(durationInput.value, 10) || 10;

    //grab my html template and clone it
    var template = document.querySelector('#template');
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
    //get stop button, add event listener
    var stopButtonElement = newCountdown.querySelector(".stopButton");
    stopButtonElement.addEventListener('click', stopCountdown, false);

    countdownLoop();

    function countdownLoop() {

        var countdownStateClass = "running";

        //assert text content and design to the page
        countdownElement[0].innerText = Math.floor(countdownElement[3] / secInHour);
        countdownElement[1].innerText = Math.floor(countdownElement[3] / secInMin) - secInMin * countdownElement[0].innerHTML;
        countdownElement[2].innerText = countdownElement[3] % secInMin;

        //check if countdown has ended
        if (countdownElement[3] > 0) {

            if (countdownElement[3] < 5) {
                //less than 5? make it orange text
                countdownStateClass = "ending";

            } else {
                //5 or more? green text
                countdownStateClass = "running";

            }

            countdownElement[3] -= 1;
            setTimeout(countdownLoop, 1000);
            //decrement if not

        } else {
            //0? red text
            countdownStateClass = "done";

        }

        countdownElement.className = countdownStateClass;

        cacheCountdowns();

    }

    function stopCountdown(event) {

        event.preventDefault();
        countdown = 0;
        template.parentNode.removeChild(newCountdown);

    }

}

function cacheCountdowns(){

    var allCounters = [];
    var allCounterElementsS = document.querySelectorAll(".countS");
    var allCounterElementsM = document.querySelectorAll(".countM");
    var allCounterElementsH = document.querySelectorAll(".countH");

    for(var i = 0; i < allCounterElements.length; i++) {

        var counterElementS = allCounterElementsS.item(i);
        var counterElementM = allCounterElementsM.item(i);
        var counterElementH = allCounterElementsH.item(i);

        if (counterElementS.hasAttribute("countS") &&
        ounterElementM.hasAttribute("countM") &&
        ounterElementH.hasAttribute("countH")) {

            var count =
            [parseInt(counterElementS.attributes["countS"].value, 10),
            parseInt(counterElementM.attributes["countM"].value, 10),
            parseInt(counterElementH.attributes["countH"].value, 10)]

            if (count) {

                allCounters.push(count);

            }

        }

        window.localStorage.setItem("countdowns", JSON.stringify(allCounters));

    }
    
}

function recoverCountdowns(){

  var allCounters = JSON.parse(window.localStorage.getItem("countdowns"));

  if (allCounters && allCounters.forEach) {

      allCounters.forEach(startCountdown);

  }

}
