var workouts = JSON.parse(localStorage.getItem("workout_list")) || [];
var is_timer_on = JSON.parse(localStorage.getItem("is_timer_on")) || false;
var timerInterval;

function add_workout() {
    var workout_text = document.getElementById("workout_text").value;
    var workout_hours = document.getElementById("hours_interval").value.toString();
    var workout_minutes = document.getElementById("minutes_interval").value.toString();
    var workout_seconds = document.getElementById("seconds_interval").value.toString();

    if (workout_text !== "" && workout_hours !== "" && workout_minutes !== "" && workout_seconds !== "") {

        var seconds = parseInt(workout_hours) * 3600 +
            parseInt(workout_minutes) * 60 +
            parseInt(workout_seconds);

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

function skip_workout(index) {
    workouts[index].completed_seconds = workouts[index].seconds;
    localStorage.setItem("workout_list", JSON.stringify(workouts));
    list_workouts();

}

function hide_end_workout() {
    if (localStorage.getItem('is_timer_on') === 'true') {
        document.getElementById("show_end").style.visibility = 'visible';
    }
    else {
        document.getElementById("show_end").style.visibility = 'hidden';
    }
}

function list_workouts() {
    var list = "";

    for (var i = 0; i < workouts.length; i++) {
        var seconds = parseInt(workouts[i].seconds) - parseInt(workouts[i].completed_seconds);
        list += "<div id = 'workout_card' class='workout_form'>";
        list += "<h3 class='workout_name'>" + workouts[i].text + "</h3>";
        list += "<p class='workout_time' id='timer_display'>";
        list += show_time(seconds) + "</p>";
        list += "<div>"
        list += "<button type='submit' onclick='delete_workout(" + i + ")'class='button'>Delete Workout</button>";
        list += "<button type='submit' onclick='skip_workout(" + i + ")'class='button'>Skip Workout</button>";
        list += "</div> </div>";
    }
    console.log(list);
    document.getElementById("workouts").innerHTML = list;
}


function begin_workout() {

    var workout_length = workouts.length;
    var index = 0;
    if (workout_length === 0) {
        return;
    }
    localStorage.setItem("is_timer_on", true);
    hide_end_workout();
    timerInterval = setInterval(() => {
        if (index >= workout_length) {
            clearInterval(timerInterval);
            localStorage.setItem("is_timer_on", false);
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
    pause_workout();
    hide_end_workout();
    list_workouts();
}

function end_workout() {
    pause_workout();
    window.location.href = "result_page.html";
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
    hide_end_workout();
    list_workouts();
    if (localStorage.getItem("is_timer_on") === "true") {
        begin_workout();
    }
})();