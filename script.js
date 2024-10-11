var workouts = JSON.parse(localStorage.getItem("workout_list")) || [];
var is_timer_on = JSON.parse(localStorage.getItem("is_timer_on")) || false;

function add_workout() {
    var workout_text = document.querySelector("#workout_text").value;
    var workout_hours = document.querySelector("#hours_interval").value.toString();
    var workout_minutes = document.querySelector("#minutes_interval").value.toString();
    var workout_seconds = document.querySelector("#seconds_interval").value.toString();

    console.log(workout_hours);

    if (workout_text !== "" && workout_hours !== "" && workout_minutes !== "" && workout_seconds !== "") {

        var seconds = parseInt(workout_hours, 10) * 3600 +
            parseInt(workout_minutes, 10) * 60 +
            parseInt(workout_seconds, 10);

        workouts.push({
            "text": workout_text, "seconds": seconds.toString(), "completed_seconds": "0"
        });

        workouts.push({
            "text": 'Rest', "seconds": '30', "completed_seconds": "0"
        });

    }

    localStorage.setItem("workout_list", JSON.stringify(workouts));
    list_workouts();
}


function delete_workout(index) {
    workouts.splice(index, 1);
    localStorage.setItem("workout_list", JSON.stringify(workouts));
    list_workouts();
}

function list_workouts() {
    var list = "";

    for (var i = 0; i < workouts.length; i++) {
        var seconds = parseInt(workouts[i].seconds) - parseInt(workouts[i].completed_seconds);
        list += "<div id = 'workout_card' class='workout_form'>";
        list += "<h3>" + workouts[i].text + "</h3>";
        list += "<p id='timer_display'>";
        list += show_time(seconds) + "</p>";
        list += "<button type='submit' onclick='delete_workout(" + i + ")'class='button'>Delete Workout</button>";
        list += "</div>";
    }
    console.log(list);
    document.querySelector("#workouts").innerHTML = list;
}

function begin_workout() {

    var workout_length = workouts.length;
    var index = 0;
    if (workout_length === 0) {
        return;
    }
    localStorage.setItem("is_timer_on", true);
    timerInterval = setInterval(() => {
        if (index >= workout_length) {
            clearInterval(timerInterval);
            return;
        }
        else if (parseInt(workouts[index].completed_seconds) >= parseInt(workouts[index].seconds)) {
            index += 1;

        } else {
            workouts[index].completed_seconds = parseInt(workouts[index].completed_seconds) + 1;
            localStorage.setItem("workout_list", JSON.stringify(workouts));
            list_workouts();
        }
    }, 1000);
}

function pause_workout() {
    localStorage.setItem("is_timer_on", false);
    clearInterval(timerInterval);
}

function resume_workout() {
    begin_workout();
}

function reset_workout() {
    for (var i = 0; i < workouts.length; i++) {
        workouts[i].completed_seconds = "0";
    }
    localStorage.setItem("workout_list", JSON.stringify(workouts));
    list_workouts();
}

function show_time(seconds) {
    let hours = Math.floor(seconds / 3600);
    if (hours < 10) {
        hours = "0" + hours
    }
    let mins = Math.floor((seconds % 3600) / 60);
    if (mins < 10) {
        mins = "0" + mins
    }
    let secs = seconds % 60;
    if (secs < 10) {
        secs = "0" + secs
    }
    return hours + " : " + mins + " : " + secs;
}

(function () {
    list_workouts();
    if (localStorage.getItem("is_timer_on") === "true") {
        begin_workout();
    }
})();





