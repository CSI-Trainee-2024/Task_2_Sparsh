var workouts = JSON.parse(localStorage.getItem("workout_list")) || [];
var isPaused = false;

function add_workout() {
    var workout_text = document.querySelector("#workout_text");
    var workout_hours = document.querySelector("#hours_interval");
    var workout_minutes = document.querySelector("#minutes_interval");
    var workout_seconds = document.querySelector("#seconds_interval");

    if (workout_text.value !== "" && workout_hours.value.toString() !== "" && workout_minutes.value.toString() !== "" &&
        workout_seconds.value.toString() !== "") {
        var seconds = parseInt(workout_hours.value, 10) * 3600 + parseInt(workout_minutes.value, 10) * 60 + parseInt(workout_seconds.value, 10);
        workouts.push({
            "text": workout_text.value, "seconds": seconds.toString(), "completed_seconds": "0"
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
        list += "<div id = 'workout_card' class='workout_form'>"
        list += "<h3>" + workouts[i].text + "</h3>";
        list += "<p id='timer_display'>";
        list += parseInt(workouts[i].seconds) - parseInt(workouts[i].completed_seconds) + " S " + "</p>";
        list += "<button type='submit' onclick='delete_workout(" + i + ")'class='button'>Delete Workout</button>";
        list += "</div>";
    }
    console.log(list);
    document.querySelector("#workouts").innerHTML = list;
}

(function () {
    list_workouts();
})();





