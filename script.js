var workouts = JSON.parse(localStorage.getItem("workout_list")) || [];

function add_workout() {
    console.log("here");
    var workout_text = document.querySelector("#workout_text");
    var workout_hours = document.querySelector("#hours_interval");
    var workout_minutes = document.querySelector("#minutes_interval");
    var workout_seconds = document.querySelector("#seconds_interval");
    console.log(workout_text.value);
    console.log(workout_hours.value.toString());
    console.log(workout_minutes.value.toString());
    console.log(workout_seconds.value.toString());

    
    if (workout_text.value !== "" && workout_hours.value.toString() !== "" && workout_minutes.value.toString() !== "" && 
    workout_seconds.value.toString() !== "") {
        workouts.push({
            "text": workout_text.value, "hours": workout_hours.value.toString(), 
            "mintues": workout_minutes.value.toString(), "seconds": workout_seconds.value.toString()});
        
        workouts.push({
            "text": 'Rest', "hours": '0', "mintues": '0', "seconds": '30'});
        
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
    //     <p id = "timer_display">1:30</p>
    //     <button type="submit" class="button">Delete Workout</button>
    
    for (var i = 0; i < workouts.length; i++) {
        list += "<div id = 'workout_card' class='workout_form'>"
        list += "<h3>" + workouts[i].text + "</h3>";
        list += "<p id='timer_display'>"
        list +=  workouts[i].hours +" H " + workouts[i].mintues + " M " + workouts[i].seconds + " S " + "</p>"
        list +=  "<button type='submit' onclick='delete_workout("+ i +")'class='button'>Delete Workout</button>"
        list += "</div>"
        // list += workouts[i].workout_description + " ";
        // list += "<span onclick='delete_workout(" + i + ")'><button class='remove'>Remove</button></span></li>";
    }
    console.log(list);
    document.querySelector("#workouts").innerHTML = list;
}

(function () {
    list_workouts();
})();