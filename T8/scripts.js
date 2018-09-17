$(function() {

//    loadCountdowns();

    $("#startButton").on('click', startButtonPressed);
    $("#clearButton").on('click', clearButtonPressed);

    function startButtonPressed() {

        var userInput = parseInt($("input[name=userInput]").val(), 10) || 10;
        var endTime = Date.now() + userInput * 1000;

        countdown(endTime);

        return false;
    }

    function clearButtonPressed() {

        localStorage.clear();
        localStorage.removeItem("countdowns");
        location.reload();

    }

    function countdown(endTime) {

        if (currentCountdown(endTime) <= 0) return;

        var template = $('#template');
        var newCountdown = template.clone().removeAttr("id").insertBefore(template);

        var countdownElement = $(".count", newCountdown);
        countdownElement.attr("endTime", endTime);

        $(".stopButton", newCountdown).on('click', stopCountdown);

        function continueCountdown() {

            var countdownStateClass = "running";
            var countdown = currentCountdown(endTime);
            countdownElement.text(formatCountdown(countdown));

            if (countdown > 0) {

                if (countdown < 5) {

                    countdownStateClass = "ending";

                }

                setTimeout(continueCountdown, 500);

            } else {

                countdownStateClass = "done";

            }

            countdownElement.removeClass().addClass("count " + countdownStateClass);
        }

        function stopCountdown() {

            newCountdown.remove();
            saveCountdowns();
            return false;

        }

      //  saveCountdowns();
        continueCountdown();

    }

    function formatCountdown(countdown){

        var h = Math.floor(countdown / 3600);
        var m = Math.floor(countdown / 60) - (h * 60);
        var s = countdown % 60;

        return (h + "H, "+m + "M, "+s + "S");
    }
/*
    function saveCountdowns() {
        var allCounters = $("has(.count[endDateTime])").map(function () {
            return parseInt($(".count", this).attr("endDateTime"), 10);
        }).get().filter(function (counter) {
            return counter.endDateTime > Date.now();
        });

        window.localStorage.setItem("countdowns", JSON.stringify(allCounters));
    }

    function loadCountdowns() {
        var allCounters = JSON.parse(window.localStorage.getItem("countdowns"));
        if (allCounters) {
            allCounters.forEach(function (counter) {
                countdown(counter.endDateTime);
            });
        }
    }
*/
    function currentCountdown(endDateTime) {

        return parseInt((endDateTime - Date.now()) / 1000, 10);

    }

});
